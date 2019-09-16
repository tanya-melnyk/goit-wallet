'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('transactions', 'amount', {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('transactions', 'amount');
  },
};
