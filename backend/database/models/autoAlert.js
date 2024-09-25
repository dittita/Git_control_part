const { Sequelize, DataTypes } = require("sequelize");
const database = require("../icx_connection"); // ../ คือการ ถอย path ออกไป 1 ขั้น
const AutoAlarm = database.define(
  "AutoAlarm", //table name
  {
    // Date: {
    //   type: Sequelize.Date,
    //   allowNull: true,
    // },
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
    // Time: {
    //   type: Sequelize.Time,
    //   allowNull: true,
    // },
    Average: {
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
    Machine: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Parameter: {
      type: Sequelize.STRING,
      allowNull: true,
    },
  }
);
(async () => {
  await AutoAlarm.sync({ force: false });
})();

module.exports = AutoAlarm;