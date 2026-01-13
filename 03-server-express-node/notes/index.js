require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');


const app = express()
const PORT = process.env.PORT || 3001
const MONGO_URI = encodeURI(process.env.MONGO_URI);

mongoose.set('strictQuery', false);
mongoose.connect(MONGO_URI, {family: 4});



// create Schema
const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

// create model from Schema
const Note = mongoose.model('Note', noteSchema);

// map id to string
noteSchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
})

// fetch notes
let notes = [];



app.use(morgan('tiny'))
app.use(express.static('dist'))
app.use(express.json())

app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

app.get('/api/notes', (request, response) => {
  Note.find({})
  .then(result => {
    response.json(result);
  })
})

app.get('/api/notes/:id', (request, response) => {
  const id = request.params.id

  Note.findById(id)
    .then(result => {
      console.log(result);
      response.json(result)
    }).catch(er => {
      response.status(404).json({error: `No note with id ${id}`}).end();
    })
})

const generateId = () => {
  const maxId =
    notes.length > 0 ? Math.max(...notes.map((n) => Number(n.id))) : 0
  return String(maxId + 1)
}

app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const note = {
    content: body.content,
    important: body.important || false,
    id: generateId(),
  }

  notes = notes.concat(note)

  response.json(note)
})

app.delete('/api/notes/:id', (request, response) => {
  const id = request.params.id
  notes = notes.filter((note) => note.id !== id)

  response.status(204).end()
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
