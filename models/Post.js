'use strict'; //
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      this.hasMany(models.Comment, { foreignKey: 'post_id' });
      this.hasMany(models.PostImage, { foreignKey: 'post_id' });
      this.hasMany(models.FishInfo, { foreignKey: 'post_id' });
      this.hasMany(models.Like, { foreignKey: 'post_id' });
      this.belongsTo(models.User, { foreignKey: 'user_id' });
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
      modelName: 'Post',
      timestamps: false,
    },
  );

  return Post;
};
