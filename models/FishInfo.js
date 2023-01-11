'use strict'; //
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class FishInfo extends Model {
    static associate(models) {
      this.belongsTo(models.Post, { foreignKey: 'post_id' });
    }
  }

  FishInfo.init(
    {
      fish_info_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      fish_name: {
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
      modelName: 'FishInfo',
      timestamps: true,
    },
  );

  return FishInfo;
};
