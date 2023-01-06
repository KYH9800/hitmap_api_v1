'use strict'; //
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasOne(models.UserImage, { foreignKey: 'user_id' });
      this.hasOne(models.KaKaoUser, { foreignKey: 'user_id' });
      this.hasOne(models.NaverUser, { foreignKey: 'user_id' });
      this.hasMany(models.Post, { foreignKey: 'user_id' });
      this.hasMany(models.Comment, { foreignKey: 'user_id' });
      this.hasMany(models.Like, { foreignKey: 'user_id' });
      this.hasMany(models.Follow, { foreignKey: 'user_id' });
    }
  }

  User.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      nickname: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      created_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defalutValue: DataTypes.NOW,
      },
      updated_at: {
        type: DataTypes.DATE,
        allowNull: false,
        defalutValue: DataTypes.NOW,
      },
    },
    {
      sequelize,
      modelName: 'User',
      timestamps: false,
    },
  );

  return User;
};
