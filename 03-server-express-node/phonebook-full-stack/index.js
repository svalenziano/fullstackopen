require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3001
const { Entry } = require("./models/entry.js")

app.use(express.json());
app.use(express.static('dist'))

morgan.token('body', (req, res) => req.body ? JSON.stringify(req.body) : "{}")

app.use(morgan('tiny', {
  skip: (req, res) => req.method === "POST"
}));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: (req, res) => req.method !== "POST"
}));

function makeErrorObjectIdNotFound(id) {
  return {error: `No person with id ${id} found.`};
}

/**
 * Remember that value of `important` is a string: `true` or `false`
 * @param {*} entries 
 * @param {*} id id of the entry to toggle `important`
 */
function updateEntry(entries, id, data) {
  return entries.map(entry => {
      if (entry.id === id) {
        const modified = {
          ...entry,
          ...data
        };

        return modified;
      } else {
        return entry;
      }
    });
}

function handleUnknownEndpoint(req, res) {
  return res.status(404).send({ error: 'unknown endpoint' });
}

const DEFAULTS = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

let entries = JSON.parse(JSON.stringify(DEFAULTS))

function findEntryById(obj, id) {
  return obj?.find(entry => entry.id === id);
}

function nameExists(obj, name) {
  return !!obj.find(i => i.name === name)
}

app.get('/info', (req, res) => {
  res.send(`
    <p>Phonebook has info for ${entries.length} people</p>
    <p>${Date()}</p>
  `)
})

app.get('/api/persons', (req, res) => {
  res.json(entries);
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const found = findEntryById(entries, id)

  if (found) {
    return res.json(found);
  }

  return res.status(404).json(makeErrorObjectIdNotFound(id));
}) 

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  const found = findEntryById(entries, id);

  if (found) {
    entries = entries.filter(entry => entry !== found);
    return res.json(entries);
  }

  return res.status(404).json({error: `No person with id ${id} found.`});
});

app.post('/api/persons', (req, res) => {

  const { name, number } = req.body;

  if (!name || !number) {
    return res.status(400).json({ error: "Name or number is missing" });
  }

  if (nameExists(entries, name)) {
    return res.status(409).json({ error: "Name already exists" });
  }

  const id = String(Math.floor(Math.random() * 1000000000000)) ;

  const newEntry = {
    id,
    name,
    number
  };

  entries.push(newEntry);
  return res.json(newEntry);
})

app.patch('/api/persons/:id', (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    console.error('Unexpected body')
    console.error(req.body);
  }
  
  const id = req.params.id;
  let found = entries.findIndex(obj => obj.id === id);
  
  if (found > -1) {
    entries = updateEntry(entries, id, req.body);
    res.status(200).json(entries[found]);
  } else {
    res.status(404).json(makeErrorObjectIdNotFound(id));
  }
})

app.use(handleUnknownEndpoint);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});