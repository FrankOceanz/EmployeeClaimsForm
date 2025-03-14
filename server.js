const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const User = require("./models/user");
const Claim = require("./models/claim");

const app = express();
app.use(express.json());
app.use(cors());

// Test Route
app.get("/", (req, res) => res.send("API is running..."));

// Sync Tables
sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced ✅");
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
