const express = require("express");
const { createGroup, getGroupById } = require("../controllers/groupController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createGroup);
router.get("/get/:id", getGroupById);

module.exports = router;
