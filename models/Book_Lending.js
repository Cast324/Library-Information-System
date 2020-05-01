const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

Book_Lending = sequelize.define('Book_Lending', {
    accountId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Account',
        key: 'accountId'
      }
    },
    creationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    returnDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    barcode: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Item',
        key: 'barcode'
      }
    }
  }, {
    tableName: 'Book_Lending',
    timestamps: false 
  });

  module.exports = Book_Lending;
