'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('users', 'current_balance', 'uah_balance');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('users', 'uah_balance', 'current_balance');
  },
};
