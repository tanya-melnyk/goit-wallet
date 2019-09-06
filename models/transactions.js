'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transactions extends Sequelize.Model {}

  Transactions.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id',
        },
        field: 'user_id',
        onUpdate: 'cascade',
        onDelete: 'cascade',
      },
      transactionType: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'transaction_type',
        validate: {
          isIn: [['cost', 'income']],
        },
      },
      itemName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'item_name',
      },
      description: {
        type: DataTypes.STRING(100),
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
        },
      },
      currency: {
        type: DataTypes.STRING(50),
        defaultValue: 'UAH',
        allowNull: false,
        validate: {
          isIn: [['UAH', 'USD', 'EURO']],
        },
      },
      category: DataTypes.STRING(50),
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: 'transactions',
    },
  );

  Transactions.associate = models => {
    Transactions.belongsTo(models.Users);
  };

  return Transactions;
};
