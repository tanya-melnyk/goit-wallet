'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('transactions', 'currency_rates', {
      type: Sequelize.JSON,
      allowNull: false,
      field: 'currency_rates',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('transactions', 'currency_rates');
  },
};
