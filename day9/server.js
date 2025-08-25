// Express Server Entry Point
const express = require('express');
const app = express();
const PORT = 6060;

// Import helpers
const { 
    loadTasks, saveTasks, 
    loadUsers, saveUsers, 
    saveLoggedInUser, loadLoggedInUser 
} = require('./utils');

// Local Database
const tasks = [];
const users = [];

loadTasks(tasks, "data/tasks.json");
loadUsers(users, "data/users.json");
let loggedInUser = loadLoggedInUser();

// Middleware
app.use(express.json());

// Routes
app.get('/api/tasks', (req, res) => {
    // should get all tasks from tasks array
    res.json(tasks);
});

app.get('/api/tasks/search', (req, res) => {
    // query string should contain keyword and we should search in tasks array using this keyword
    // If the keyword exists on title or description we should respond with this task
    const keyword = req.query.keyword?.toLowerCase();
    if (!keyword) {
        return res.status(400).json({ message: "Keyword is required" });
    }
    const results = tasks.filter(t =>
        t.title.toLowerCase().includes(keyword) ||
        t.description.toLowerCase().includes(keyword)
    );
    res.json(results);
});

// YOU MUST BE LOGGED IN TO DO IT
app.post('/api/tasks', (req, res) => {
    if (!loggedInUser) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // body should contain these info title, description
    // priority(high, low, medium) + the username who created the task
    const { title, description, priority } = req.body;
    if (!title || !description || !priority) {
        return res.status(400).json({ message: "Missing required fields" });
    }

    const task = {
        id: tasks.length + 1,
        title: title, // GET TITLE VALUE FROM request body,
        description: description, // GET DESCRIPTION VALUE FROM request body,
        priority: priority, // GET PRIORTY VALUE FROM request body,
        username: loggedInUser.username, // GET USERNAME FROM THE USER CURRENTLY LOGGED IN
    }
    tasks.push(task);

    // KEEP THIS CODE AFTER ADDING TASK TO TASKS ARRAY
    saveTasks(tasks, "data/tasks.json");
    res.status(201).json(task);
});

// YOU MUST BE LOGGED IN TO DO IT OR YOU ARE THE CREATOR OF THE TASK
app.delete('/api/tasks/', (req, res) => {
    if (!loggedInUser) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    // request should contain id of task to delete
    const id = parseInt(req.query.id);
    const taskIndex = tasks.findIndex(t => t.id === id);
    if (taskIndex === -1) {
        return res.status(404).json({ message: "Task not found" });
    }

    const task = tasks[taskIndex];
    if (loggedInUser.username !== task.username && loggedInUser.role !== "ADMIN") {
        return res.status(403).json({ message: "Forbidden" });
    }

    tasks.splice(taskIndex, 1);

    // KEEP THIS CODE AFTER ADDING TASK TO TASKS ARRAY
    saveTasks(tasks, "data/tasks.json");
    res.json({ message: "Task deleted" });
});

app.get("/profile", (req, res)  => {
    // we get query string from req and search user in users array
    const username = req.query.username;
    const user = users.find(u => u.username === username);
    if (!user) {
        return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
});

// YOU MUST BE LOGGED IN AND HAVE ADMIN ROLE TO DO IT
app.delete("/profile", (req, res)  => {
    if (!loggedInUser || loggedInUser.role !== "ADMIN") {
        return res.status(403).json({ message: "Forbidden" });
    }
    // we get query string from req and search user in users array then delete this user
    const username = req.query.username;
    const userIndex = users.findIndex(u => u.username === username);
    if (userIndex === -1) {
        return res.status(404).json({ message: "User not found" });
    }
    users.splice(userIndex, 1);
    saveUsers(users, "data/users.json");
    res.json({ message: "User deleted" });
});

app.post("/register", (req, res)  => {
    // body should contain these info username, email, password, role (ADMIN or USER)
    const { username, email, password, role } = req.body;
    if (!username || !email || !password || !role) {
        return res.status(400).json({ message: "Missing required fields" });
    }
    const newUser = { username, email, password, role };
    users.push(newUser);

    // KEEP THIS CODE AFTER ADDING USER TO USERS ARRAY
    saveUsers(users, "data/users.json");
    res.status(201).json(newUser);
});

app.post("/login", (req, res)  => {
    // body should contain these info username or email, password
    // After logging user data will be saved into a file named "data/loggedInUser.json"
    // And we will use this file to check authentication for users in specifiec routes

    const user = users.find(user => user.username === req.body.username || user.email === req.body.username);
    if (!user) {
        return res.status(401).json({ message: "User Not Found" });
    }
    if (user.password !== req.body.password) {
        return res.status(401).json({ message: "Invalid credentials" });
    }

    saveLoggedInUser(user);
    loggedInUser = user;
    res.json({ message: "Login successful", user });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
