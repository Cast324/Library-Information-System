const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Lion_Card = sequelize.define('Lion_Card', {
    sNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'Lion_Card'
  });

  module.exports = Lion_Card;
