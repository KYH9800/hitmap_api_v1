'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Weather extends Model {
    static associate() {
      // associate
    }
  }

  Weather.init(
    {
      post_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        autoIncrement: true,
      },
      temp: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      wind_speed: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      wind_deg: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      date: {
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
      modelName: 'Weather',
      timestamps: true,
    },
  );

  return Weather;
};
