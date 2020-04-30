const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

Item = sequelize.define('Item', {
    barcode: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      primaryKey: true
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    format: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    language: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    libraryId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Library',
        key: 'libraryId'
      }
    },
    collectionId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'Collection',
        key: 'collectionId'
      }
    },
    checkedOut: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    onHold: {
      type: DataTypes.INTEGER(1),
      allowNull: true,
      defaultValue: '0'
    },
    location: {
      type: DataTypes.STRING(30),
      allowNull: false,
      defaultValue: '0'
    },
    updatedAt: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
  }, {
    tableName: 'Item'
  });

module.exports = Item;
