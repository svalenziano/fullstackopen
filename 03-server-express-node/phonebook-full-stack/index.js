require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const PORT = process.env.PORT || 3001
const { Entry } = require("./models/entry.js")

app.use(express.json());
app.use(express.static('dist'))


//////////////////////////////////////////////////////////////////////////////
// LOGGING

morgan.token('body', (req, res) => req.body ? JSON.stringify(req.body) : "{}")

app.use(morgan('tiny', {
  skip: (req, res) => req.method === "POST" || req.method === 'PATCH'
}));

app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body', {
  skip: (req, res) => req.method !== "POST" && req.method !== "PATCH"
}));


//////////////////////////////////////////////////////////////////////////////
// HELPER FUNCTIONS

function errorHandler(error, request, response, next) {
  if (error.name === "CastError") {
    return response.status(400).json({ error: "Malformed request" });
  } else if (error.name === "ValidationError") {
    console.log('TRIPPED VALIDATION ERROR')
    return response.status(400).json({ error: error.message });
  }

  response.status(500).json({ error: "Unhandled server error ☹️" })
  // next(error);
}

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


function findEntryById(obj, id) {
  return obj?.find(entry => entry.id === id);
}

function nameExists(obj, name) {
  return !!obj.find(i => i.name === name)
}

function getAll(req, res) {
  Entry.find({})
    .then(result => {
      res.json(result);
      return result;
    }).catch(er => {
      res.status(404).end()
    })
}


//////////////////////////////////////////////////////////////////////////////
// ROUTES

app.get('/info', (req, res) => {

  let count = null;

  Entry.countDocuments({})
    .then(c => {
      count = c;
    }).finally(() => {
      res.send(`
        <p>Phonebook has info for ${count ?? "UNKNOWN"} people</p>
        <p>${Date()}</p>
      `);
    })

})

app.get('/api/persons', (req, res) => {
  getAll(req, res);
})

app.get('/api/persons/:id', (req, res) => {
  const id = req.params.id;

  Entry.findById(id)
    .then(result => {
      res.json(result);
    }).catch(er => {
      res.status(404).json(makeErrorObjectIdNotFound(id));
    })
}) 

app.delete('/api/persons/:id', (req, res) => {
  const id = req.params.id;

  Entry.findByIdAndDelete(id)
    .then(result => {
      console.log(result);
      res.json(result);
    }).catch(er => {
      res.status(404).json(makeErrorObjectIdNotFound(id));
    })
});

app.post('/api/persons', (req, res, next) => {

  const { name, number } = req.body;

  const entry = new Entry({
    name,
    number,
  })

  entry.save()
    .then(result => {
      res.json(result);
    }).catch(er => next(er))
})

app.patch('/api/persons/:id', (req, res) => {
  if (!req.body || Object.keys(req.body).length === 0) {
    console.error('Unexpected body')
    console.error(req.body);
  }
  
  const id = req.params.id;

  console.log("UPDATE ROUTE", req.body)

  Entry.findByIdAndUpdate(id, req.body, {new: true})
    .then(result => {
      res.json(result);
    }).catch(er => {
      console.error('SOMETHING WENT WRONG');
      console.error(er);
      res.status(500).json(makeErrorObjectIdNotFound(id))
    })
})


//////////////////////////////////////////////////////////////////////////////
// More Middleware

app.use(handleUnknownEndpoint);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});