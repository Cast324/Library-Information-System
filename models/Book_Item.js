/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Book_Item', {
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
    format: {
      type: DataTypes.STRING(50),
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
    locationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      references: {
        model: 'Location',
        key: 'locationId'
      }
    }
  }, {
    tableName: 'Book_Item'
  });
};
