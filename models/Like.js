'use strict'; //
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'cascade' });
      this.belongsTo(models.Post, { foreignKey: 'post_id', onDelete: 'cascade' });
    }
  }

  Like.init(
    {
      like_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      createdAt: {
        type: DataTypes.DATE,
        field: 'created_at',
      },
      updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
      },
    },
    {
      sequelize,
      modelName: 'Like',
      timestamps: true,
    },
  );

  return Like;
};
