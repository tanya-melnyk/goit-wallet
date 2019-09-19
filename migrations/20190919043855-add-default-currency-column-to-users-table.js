'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('users', 'default_currency', {
      type: Sequelize.STRING(10),
      allowNull: true,
      field: 'default_currency',
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.removeColumn('users', 'default_currency');
  },
};
