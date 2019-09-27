'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Sequelize.Model {}

  RefreshToken.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
      },
      token: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      timestamps: false,
      underscored: true,
    },
  );

  RefreshToken.associate = models => {
    RefreshToken.belongsTo(models.User);
  };

  return RefreshToken;
};
