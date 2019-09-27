'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'current_balance', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'current_balance',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'current_balance');
  },
};
