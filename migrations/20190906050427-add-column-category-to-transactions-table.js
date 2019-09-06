'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('transactions', 'categoty', {
      type: Sequelize.STRING(50),
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('transactions', 'categoty');
  },
};
