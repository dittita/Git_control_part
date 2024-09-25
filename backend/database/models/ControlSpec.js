const { Sequelize, DataTypes } = require("sequelize");
const database = require("../icx_connection"); // ../ คือการ ถอย path ออกไป 1 ขั้น
const table = database.define(
  "ControlSpec", //table name
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
    Parameter: {
      type: Sequelize.STRING,
      allowNull: true,
    },    
    CL: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    LCL: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    UCL: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    CL_STD: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    LCL_STD: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    UCL_STD: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
  }
);
(async () => {
  await table.sync({ force: false });
})();

module.exports = table;
