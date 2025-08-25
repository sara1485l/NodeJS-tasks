const fs = require("fs");

/**
 * Load tasks from JSON file named "data/tasks.json"
 *
 * @param {string} dbFile
 *     This is the path to the json file
 */
function loadTasks(tasks, dbFile) {
    if (fs.existsSync(dbFile)) {
        const data = fs.readFileSync(dbFile, "utf-8");
        if (data) {
            const parsed = JSON.parse(data);
            tasks.push(...parsed);
        }
    }
}

/**
 * Save tasks to JSON file named "data/tasks.json"
 *
 * @param {string} dbFile
 *     This is the path to the json file
 */
function saveTasks(tasks, dbFile) {
    fs.writeFileSync(dbFile, JSON.stringify(tasks, null, 2));
}

/**
 * Load users from JSON file named "data/users.json"
 *
 * @param {string} dbFile
 *     This is the path to the json file
 */
function loadUsers(users, dbFile) {
    if (fs.existsSync(dbFile)) {
        const data = fs.readFileSync(dbFile, "utf-8");
        if (data) {
            const parsed = JSON.parse(data);
            users.push(...parsed);
        }
    }
}

/**
 * Save users to JSON file named "data/users.json"
 *
 * @param {string} dbFile
 *     This is the path to the json file
 */
function saveUsers(users, dbFile) {
    fs.writeFileSync(dbFile, JSON.stringify(users, null, 2));
}

/**
 * This function will save logged in user to a file named "data/loggedInUser.json"
 *
 * @param {{username: string, email: string, role: 'ADMIN' | 'USER'}} user
 *     This is the user object that will be saved to the file
 */
function saveLoggedInUser(user) {
    fs.writeFileSync("data/loggedInUser.json", JSON.stringify(user, null, 2));
}

/**
 * This function will load logged in user from a file named "data/loggedInUser.json"
 * if file does not exist or file is empty it will return null
 *
 * @returns {{username: string, email: string, role: 'ADMIN' | 'USER'} | null} user
 *     This is the user object that will be loaded from the file or null
 *     if file does not exist or file is empty
 */
function loadLoggedInUser() {
    const dbFile = "data/loggedInUser.json";
    if (fs.existsSync(dbFile)) {
        const data = fs.readFileSync(dbFile, "utf-8");
        if (data) {
            return JSON.parse(data);
        }
    }
    return null;
}

module.exports = {
    loadTasks,
    saveTasks,
    loadUsers,
    saveUsers,
    saveLoggedInUser,
    loadLoggedInUser
};
