const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const MONGO_URI = encodeURI(process.env.MONGO_URI);

mongoose.connect(MONGO_URI, { family: 4 })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

// create Schema
const noteSchema = new mongoose.Schema({
  content: {
    type: String,
    required: true,
    minLength: 2,
  },
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

module.exports = {
  noteSchema,
  Note,
}