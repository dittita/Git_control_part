const { Sequelize, DataTypes } = require("sequelize");
const database = require("../icx_connection_ML _Master");

const user_Master = database.define(
  "user_Master",
  {
    username: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    empNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    levelUser: {
      type: Sequelize.STRING,
      defaultValue: "guest",
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    position: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }
);

// Corrected sync call
(async () => {
  await user_Master.sync({ force: false });
})();

module.exports = user_Master;
