/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Book_Hold', {
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
        model: 'Book_Item',
        key: 'barcode'
      }
    }
  }, {
    tableName: 'Book_Hold'
  });
};
