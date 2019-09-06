'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('transactions', 'transaction_type', {
      type: Sequelize.STRING(50),
      allowNull: false,
      field: 'transaction_type',
      validate: {
        is: /cost|income/i,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('transactions', 'transaction_type');
  },
};
