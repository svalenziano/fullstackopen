require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const {noteSchem, Note} = require('./models/note.js')


const app = express()
const PORT = process.env.PORT || 3001

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


app.post('/api/notes', (request, response) => {
  const body = request.body

  if (!body.content) {
    return response.status(400).json({
      error: 'content missing',
    })
  }

  const note = new Note({
    content: body.content,
    important: body.important || false,
  })

  note.save()
    .then(result => {
      console.log("NOTE SAVED:");
      console.log(result);
    }).catch(er => {
      console.error(er);
    })
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
