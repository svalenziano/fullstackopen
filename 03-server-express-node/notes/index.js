require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const { Note } = require('./models/note.js')


const app = express()
const PORT = process.env.PORT || 3001

// fetch notes
let notes = [];

//////////////////////////////////////////////////////////////////////////////
// Middleware

function errorHandler(error, request, response, next) {
  console.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).send({ error: "Malformed id" });
  }

  next(error);
}

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' })
}

app.use(morgan('tiny'))
app.use(express.static('dist'))
app.use(express.json())

//////////////////////////////////////////////////////////////////////////////
// Routes


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
    .then(note => {
      if (note) {
        response.json(note)
      } else {
        response.status(404).json({error: `No note with id ${id}`}).end();
      }
    }).catch(er => {
      console.log(er);
      response.status(400).json({error: "Malformed id"});
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

app.delete('/api/notes/:id', (request, response, next) => {
  const id = request.params.id
  // notes = notes.filter((note) => note.id !== id)

  // response.status(204).end()

  Note.findByIdAndDelete(id)
    .then(result => {
      if (result) {
        console.log(result)
        response.status(204).end();
      } else {
        response.status(404).json({ error: `Note with id=${id} wasn't found`})
      }
    }).catch(er => next(er))
})


//////////////////////////////////////////////////////////////////////////////
// More Middleware
app.use(unknownEndpoint)
app.use(errorHandler)

//////////////////////////////////////////////////////////////////////////////
// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
