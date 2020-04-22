/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Lion_Card', {
    sNumber: {
      type: DataTypes.STRING(15),
      allowNull: false,
      primaryKey: true
    }
  }, {
    tableName: 'Lion_Card'
  });
};
