const { Sequelize, DataTypes } = require("sequelize");
const database = require("../icx_connection_ML"); // ../ คือการ ถอย path ออกไป 1 ขั้น
const control = database.define(
  "parameter", //table name
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },    
    Parameter: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  }
);
(async () => {
  await control.sync({ force: false });
})();

module.exports = control;