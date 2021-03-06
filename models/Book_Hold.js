const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

Book_Hold = sequelize.define('Book_Hold', {
    reservationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    creationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    status: {
      type: DataTypes.STRING(50),
      allowNull: true
    },
    accountId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Account',
        key: 'accountId'
      }
    },
    barcode: {
      type: DataTypes.CHAR(15),
      allowNull: false,
      references: {
        model: 'Item',
        key: 'barcode'
      }
    }
  }, {
    tableName: 'Book_Hold'
  });

module.exports = Book_Hold;
