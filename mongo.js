const mongoose = require('mongoose')

if (process.argv.length < 3) {
  console.log('Please provide the password as an argument: node mongo.js <password>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://Arbnor:${password}@cluster0-nkcte.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const noteSchema = new mongoose.Schema({
  name: String,
  number: String,
  date: Date,
  important: Boolean,
})

const Note = mongoose.model('Note', noteSchema)

if (process.argv.length === 3) {
  Note.find({}).then(result => {
    console.log("phonebook:")
    result.forEach(note => {
      console.log(`${note.name} ${note.number}`)
    })
    mongoose.connection.close()
    process.exit(1)
  })
  return
}

const note = new Note({
  name: process.argv[3],
  number: process.argv[4],
  date: new Date(),
  important: true,
})

note.save().then(result => {
  Note.find({}).then(result => {
    result.forEach(note => {
      console.log(`${note.name} ${note.number}`)
    })
    mongoose.connection.close()
  })
})

