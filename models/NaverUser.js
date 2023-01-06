'use strict'; //
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class NaverUser extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  NaverUser.init(
    {
      naver_user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
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
      modelName: 'NaverUser',
      timestamps: false,
    },
  );

  return NaverUser;
};
