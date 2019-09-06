'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('transactions', 'created_at', {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW,
      field: 'created_at',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('transactions', 'created_at');
  },
};
