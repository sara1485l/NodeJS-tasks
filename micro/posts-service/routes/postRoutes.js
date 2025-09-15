const express = require("express");
const { addPost, getPostById, getPostsByUser, deletePost } = require("../controllers/postController");
const { authMiddleware } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/add-new-post", authMiddleware, addPost);
router.get("/get-post/:id", getPostById);
router.get("/get-posts-by-user/:userId", getPostsByUser);
router.delete("/delete-post/:id", authMiddleware, deletePost);

module.exports = router;
