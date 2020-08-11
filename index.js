require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const PhoneBook = require('./models/phonebook');
const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('build'));
// app.use(morgan('tiny'));
morgan.token('returnData', (request) => {
    return request.body;
});

app.use(morgan((tokens, req, res) => {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res),
        tokens.res(req, res, 'content-length'), '-',
        tokens['response-time'](req, res), 'ms',
        JSON.stringify(tokens.returnData(req))
    ].join(' ');
}));

app.get("/info", (request, response) => {
    PhoneBook.countDocuments({}).then(count => {
        response.status(200).json({ info: `Phonebook has info for ${count} people ${new Date()}` });
    })
});

app.get('/api/persons', (request, response, next) => {
    PhoneBook.find({}).then(res => {
        response.json(res);
    }).catch(err => next(err));
});

app.get('/api/persons/:id', (request, response, next) => {
    PhoneBook.findById(request.params.id).then(res => {
        response.json(res);
    }).catch(err => next(err));
});

app.delete('/api/persons/:id', (request, response, next) => {
    PhoneBook.findByIdAndRemove(request.params.id).then(result => {
        response.status(204).end();
    }).catch(err => next(err));
});

app.put('/api/persons/:id', (request, response, next) => {
    PhoneBook.findByIdAndUpdate(request.params.id, request.body, { new: true, runValidators: true })
        .then(updatedResource => {
            response.json(updatedResource);
        })
        .catch(error => next(error))
})

app.post('/api/persons', (request, response, next) => {
    let resource = request.body;

    if (!resource.name && !resource.number) {
        return response.status(400).json({
            error: "Body missing"
        });
    }

    if (!resource.name) {
        return response.status(400).json({
            error: "Name missing"
        })
    }

    if (!resource.number) {
        return response.status(400).json({
            error: "Number missing"
        })
    }

    const phonebookEntry = new PhoneBook({
        date: new Date(),
        ...resource
    })

    phonebookEntry.save().then(savedEntry => {
        response.json(savedEntry);
    }).catch(error => next(error))
});

app.post('/api/seed', (request, response) => {
    let phonebook = [
        {
            "name": "Arto Hs",
            "number": "123-456"
        },
        {
            "name": "Ada Lovelace",
            "number": "39-44-5323523"
        },
        {
            "name": "Dan Abramov",
            "number": "123-56489-756"
        },
        {
            "name": "Mary Poppendieck",
            "number": "39-23-6423111"
        },
        {
            "name": "Arbnor Lumezi",
            "number": "555-123-123"
        }
    ];
    PhoneBook.collection.insert(phonebook, (err, res) => {
        if (err) {
            response.status(400).end();
        } else {
            response.status(200).send(`Database seeded`);
        }
    })
})

const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

const errorHandler = (error, request, response, next) => {
    if (error.name === "CastError") {
        return response.status(400).send({ error: 'malformatted id' });
    } else if (error.name === "ValidationError") {
        return response.status(400).send({ error: error.message });
    }
    next(error);
}

app.use(unknownEndpoint);
app.use(errorHandler);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});