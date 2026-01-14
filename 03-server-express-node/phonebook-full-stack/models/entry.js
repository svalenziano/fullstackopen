const mongoose = require('mongoose');

mongoose.set('strictQuery', false);
const MONGO_URI = encodeURI(process.env.MONGO_URI);
console.log("\nMONGO_URI", MONGO_URI, "\n");

mongoose.connect(MONGO_URI, { family: 4 })
  .then(result => {
    console.log('connected to MongoDB')
  })
  .catch(error => {
    console.log('error connecting to MongoDB:', error.message)
  })

// create Schema
const entrySchema = new mongoose.Schema({
  name: {
    type: String,
    minLength: 2,
    required: true,
  },
  number: {
    type: String,
    required: [true, "Phone number is required!"],
    validate: {
      validator: (value) => /\d{3}-\d{4}/.test(value),
      message: (props) => `${props.value} is not a valid phone number`,
    }
  },
  important: { type: Boolean, default: false },
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