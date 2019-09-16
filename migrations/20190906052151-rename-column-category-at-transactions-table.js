'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('transactions', 'categoty', 'category');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn('transactions', 'category', 'categoty');
  },
};
