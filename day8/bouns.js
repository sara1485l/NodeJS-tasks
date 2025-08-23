const fs = require('fs');

/**
 * Load users from JSON file
 *
 * @param {Array} users
 * @param {string} dbFile
 */
function loadUsers(users, dbFile) {
    if (fs.existsSync(dbFile)) {
        const data = fs.readFileSync(dbFile, 'utf-8');
        if (data) {
            try {
                const parsed = JSON.parse(data);
                users.push(...parsed);
            } catch (err) {
                console.error("Error parsing users JSON:", err);
            }
        }
    }
}

/**
 * Load tasks from JSON file
 *
 * @param {Array} tasks
 * @param {string} dbFile
 */
function loadTasks(tasks, dbFile) {
    if (fs.existsSync(dbFile)) {
        const data = fs.readFileSync(dbFile, 'utf-8');
        if (data) {
            try {
                const parsed = JSON.parse(data);
                tasks.push(...parsed);
            } catch (err) {
                console.error("Error parsing tasks JSON:", err);
            }
        }
    }
}

/**
 * Save tasks to JSON file
 *
 * @param {Array} tasks
 * @param {string} dbFile
 */
function saveTasks(tasks, dbFile) {
    try {
        fs.writeFileSync(dbFile, JSON.stringify(tasks, null, 2), 'utf-8');
    } catch (err) {
        console.error("Error saving tasks JSON:", err);
    }
}

/**
 * Save users to JSON file
 *
 * @param {Array} users
 * @param {string} dbFile
 */
function saveUsers(users, dbFile) {
    try {
        fs.writeFileSync(dbFile, JSON.stringify(users, null, 2), 'utf-8');
    } catch (err) {
        console.error("Error saving users JSON:", err);
    }
}

module.exports = {
    loadUsers,
    loadTasks,
    saveTasks,
    saveUsers
};
