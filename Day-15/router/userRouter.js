const express = require("express");
const { checkAuth } = require("../middleware/checkAuth");
const { getAllUsers, getUserById, addUser, editUser, deleteUser } = require("../controllers/userController");
const router = express.Router();

router.use(checkAuth); 

router.get("/", getAllUsers);
router.get("/:id", getUserById);
router.post("/", addUser);
router.put("/:id", editUser);
router.delete("/:id", deleteUser);

module.exports = router;
