'use strict'; //
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserImage extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  UserImage.init(
    {
      user_image_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      src: {
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
      modelName: 'UserImage',
      timestamps: false,
    },
  );

  return UserImage;
};
