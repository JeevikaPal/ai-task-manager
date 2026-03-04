const express = require("express");
const router = express.Router();

// Your fake database lives here now
let tasks = [
  { id: 1, title: "Learn Node.js", done: false },
  { id: 2, title: "Build an Express API", done: false },
  { id: 3, title: "Connect a database", done: false },
  { id: 4, title: "Add AI features", done: false },
  { id: 5, title: "Deploy to production", done: false },
];

// GET all tasks
router.get("/", (req, res) => {
  res.json(tasks);
});

// GET single task
router.get("/:id", (req, res, next) => {
  try {
    const id = parseInt(req.params.id);
    if (id === 999) throw new Error("Database connection lost");
    const task = tasks.find((t) => t.id === id);
    if (!task) return res.status(404).json({ error: "Task not found" });
    res.json(task);
  } catch (err) {
    next(err);
  }
});

// POST create task
router.post("/", (req, res) => {
  const { title } = req.body;
  if (!title) return res.status(400).json({ error: "Title is required" });
  const newTask = { id: tasks.length + 1, title, done: false };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

// PUT update task
router.put("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const task = tasks.find((t) => t.id === id);
  if (!task) return res.status(404).json({ error: "Task not found" });
  const { title, done } = req.body;
  if (title !== undefined) task.title = title;
  if (done !== undefined) task.done = done;
  res.json(task);
});

// DELETE task
router.delete("/:id", (req, res) => {
  const id = parseInt(req.params.id);
  const index = tasks.findIndex((t) => t.id === id);
  if (index === -1) return res.status(404).json({ error: "Task not found" });
  const deleted = tasks.splice(index, 1);
  res.json({ message: "Task deleted", task: deleted[0] });
});

module.exports = router;
