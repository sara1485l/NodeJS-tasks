const User = require("../models/User");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const transporter = require("../config/mailer");

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const exist = await User.findOne({ email });
    if (exist) return res.status(400).json({ msg: "Email already registered" });

    const user = await User.create({ username, email, password });
    res.status(201).json({ msg: "User registered", user });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email, password });
    if (!user) return res.status(401).json({ msg: "Invalid credentials" });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.json({ msg: "Login successful", token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


exports.sendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const otp = crypto.randomInt(100000, 999999).toString();

    const user = await User.findOneAndUpdate(
      { email },
      { otp },
      { new: true }
    );
    if (!user) return res.status(404).json({ msg: "User not found" });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}`,
    });

    res.json({ msg: "OTP sent to email" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.newPassword = async (req, res) => {
  try {
    const { email, otp, newPass } = req.body;
    const user = await User.findOne({ email, otp });
    if (!user) return res.status(400).json({ msg: "Invalid OTP or email" });

    user.password = newPass;
    user.otp = null;
    await user.save();

    res.json({ msg: "Password updated" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
