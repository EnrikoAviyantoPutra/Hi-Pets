'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ChatRoom extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ChatRoom.belongsTo(models.User, {foreignKey: 'user_id'})
      ChatRoom.belongsTo(models.Doctor, {foreignKey: 'doctor_id'})
    }
  };
  ChatRoom.init({
    user_id: DataTypes.INTEGER,
    doctor_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ChatRoom',
  });
  return ChatRoom;
};