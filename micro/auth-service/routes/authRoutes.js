const express = require("express");
const { register, login, sendOtp, newPassword, profile } = require("../controllers/authController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/otp", sendOtp);
router.post("/new-pass", newPassword);

module.exports = router;
