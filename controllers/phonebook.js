const phoneBookRouter = require('express').Router();
const PhoneBook = require('../models/phonebook');

phoneBookRouter.get('/info', (request, response) => {
    PhoneBook.countDocuments({}).then((count) => {
        response.status(200).json({
            info: `Phonebook has info for ${count} people ${new Date()}`,
        })
    })
})

phoneBookRouter.get('/api/persons', (request, response, next) => {
    PhoneBook.find({})
        .then((res) => {
            response.json(res)
        })
        .catch((err) => next(err))
})

phoneBookRouter.get('/api/persons/:id', (request, response, next) => {
    PhoneBook.findById(request.params.id)
        .then((res) => {
            response.json(res)
        })
        .catch((err) => next(err))
})

phoneBookRouter.delete('/api/persons/:id', (request, response, next) => {
    PhoneBook.findByIdAndRemove(request.params.id)
        .then(() => {
            response.status(204).end()
        })
        .catch((err) => next(err))
})

phoneBookRouter.put('/api/persons/:id', (request, response, next) => {
    PhoneBook.findByIdAndUpdate(
        request.params.id,
        { number: request.body.number },
        { new: true, runValidators: true }
    )
        .then((updatedResource) => {
            response.json(updatedResource)
        })
        .catch((error) => next(error))
})

phoneBookRouter.post('/api/persons', (request, response, next) => {
    const resource = request.body

    if (!resource.name && !resource.number) {
        return response.status(400).json({
            error: 'Body missing',
        })
    }

    if (!resource.name) {
        return response.status(400).json({
            error: 'Name missing',
        })
    }

    if (!resource.number) {
        return response.status(400).json({
            error: 'Number missing',
        })
    }

    const phonebookEntry = new PhoneBook({
        date: new Date(),
        ...resource,
    })

    return phonebookEntry
        .save()
        .then((savedEntry) => {
            response.json(savedEntry)
        })
        .catch((error) => next(error))
})

phoneBookRouter.post('/api/seed', (request, response) => {
    const phonebook = [
        {
            name: 'Arto Hs',
            number: '123-456',
        },
        {
            name: 'Ada Lovelace',
            number: '39-44-5323523',
        },
        {
            name: 'Dan Abramov',
            number: '123-56489-756',
        },
        {
            name: 'Mary Poppendieck',
            number: '39-23-6423111',
        },
        {
            name: 'Arbnor Lumezi',
            number: '555-123-123',
        },
    ]
    PhoneBook.collection.insert(phonebook, (err) => {
        if (err) {
            response.status(400).end()
        } else {
            response.status(200).send(`Database seeded`)
        }
    })
})

module.exports = phoneBookRouter;