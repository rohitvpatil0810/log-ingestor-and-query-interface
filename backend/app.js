const express = require("express");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const connectToDatabase = require("./config/database");
// const logRoutes = require("./routes/logs");

const app = express();
const port = process.env.PORT || 3000;

// Connect to the database
connectToDatabase();

// app.use("/logs", logRoutes);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
