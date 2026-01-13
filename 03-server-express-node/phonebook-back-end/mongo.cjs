const mongoose = require("mongoose");

if (process.argv.length < 3) {
  console.log("ERROR: Looks like you forgot your password?");
  process.exit(1);
}

const PASSWORD = encodeURI(process.argv[2]);

const COLLECTION = "phonebook"

const url = `mongodb+srv://stvn:${PASSWORD}@cluster0.e8ozpjc.mongodb.net/${COLLECTION}?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false);
mongoose.connect(url, { family: 4 });

const entrySchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Entry = mongoose.model('Entry', entrySchema);


if (process.argv.length === 3) {
  Entry.find({}).then(result => {
    console.log(result);
    mongoose.connection.close();
  })
}

if (process.argv.length === 5) {
  const entry = new Entry({
    name: process.argv[3],
    number: process.argv[4]
  })

  entry.save().then(result => {
    console.log(result);
    mongoose.connection.close();
  })
}


// console.log(process.argv);