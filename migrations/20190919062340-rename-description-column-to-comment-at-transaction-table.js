'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'transactions',
      'description',
      'comment',
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.renameColumn(
      'transactions',
      'comment',
      'description',
    );
  },
};
