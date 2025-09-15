const express = require("express");
const { createReel, getReelById } = require("../controllers/reelController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/create", authMiddleware, createReel);
router.get("/get/:id", getReelById);

module.exports = router;
