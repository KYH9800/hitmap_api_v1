'use strict'; //
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'user_id' });
      this.belongsTo(models.Post, { foreignKey: 'post_id' });
    }
  }

  Comment.init(
    {
      comment_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      fish_name: {
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
      modelName: 'Comment',
      timestamps: false,
    },
  );

  return Comment;
};
