const express = require("express");
const app = express();
app.use(express.json());

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

  return res.status(404).json({error: `No person with id ${id} found.`});
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

// api.post('/api/persons', (req, res) => {

// })


const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
})