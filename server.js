const express = require("express");
const cors = require("cors");
const sequelize = require("./config/database");
const User = require("./models/user");
const Claim = require("./models/claim");
const authRoutes = require("./routes/authRoutes");
const claimRoutes = require("./routes/claimRoutes");

const app = express();
app.use(express.json());
app.use(cors());

app.use("/auth", authRoutes);
app.use("/claims", claimRoutes); 

sequelize.sync({ alter: true }).then(() => {
  console.log("Database synced ✅");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
