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
const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
})

// create model from Schema
const Entry = mongoose.model('Entry', entrySchema);

// map id to string and remove excess properties
entrySchema.set('toJSON', {
  transform: (doc, returnedObj) => {
    returnedObj.id = returnedObj._id.toString();
    delete returnedObj._id;
    delete returnedObj.__v;
  }
})

module.exports = {
  Entry,
}