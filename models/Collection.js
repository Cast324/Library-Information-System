const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Collection = sequelize.define('Collection', {
    collectionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    collectionName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'Collection',
    timestamps: false
  });


  module.exports = Collection;
