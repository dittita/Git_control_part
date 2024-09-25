const { Sequelize, DataTypes } = require("sequelize");
const database = require("../icx_connection");
const DataShow = database.define("Data_shows", {
  // Model attributes are defined here

  Barcode: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  Axial_Play: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },

  Oil_Top: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  Oil_Bottom: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  Line: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  Model: {
    type: DataTypes.STRING,
    allowNull: false,
  },

  Timestamp: {
    type: DataTypes.DATE,
    allowNull: false,
  },

  MC_Axial_Play: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  MC_Oil_Top: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  MC_Oil_Bottom: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
});

(async () => {
  await DataShow.sync({ force: false });
})();

module.exports = DataShow;
