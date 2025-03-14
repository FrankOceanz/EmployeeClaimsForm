const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../config/database");
const User = require("./user");

const Claim = sequelize.define("Claim", {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  userId: { type: DataTypes.INTEGER, allowNull: false },
  amount: { type: DataTypes.FLOAT, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  status: { type: DataTypes.STRING, defaultValue: "pending" }, // "pending", "approved", "rejected"
});

Claim.belongsTo(User, { foreignKey: "userId" });

module.exports = Claim;
