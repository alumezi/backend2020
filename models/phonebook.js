/* eslint-disable no-underscore-dangle */
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

mongoose.set('useFindAndModify', false)

mongoose
    .connect(process.env.DB_URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then((result) => {
        // eslint-disable-next-line no-console
        console.log('result', result)
        // eslint-disable-next-line no-console
        console.log('connected to MongoDB')
    })
    .catch((error) => {
        // eslint-disable-next-line no-console
        console.log('error connecting to MongoDB:', error.message)
    })

const phoneBookSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true,
        unique: true,
    },
    number: {
        type: String,
        minlength: 8,
        required: true,
    },
})

phoneBookSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        // eslint-disable-next-line no-param-reassign
        returnedObject.id = returnedObject._id.toString()
        // eslint-disable-next-line no-param-reassign
        delete returnedObject._id
        // eslint-disable-next-line no-param-reassign
        delete returnedObject.__v
    },
})

phoneBookSchema.plugin(uniqueValidator)

module.exports = mongoose.model('phoneBook', phoneBookSchema)
