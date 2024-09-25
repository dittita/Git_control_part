const { Sequelize, DataTypes } = require("sequelize");
const database = require("../icx_connection_diecast"); // ../ คือการ ถอย path ออกไป 1 ขั้น
const Diecast = database.define(
  "Spec_Diecast", //table name
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
