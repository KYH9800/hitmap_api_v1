'use strict'; //
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PostImage extends Model {
    static associate(models) {
      this.belongsTo(models.Post, { foreignKey: 'post_id' });
    }
  }

  PostImage.init(
    {
      post_image_id: {
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
      modelName: 'PostImage',
      timestamps: false,
    },
  );

  return PostImage;
};
