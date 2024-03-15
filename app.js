const express = require('express');
const app = express();
const port = 3000;

app.use(express.json()); // This middleware is used to parse the request body

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

const todos = [{id: 1, title: 'First todo', description: 'This is the first todo'}]; // This will act as a simple in-memory database

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Add a new todo
let nextId = todos.length + 1;

app.post('/todos', (req, res) => {
    const { title, description } = req.body;
    const newTodo = { id: nextId++, title, description }; // Assign an ID
    todos.push(newTodo);
    res.status(201).json(newTodo); // Send 201 Created status code
});

// Update a todo
app.put('/todos/:id', (req, res) => {
    const id = parseInt(req.params.id, 10); // Convert to number
    const { title, description } = req.body;
    const todo = todos.find(todo => todo.id === id);

    if (!todo) {
        return res.status(404).send('The todo with the given ID was not found.');
    }

    todo.title = title;
    todo.description = description;
    res.json(todo);
});
