const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const notificationRoutes = require("./routes/notifications");

dotenv.config();
connectDB();

const app = express();
app.use(express.json());
app.use("/", notificationRoutes);

module.exports = app;
