'use strict';

const Sequelize = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Transaction extends Sequelize.Model {
    render() {
      return {
        id: this.id,
        userId: this.userId,
        transactionType: this.transactionType,
        itemName: this.itemName,
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
      itemName: {
        type: DataTypes.STRING(50),
        allowNull: false,
        field: 'item_name',
      },
      comment: {
        type: DataTypes.STRING,
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
        // defaultValue: 'UAH',
        allowNull: false,
        validate: {
          isIn: [['UAH', 'USD', 'EUR']],
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

  Transaction.associate = models => {
    Transaction.belongsTo(models.User);
  };

  return Transaction;
};
