const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Item = sequelize.define('Item', {
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
    addedDate: {
      type: DataTypes.DATEONLY,
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
    }
  }, {
    tableName: 'Item',
    timestamps: false
  });

module.exports = Item;
