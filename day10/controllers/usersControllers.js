const { usersData } = require("../models/users");

const GetAllUsers = async (req, res) => {
    try {
        const users = await usersData.find();

        const filteredUsers = users.map(u => ({
            fullName: u.fullName,
            username: u.username,
            email: u.email
        }));

        res.json(filteredUsers);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch users" });
    }
};
const DeleteUser = async (req, res) => {
    try {
        const userId = Number(req.params.id); 
        if (isNaN(userId)) {
            return res.status(400).json({ message: "Invalid user ID" });
        }
        const user = await usersData.findOne({ id: userId });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        await usersData.deleteOne({ id: userId });

        res.redirect('/users');

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};
module.exports = { GetAllUsers, DeleteUser };
