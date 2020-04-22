const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Book_Lending = sequelize.define('Book_Lending', {
    accountId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Account',
        key: 'accountId'
      }
    },
    barcode: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Book_Item',
        key: 'barcode'
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
    }
  }, {
    tableName: 'Book_Lending'
  });

module.exports = Book_Lending;
