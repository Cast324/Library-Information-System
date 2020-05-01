const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book_Item = sequelize.define('Book_Item', {
    barcode: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Item',
        key: 'barcode'
      }
    },
    numberOfPages: {
      type: DataTypes.INTEGER(6),
      allowNull: false
    },
    isBorrowed: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    onHold: {
      type: DataTypes.INTEGER(1),
      allowNull: true
    },
    borrowedCount: {
      type: DataTypes.INTEGER(6),
      allowNull: true
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    author: {
      type: DataTypes.STRING(100),
      allowNull: false
    }
  }, {
    tableName: 'Book_Item',
    timestamps: false
  });

module.exports = Book_Item;
