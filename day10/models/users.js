const mongoose = require('mongoose')
const user = new mongoose.Schema({
    id: {
    type: Number,
    required: true,
    },
    username: {
    type: String,
    required: true,
    unique: true,
    trim: true
    },
    password: {
    type: String,
    required: true,
    minlength: 6,
    },
    role: {
    type: String,
    enum: ["admin", "teacher", "student"],
    default:"student"
    },
    fullName: {
    type: String,
    required: true,
    trim: true
    },
    email: {
    type: String,
    required: true,
    lowercase: true,
    unique: true,
    },
    createdAt: {
    type: Date,
    default: Date.now
    }
})
const usersData = mongoose.model('users',user)
module.exports={usersData}