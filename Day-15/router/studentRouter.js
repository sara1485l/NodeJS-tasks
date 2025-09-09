const express = require("express");
const { getAllStudents, getStudentById, addStudent, editStudent, deleteStudent } = require("../controllers/studentController");
const router = express.Router();

router.get("/", getAllStudents);
router.get("/:id", getStudentById);
router.post("/", addStudent);
router.put("/:id", editStudent);
router.delete("/:id", deleteStudent);

module.exports = router;
