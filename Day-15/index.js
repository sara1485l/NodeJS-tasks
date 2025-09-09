const express = require('express');
const { connectDB } = require('./config/connDB');
const mongoose = require('mongoose');
const session = require("express-session");
const cors = require('cors')
const { usersData } = require('./models/User');
const { checkAuth } = require('./middleware/checkAuth');

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }));
const ips = ['http://127.0.0.1:3000', "http://localhost:3000", "http://127.0.0.1:5500"];
app.use(cors({
    origin: (ip, callback) => {
        try {
            if (!ip || ips.includes(ip)) {
                callback(null, true);
            }
            else {
                callback("Not allowed by CORS");
            }
        }
        catch (error) {
            console.log(error);
        }
        
    },
    credentials: true
}))



app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60,
        httpOnly: true,
        secure: false
    }
}));

connectDB()

const authRoutes = require("./router/authRouter");
const userRoutes = require("./router/userRouter");
const studentRoutes = require("./router/studentRouter");

app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use("/students", studentRoutes);



mongoose.connection.once('connected', () => {
    console.log("MongoDB connected..............");
    app.listen(process.env.PORT, () => console.log('Server Runing...........'))
})

mongoose.connection.on('error', (err) => {
    console.log(err);
})


