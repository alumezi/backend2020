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
    response.send(
        "Go to /api/persons for phonebook"
    );
});

app.get('/api/persons', (request, response) => {
    console.log(request)
    response.json(phonebook);
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});