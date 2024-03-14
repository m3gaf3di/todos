const express = require('express');
const app = express();
const port = 3000;

app.get('/', (req, res) => res.send('Hello World!'));

app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));


const todos = [{id: 1, title: 'First todo', description: 'This is the first todo'}]; // This will act as a simple in-memory database

// Get all todos
app.get('/todos', (req, res) => {
    res.json(todos);
});

// Add more routes here for creating, updating, and deleting todos
// Add a new todo
app.post('/todos', (req, res) => {
    const { title, description } = req.body;
    const newTodo = { title, description };
    todos.push(newTodo);
    res.json(newTodo);
});
app.put('/todos', (req, res) => {
    const id = req.params.id;
    const { title, description } = req.body;
    const todo = todos.find((todo) => todo.id === id);
    if (todo) {
        todo.title = title;
        todo.description = description;
        res.json(todo);
    } else {
        res.status(404).json({ message: 'Todo not found' });
    }
});

