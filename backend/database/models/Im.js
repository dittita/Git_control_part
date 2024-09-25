const { Sequelize, DataTypes } = require("sequelize");
const database = require("../icx_connection"); // ../ คือการ ถอย path ออกไป 1 ขั้น
const table = database.define(
  "Im", //table name
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    Model: {
      type: Sequelize.STRING, // type
      allowNull: true,
    },
  }
);
(async () => {
  await table.sync({ force: false });
})();

module.exports = table;
