const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const postRoutes = require("./routes/postRoutes");
app.use("/posts", postRoutes);

const PORT = process.env.PORT || 4002;
app.listen(PORT, () => console.log(`Posts service running on port ${PORT}`));
