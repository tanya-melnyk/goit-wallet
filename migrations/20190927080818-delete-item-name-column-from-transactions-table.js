'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('transactions', 'item_name');
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('transactions', 'item_name', {
      type: Sequelize.STRING(50),
      allowNull: false,
      field: 'item_name',
    });
  },
};
