const { Sequelize, DataTypes } = require("sequelize");
const database = require("../icx_connection"); // ../ คือการ ถอย path ออกไป 1 ขั้น
const table = database.define(
  "Master_prod_rotor", //table name
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
    Line: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    MC_Axial_Play: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    MC_Oil_Top: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    MC_Oil_Bottom: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  }
);
(async () => {
  await table.sync({ force: false });
})();

module.exports = table;