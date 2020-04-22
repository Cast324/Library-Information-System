const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Library = sequelize.define('Library', {
    libraryId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    tableName: 'Library'
  });

module.exports = Library;
