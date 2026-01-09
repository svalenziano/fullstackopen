const express = require("express");
const app = express();
app.use(express.json());


let notes = [
  {
    id: "1",
    content: "HTML is easy",
    important: true
  },
  {
    id: "2",
    content: "Browser can execute only JavaScript",
    important: false
  },
  {
    id: "3",
    content: "GET and POST are the most important methods of HTTP protocol",
    important: true
  }
]

app.get('/', (req, res) => {
  res.send('<h1>Hello world!!!!!!</h1>');
});

app.get('/api/notes', (req, res) => {
  // console.log(req.headers)
  res.json(notes);
});

app.get('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const note = notes.find(n => n.id === id);
  
  if (note) {
    res.json(note);
  } else {
    res.status(404).end();
  }
});

app.post('/api/notes', (req, res) => {
  const maxId = Math.max(...notes.map(n => Number(n.id)));
  
  let note = req.body;

  note = {
    id: String(maxId + 1),
    ...note
  }

  console.log(note);
  notes = notes.concat(note);
  res.json(note);
})

app.delete('/api/notes/:id', (req, res) => {
  const id = req.params.id;
  const note = notes.find(n => n.id === id);

  if (note) {
    res.status(204).end();
  } else {
    res.status(404).end();
  }
})

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
})