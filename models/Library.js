/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Library', {
    libraryId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    address: {
      type: DataTypes.STRING(255),
      allowNull: false
    },
    phoneNumber: {
      type: DataTypes.STRING(10),
      allowNull: false
    }
  }, {
    tableName: 'Library'
  });
};
