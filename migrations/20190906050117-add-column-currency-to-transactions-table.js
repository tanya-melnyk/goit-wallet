'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('transactions', 'currency', {
      type: Sequelize.STRING(50),
      defaultValue: 'UAH',
      allowNull: false,
      validate: {
        isIn: [['UAH', 'USD', 'EURO']],
      },
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('transactions', 'currency');
  },
};
