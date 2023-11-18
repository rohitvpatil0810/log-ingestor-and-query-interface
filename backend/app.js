const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const connectToDatabase = require("./config/database");
const router = require("./routes");

const app = express();
app.use(express.json());
app.use(cors());
const port = process.env.PORT || 3000;

// Connect to the database
connectToDatabase();

app.use(router);

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
