/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Collection', {
    collectionId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    collectionName: {
      type: DataTypes.STRING(100),
      allowNull: false
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true
    }
  }, {
    tableName: 'Collection'
  });
};
