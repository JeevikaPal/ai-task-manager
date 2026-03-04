require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Routes
const tasksRouter = require("./routes/tasks");
app.use("/api/tasks", tasksRouter);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: `Route ${req.url} not found` });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error("Server error:", err.message);
  res.status(500).json({ error: "Something went wrong on the server" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
