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
      modelName: 'PostImage',
      timestamps: true,
    },
  );

  return PostImage;
};
