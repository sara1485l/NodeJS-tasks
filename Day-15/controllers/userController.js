const  UsersData  = require("../models/User");

const getAllUsers = async (req, res) => {
  try {
    const users = await UsersData.find({}, "-password");
    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err.message });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await UsersData.findById(req.params.id, "-password");
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Error fetching user", error: err.message });
  }
};

const addUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Only admin can add users" });
    }

    const { username, email, password, role } = req.body;

    const newUser = new UsersData({ username, email, password, role });
    await newUser.save();

    res.status(201).json({ message: "User added successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error adding user", error: err.message });
  }
};

// Edit User
const editUser = async (req, res) => {
  try {
    const user = await UsersData.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User updated successfully", user });
  } catch (err) {
    res.status(500).json({ message: "Error updating user", error: err.message });
  }
};

const deleteUser = async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "Forbidden: Only admin can delete users" });
    }

    const deletedUser = await UsersData.findByIdAndDelete(req.params.id);
    if (!deletedUser) return res.status(404).json({ message: "User not found" });
    res.status(200).json({ message: "User deleted successfully" });
  } catch (err) {
    res.status(500).json({ message: "Error deleting user", error: err.message });
  }
};

module.exports = { getAllUsers, getUserById, addUser, editUser, deleteUser };
