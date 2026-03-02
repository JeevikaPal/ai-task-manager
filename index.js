const express = require("express");
const { error } = require("node:console");
const app = express();
const PORT = 4000;

// This middleware lets Express read JSON from request bodies
// You'll need this when the frontend sends data to you
app.use(express.json());

// Fake database — we'll replace this with a real DB in Phase 2
let tasks = [
  { id: 1, title: 'Learn Node.js', done: false },
  { id: 2, title: 'Build an Express API', done: false },
  { id: 3, title: 'Connect a database', done: false },
  { id: 4, title: 'Add AI features', done: false },
  { id: 5, title: 'Deploy to production', done: false },
]

// --- ROUTES GO HERE ---
//Get all tasks
app.get("/api/tasks", (req, res) => {
    res.json(tasks);
})

//Get a single task by ID
app.get("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    res.json(task);
})

//POST - create a new task
app.post("/api/tasks", (req, res) => {
    const { title } = req.body;
    if (!title) {
        return res.status(400).json({ error: "Title is required" });
    }
    const newTask = {
        id: tasks.length + 1,
        title,
        done: false
    }
    tasks.push(newTask);
    res.status(201).json(newTask);
})

//PUT - update a task
app.put("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        return res.status(404).json({ error: "Task not found" });
    }
    const { title, done } = req.body;
    if (title !== undefined) task.title = title;
    if (done !== undefined) task.done = done;
    res.json(task);
})

//DELETE - delete a task
app.delete("/api/tasks/:id", (req, res) => {
    const id = parseInt(req.params.id);
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ error: "Task not found" });
    }
    const deletedTask = tasks.splice(taskIndex, 1);
    res.json({ message: "Task deleted", task: deletedTask[0] });
})

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
