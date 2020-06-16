const express = require('express');
const app = express();
app.use(express.json());

let phonebook = [

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

app.delete('/api/persons/:id', (request, response) => {
    let id = Number(request.params.id);
    phonebook = phonebook.filter(item => item.id !== id);
    response.status(204).end();
});

app.post('/api/persons', (request, response) => {
    let resource = request.body;

    if (!resource) {
        return response.status(400).json({
            error: "Resource missing"
        });
    }

    let phonebookEntry = {
        id: Math.floor(Math.random() * 100) * phonebook.length,
        date: new Date(),
        ...resource
    }

    phonebook = phonebook.concat(phonebookEntry);
    response.json(phonebookEntry);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});