'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class RefreshToken extends Sequelize.Model {
    // render() {
    //   return {
    //     id: this.id,
    //     userId: this.userId,
    //     token: this.token,
    //   };
    // }
  }

  RefreshToken.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        // allowNull: false,
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
      // freezeTableName: true,
      // tableName: 'refresh_tokens',
    },
  );

  RefreshToken.associate = models => {
    RefreshToken.belongsTo(models.User);
  };

  return RefreshToken;
};
