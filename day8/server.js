// Express Server Entry Point
const express = require('express');
const { loadTasks, loadUsers, saveTasks, saveUsers } = require('./bouns');

const app = express();
const PORT = 6060;

// Local Database
const tasks = [];
const users = [];

loadTasks(tasks, "data/tasks.json");
loadUsers(users, "data/users.json");

// Middleware
app.use(express.json());

// ==================== Routes ====================

// Get all tasks
app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

// Search tasks by keyword
app.get('/api/tasks/search', (req, res) => {
    const { keyword } = req.query;

    if (!keyword) {
        return res.status(400).json({ error: "Keyword query is required" });
    }

    const result = tasks.filter(
        task =>
            task.title.toLowerCase().includes(keyword.toLowerCase()) ||
            task.description.toLowerCase().includes(keyword.toLowerCase())
    );

    res.json(result);
});

// Add a new task
app.post('/api/tasks', (req, res) => {
    const { title, description, priority } = req.body;

    if (!title || !description || !priority) {
        return res.status(400).json({ error: "title, description, and priority are required" });
    }

    const newTask = {
        id: tasks.length + 1,
        title,
        description,
        priority,
        createdAt: new Date().toISOString()
    };

    tasks.push(newTask);

    // Save to file
    saveTasks(tasks, "data/tasks.json");

    res.status(201).json(newTask);
});

// Get profile (by username or email in query string)
app.get("/profile", (req, res) => {
    const { username, email } = req.query;

    if (!username && !email) {
        return res.status(400).json({ error: "username or email is required" });
    }

    const user = users.find(
        u => u.username === username || u.email === email
    );

    if (!user) {
        return res.status(404).json({ error: "User not found" });
    }

    res.json(user);
});

// Register a new user
app.post("/register", (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ error: "username, email, and password are required" });
    }

    if (users.some(u => u.username === username || u.email === email)) {
        return res.status(400).json({ error: "User already exists" });
    }

    const newUser = {
        id: users.length + 1,
        username,
        email,
        password
    };

    users.push(newUser);

    // Save to file
    saveUsers(users, "data/users.json");

    res.status(201).json(newUser);
});

// Login
app.post("/login", (req, res) => {
    const { username, email, password } = req.body;

    if ((!username && !email) || !password) {
        return res.status(400).json({ error: "username/email and password are required" });
    }

    const user = users.find(
        u => (u.username === username || u.email === email) && u.password === password
    );

    if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
    }

    res.json({ message: "Login successful", user });
});

// ================================================

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
