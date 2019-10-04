'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class CurrencyRates extends Sequelize.Model {}

  CurrencyRates.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      buyUsd: {
        type: DataTypes.FLOAT,
        field: 'buy_usd',
      },
      saleUsd: {
        type: DataTypes.FLOAT,
        field: 'sale_usd',
      },
      buyEur: {
        type: DataTypes.FLOAT,
        field: 'buy_eur',
      },
      saleEur: {
        type: DataTypes.FLOAT,
        field: 'sale_eur',
      },
    },
    {
      sequelize,
      timestamps: true,
      updatedAt: false,
      underscored: true,
      freezeTableName: true,
      tableName: 'currency_rates',
    },
  );

  return CurrencyRates;
};
