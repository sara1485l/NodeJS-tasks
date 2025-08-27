const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    id: { 
        type: Number, 
        required: true, 
        unique: true 
    },
    firstName: { 
        type: String, 
        required: true 
    },
    lastName: { 
        type: String, 
        required: true 
    },
    email: { 
        type: String,
        required: true,
        unique: true 
    },
    age: { 
        type: Number, 
        required: true 
    },
    course: { 
        type: String,
        required: true 
    },
    status: { 
        type: String, 
        enum: ["Active", "Inactive","Graduated"], 
        required: true 
    }
});

const Student = mongoose.model("Student", studentSchema);

module.exports = Student;
