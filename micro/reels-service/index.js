const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const reelRoutes = require("./routes/reelRoutes");
app.use("/reels", reelRoutes);

const PORT = process.env.PORT || 4004;
app.listen(PORT, () => console.log(`Reels service running on port ${PORT}`));
