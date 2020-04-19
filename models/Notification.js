/* jshint indent: 2 */

module.exports = function(sequelize, DataTypes) {
  return sequelize.define('Notification', {
    notificationId: {
      type: DataTypes.INTEGER(11),
      allowNull: false,
      primaryKey: true,
      autoIncrement: true
    },
    creationDate: {
      type: DataTypes.DATEONLY,
      allowNull: true
    },
    content: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
    reservationId: {
      type: DataTypes.INTEGER(11),
      allowNull: true,
      references: {
        model: 'Book_Hold',
        key: 'reservationId'
      }
    }
  }, {
    tableName: 'Notification'
  });
};
