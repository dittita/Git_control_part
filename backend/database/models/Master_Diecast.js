const { Sequelize, DataTypes } = require("sequelize");
const database = require("../icx_connection_diecast"); // ../ คือการ ถอย path ออกไป 1 ขั้น
const Diecast = database.define(
  "Master_Diecast", //table name
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    Model: {
      //column name
      type: Sequelize.STRING, // type
      allowNull: true,
      //   primaryKey: true,
    },
    Machine: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    empNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  }
);
(async () => {
  await Diecast.sync({ force: false });
})();

module.exports = Diecast;
