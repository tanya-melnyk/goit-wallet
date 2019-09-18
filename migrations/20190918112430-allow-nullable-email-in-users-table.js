'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING(100),
      allowNull: true,
      unique: true,
    });
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.changeColumn('users', 'email', {
      type: Sequelize.STRING(100),
      allowNull: false,
      unique: true,
    });
  },
};
