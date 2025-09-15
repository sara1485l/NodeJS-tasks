const express = require("express");
const { addStudent, getStudents, getStudentById, updateStudent, deleteStudent } = require("../controllers/studentController");

const router = express.Router();

router.post("/add", addStudent);
router.get("/all", getStudents);
router.get("/:id", getStudentById);
router.put("/:id", updateStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
