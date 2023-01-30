'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.hasMany(models.Comment, { foreignKey: 'post_id' });
      this.hasMany(models.PostImage, { foreignKey: 'post_id', onDelete: 'cascade' });
      this.hasMany(models.FishInfo, { foreignKey: 'post_id' });
      this.hasMany(models.Like, { foreignKey: 'post_id' });
      this.belongsTo(models.User, { foreignKey: 'user_id', onDelete: 'cascade' });
    }
  }

  Post.init(
    {
      post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      content: {
        type: DataTypes.STRING,
        allowNull: false,
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
      modelName: 'Post',
      timestamps: true,
    },
  );

  return Post;
};
