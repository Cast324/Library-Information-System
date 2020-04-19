/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Author_Item', {
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
  }, {
    tableName: 'Author_Item'
  });
};
