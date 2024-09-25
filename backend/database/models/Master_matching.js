const { Sequelize, DataTypes } = require("sequelize");
const database = require("../icx_connection"); // ../ คือการ ถอย path ออกไป 1 ขั้น
const table = database.define(
  "Master_matching", //table name
  {
    id: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      allowNull: false,
      primaryKey: true,
    },
    Fullname: {
      //column name
      type: Sequelize.STRING, // type
      allowNull: true,
      // primaryKey: true,
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
    LSL: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    CL: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    USL: {
      type: Sequelize.FLOAT,
      allowNull: true,
    },
    Part: {
      type: Sequelize.STRING,
      allowNull: true,
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
  await table.sync({ force: false });
})();

module.exports = table;
