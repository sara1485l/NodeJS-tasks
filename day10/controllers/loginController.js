const { usersData } = require('../models/users');
const {tokenData} = require('../models/token')
const bcrypt = require('bcrypt');

const getLoginPage = (req, res) => {
    res.render("login", { message: null });
};

const postLogin = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await usersData.findOne({ username });

        if (!user) {
            return res.render("login", { message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (isMatch) {
            const addToken = new tokenData({
                username : user.username,
                email : user.email,
                role : user.role
                })
    await addToken.save();
            res.render("index", { user });
        } else {
            res.render("login", { message: "Invalid password" });
        }

    } catch (err) {
        console.error(err);
        res.render("login", { message: "Server error" });
    }
};

module.exports = {
    getLoginPage,
    postLogin
};
