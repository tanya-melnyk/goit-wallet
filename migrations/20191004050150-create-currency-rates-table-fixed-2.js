'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('currency_rates', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      createdAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: 'created_at',
      },
      updatedAt: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
        field: 'updated_at',
      },
      buyUsd: {
        type: Sequelize.FLOAT,
        field: 'buy_usd',
      },
      saleUsd: {
        type: Sequelize.FLOAT,
        field: 'sale_usd',
      },
      buyEur: {
        type: Sequelize.FLOAT,
        field: 'buy_eur',
      },
      saleEur: {
        type: Sequelize.FLOAT,
        field: 'sale_eur',
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('currency_rates');
  },
};
