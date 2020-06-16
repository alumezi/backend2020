const express = require('express');
const app = express();
app.use(express.json());

const phonebook = [

    {
        "name": "Arto Hellas",
        "number": "123-456",
        "id": 1
    },
    {
        "name": "Ada Lovelace",
        "number": "39-44-5323523",
        "id": 2
    },
    {
        "name": "Dan Abramov",
        "number": "123-56489-756",
        "id": 3
    },
    {
        "name": "Mary Poppendieck",
        "number": "39-23-6423111",
        "id": 4
    },
    {
        "name": "Arbnor Lumezi",
        "number": "555-123-123",
        "id": 5
    }
];

app.get("/", (request, response) => {
    response.status(200).send(
        "Go to /api/persons for phonebook \nGo to /info for info");
});

app.get("/info", (request, response) => {
    response.status(200).send(`Phonebook has info for ${phonebook.length} people \n\n${new Date()}`);
});

app.get('/api/persons', (request, response) => {
    console.log(request)
    response.json(phonebook);
});

app.get('/api/persons/:id', (request, response) => {
    let id = Number(request.params.id);
    let resource = phonebook.find(item => item.id === id);
    if (resource) {
        response.json(resource);
    } else {
        response.status(404).end();
    }
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});