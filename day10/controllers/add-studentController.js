const Student = require("../models/student");

const AddStudentPage = (req, res) => {
    res.render("add-student", { 
        key: "add-student", 
        message: null,
        user: null
    });
};

const AddStudent = async (req, res) => {
    const { firstName, lastName, email, age, course, status } = req.body;

    if (!firstName || !lastName || !email || !age || !course || !status) {
        return res.render("add-student", { 
            key: "add-student", 
            message: "All fields are required", 
            user: null
        });
    }

    try {
        const lastStudent = await Student.findOne().sort({ id: -1 });
        const newId = lastStudent ? lastStudent.id + 1 : 1;

        const newStudent = new Student({ 
            id: newId, 
            firstName, 
            lastName, 
            email, 
            age, 
            course, 
            status 
        });
        await newStudent.save();

        return res.render("add-student", { 
            key: "add-student", 
            message: "Student added successfully", 
            user: null
        });
    } catch (error) {
        console.error(error);

        return res.render("add-student", { 
            key: "add-student", 
            message: "Error while adding the student", 
            user: null
        });
    }
};

module.exports = { AddStudentPage, AddStudent };
