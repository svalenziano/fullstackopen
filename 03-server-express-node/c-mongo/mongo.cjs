const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const PASSWORD = encodeURI(process.argv[2])

const url = `mongodb+srv://stvn:${PASSWORD}@cluster0.e8ozpjc.mongodb.net/noteApp?retryWrites=true&w=majority&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 }) // {family: 4} => Atlas only supports IPv4

const noteSchema = new mongoose.Schema({
  content: String,
  important: Boolean,
})

/*
Create Model from Schema

👍Mongoose automatically creates a lowercased plural collection from your model name.  

EG, 'Note' model name => 'notes' collection name
*/
const Note = mongoose.model('Note', noteSchema)

function createAndSaveDocument() {
  // create document from Model
  const note = new Note({
    content: 'HTML is easy',
    important: true,
  })

  // save document to the database
  note.save().then(result => {
    console.log('note saved!')
  })

}

/*
Your DB now contains a 'notes' collection (whether or not it had one before)
*/

function fetchAllAndPrint() {
  Note.find({})
    .then(result => {
      result.forEach(note => {
        console.log(note);
      })
    })
}


/*
RUN TESTS
*/
createAndSaveDocument();
// fetchAllAndPrint();
mongoose.connection.close();