const { Sequelize, DataTypes } = require("sequelize");
const database = require("../icx_connection_diecast"); // ../ คือการ ถอย path ออกไป 1 ขั้น
const control = database.define(
  "ControlLimit_Diecast", //table name
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
    Parameter: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Machine: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    StartCalcDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    FinishCalcDate: {
      type: Sequelize.DATE,
      allowNull: true,
    },
    empNumber: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  }
);
(async () => {
  await control.sync({ force: false });
})();

module.exports = control;