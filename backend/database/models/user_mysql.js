const { Sequelize, DataTypes } = require('sequelize');
const user2 = require('../icx_connection_mysql'); // Adjust the path as needed

const User = database.define('user', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  empNumber: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    primaryKey: true,
  },
  password: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  levelUser: {
    type: Sequelize.STRING,
    defaultValue: 'guest',
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  position: {
    type: Sequelize.STRING,
    allowNull: false,
  },
});

(async () => {
  try {
    await User.sync({ force: false });
    console.log('The table for the User model was just (re)created!');
  } catch (error) {
    console.error('Error syncing the User model:', error);
  }
})();

module.exports = User;
