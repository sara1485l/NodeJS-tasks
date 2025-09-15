const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const groupRoutes = require("./routes/groupRoutes");
app.use("/groups", groupRoutes);

const PORT = process.env.PORT || 4003;
app.listen(PORT, () => console.log(` Groups service running on port ${PORT}`));
