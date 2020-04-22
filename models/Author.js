const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Author = sequelize.define('Author', {
    authorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    firstName: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    lastName: {
      type: DataTypes.INTEGER(11),
      allowNull: false
    },
    biography: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'Author'
  });

  module.exports = Author;
