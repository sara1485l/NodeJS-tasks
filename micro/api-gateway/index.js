const express = require("express");
const dotenv = require("dotenv");
const morgan = require("morgan");
const gatewayRoutes = require("./routes/gatewayRoutes");

dotenv.config();

const app = express();
app.use(express.json());
app.use(morgan("dev"));

app.use("/", gatewayRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API Gateway running on port ${PORT}`));
