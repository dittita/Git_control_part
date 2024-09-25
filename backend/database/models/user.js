const { Sequelize, DataTypes } = require("sequelize");
const database = require("../icx_connection"); // ../ คือการ ถอย path ออกไป 1 ขั้น
const user = database.define(
  "user", //table name
  {
    username: {
      //column name
      type: Sequelize.STRING, // type
      allowNull: false,
      //primaryKey: true,
    },
    empNumber: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: true, //no duplicate data
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
      unique: true, //no duplicate data
    },
    position: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }
);
(async () => {
  await user.sync({ force: false });
})();

module.exports = user;
