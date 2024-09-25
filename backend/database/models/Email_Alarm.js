const { Sequelize, DataTypes } = require("sequelize");
const database = require("../icx_connection"); // ../ คือการ ถอย path ออกไป 1 ขั้น
const Email = database.define(
  "Email_Alarm", //table name
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
    Line: {
      type: Sequelize.STRING,
      allowNull: true,
    },
    Email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    empNumber: {
        type: Sequelize.STRING,
        allowNull: true,
      },
  }
);
(async () => {
  await Email.sync({ force: false });
})();

module.exports = Email;
