const Student = require("../models/student");

const GetAllStudents = async (req, res) => {
    try {
        const students = await Student.find();

        const filteredStudents = students.map(s => ({
            id: s.id,
            firstName: s.firstName,
            lastName: s.lastName,
            email: s.email
        }));

        res.json(filteredStudents); 
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Failed to fetch students" });
    }
};

const DeleteStudent = async (req, res) => {
    try {
        const studentId = parseInt(req.params.id); 

        const student = await Student.findOne({ id: studentId });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }

        await Student.deleteOne({ id: studentId });

        res.json({ message: "Student deleted successfully" });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server error" });
    }
};

module.exports = { GetAllStudents, DeleteStudent };
