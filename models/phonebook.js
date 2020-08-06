const mongoose = require('mongoose');
mongoose.set('useFindAndModify', false);
const url = `mongodb+srv://Arbnor:${process.env.DB_PASSWORD}@cluster0-nkcte.mongodb.net/note-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(result => {
        console.log("result", result)
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        console.log('error connecting to MongoDB:', error.message)
    })

const phoneBookSchema = new mongoose.Schema({
    name: String,
    number: String
})

phoneBookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString()
        delete returnedObject._id
        delete returnedObject.__v
    }
})

module.exports = mongoose.model('phoneBook', phoneBookSchema);
