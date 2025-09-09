const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const  UsersData  = require("../models/User");


const register = async (req, res) => {
    try {
    const { username, email, password, role } = req.body;

    const existingUser = await UsersData.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already registered" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new UsersData({
        username,
        email,
        password: hashedPassword,
        role: role || "user"
    });

    await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(500).json({ message: "Register error", error: err.message });
  }
};


const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await UsersData.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    req.session.token = token;

    res.status(200).json({ message: "Login successful", token });
  } catch (err) {
    res.status(500).json({ message: "Login error", error: err.message });
  }
};

const logout = (req, res) => {
  req.session.destroy();
  res.status(200).json({ message: "Logged out successfully" });
};



module.exports = { register, login, logout };
