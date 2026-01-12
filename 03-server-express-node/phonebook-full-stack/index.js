const express = require("express");
const morgan = require("morgan");
const app = express();
app.use(express.json());

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

function toggleImportant(entries, id) {
  
}

// CUSTOM MIDDLEWARE
function loqRequest(req, res, next) {
  console.log(`Req method: ${req.method}`);
  console.log(`Req path: ${req.path}`);
  console.log(`Req body: ${req.body && JSON.stringify(req.body)}`);
  next();
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
/*
  Input: {
    name: string
    number: string
  }
  - Generate random id
  - If name or number is missing, return `400` status and {error: name or number is missing}
  - Name already exists? return '409' (conflict) status code and {error: name already exists}
*/
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
  // console.log(req.body)

  return res.json(newEntry);
})

app.patch('/api/persons/:id', (req, res) => {
  const id = req.params.id;
  /*
  Modify the local data.  If entry id === id:
    - get `important` from body
    - convert from string to boolean
    - 
  Success? Return 
  Failure? Return `404` with error
  Send response with new data
  */
  let found = entries.findIndex(obj => obj.id === id);

  if (found > -1) {
    entries = entries.map(entry => {
      if (entry.id === id) {
        const modified = {
          ...entry,
          important: entry.important === 'true' ? 'false' : 'true'
        };

        return modified;
      } else {
        return entry;
      }
    });

    res.status(200).json(entries[found]);
  
  } else {
    res.status(404).json(makeErrorObjectIdNotFound(id));
  }
})

app.use(handleUnknownEndpoint);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})