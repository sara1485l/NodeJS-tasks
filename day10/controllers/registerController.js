const { usersData } = require('../models/users');
const bcrypt = require('bcrypt');
const { tokenData } = require('../models/token');

const showRegister = (req, res) => {
    res.render('register', { message: null });
};

const registerUser = async (req, res) => {
    try {
        const { fullName, username, email, password, role } = req.body;

        const existingUser = await usersData.findOne({ 
            $or: [{ email }, { username }] 
        });

        if (existingUser) {
            return res.render('register', { 
                message: "Username or Email is already used" 
            });
        }
        const lastUser = await usersData.findOne().sort({ id: -1 });
        const newId = lastUser ? lastUser.id + 1 : 1;

        const validRoles = ["admin", "teacher", "student"];
        const role1 = role?.trim().replace(/['"]/g, '').toLowerCase() || "student";
        if (!validRoles.includes(role1)) {
            return res.render('register', { message: "Invalid role" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = new usersData({
            id: newId,
            fullName,
            username,
            email,
            password: hashedPassword,
            role: role1
        });
        await newUser.save();

        const addToken = new tokenData({
            username,
            email,
            role: role1
        });
        await addToken.save();

        res.render('register', { message: "Account created successfully!" });

    } catch (err) {
        console.error(err);
        res.render('register', { message: "Error: " + err.message });
    }
};

module.exports = { showRegister, registerUser };
