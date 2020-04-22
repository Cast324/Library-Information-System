const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Author_Item = sequelize.define('Author_Item', {
    authorId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      references: {
        model: 'Author',
        key: 'authorId'
      }
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
  },{
    tableName: 'Author_Item'
});

module.exports = Author_Item;