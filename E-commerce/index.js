const express = require('express');
const session = require('express-session');
const cors = require('cors');
const mongoose = require('mongoose');
const { connectDB } = require('./config/connDB');
const authRouter = require('./router/authRouter');
const reviewRoutes = require("./router/reviewRoutes");
const app = express();
app.use(express.json());
app.use(cors());
connectDB();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 60,
        httpOnly: true
    }
}))


app.use('/auth', authRouter)
app.use("/orders", reviewRoutes);
// app.use('/user')
// app.use('/product')
// app.use('/order')


mongoose.connection.once('connected', () => {
    console.log('Connected to MongoDB');
    app.listen(process.env.PORT, () => {
        console.log('Server started on port 3000');
    });
});

mongoose.connection.on('error', err => {
    console.log(err);
});