'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'eur_balance', {
      type: Sequelize.INTEGER,
      allowNull: false,
      defaultValue: 0,
      field: 'eur_balance',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'eur_balance');
  },
};
