'use strict'; //
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Follow extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
    }
  }

  Follow.init(
    {
      follow_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      interest_user_id: {
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
      modelName: 'Follow',
      timestamps: false,
    },
  );

  return Follow;
};
