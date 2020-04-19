/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Location', {
    locationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true
    },
    locationIdentifier: {
      type: DataTypes.STRING(255),
      allowNull: false
    }
  }, {
    tableName: 'Location'
  });
};
