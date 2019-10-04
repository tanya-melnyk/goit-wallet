'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'usd_balance', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'usd_balance',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'usd_balance');
  },
};
