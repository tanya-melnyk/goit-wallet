'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('transactions', 'updated_at', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'updated_at',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('transactions', 'updated_at');
  },
};