'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Sequelize.Model {
    render() {
      return {
        id: this.id,
        userId: this.userId,
        transactionType: this.transactionType,
        description: this.description,
        amount: this.amount + this.currency,
        category: this.category,
      };
    }
  }

  Transaction.init(
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
      comment: {
        type: DataTypes.STRING,
      },
      amount: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: 1,
            msg: 'Transaction amount should be more than 0',
          },
        },
      },
      currency: {
        type: DataTypes.STRING(50),
        // defaultValue: 'UAH',
        allowNull: false,
        validate: {
          isIn: [['UAH', 'USD', 'EUR']],
        },
      },
      category: {
        type: DataTypes.STRING(50),
        validate: {
          isIn: [
            [
              'Food',
              'Transport',
              'Health',
              'House',
              'Leasure',
              'Education',
              'Other',
              'Salary',
              'Present',
            ],
          ],
        },
      },
      currencyRates: {
        type: DataTypes.JSON,
        allowNull: false,
        field: 'currency_rates',
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: 'transactions',
    },
  );

  Transaction.associate = models => {
    Transaction.belongsTo(models.User);
  };

  return Transaction;
};
