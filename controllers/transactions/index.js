'use strict';

const { User, Transaction } = require('../../models');

module.exports = {
  // @route    GET /transactions/
  // @desc     Get all transactions of current user
  getUserTransactions(user, { offset = 0, limit = 10 }) {
    return Transaction.findAll({
      where: {
        user_id: user.id,
      },
      offset,
      limit,
      include: [
        {
          model: User,
          attributes: ['first_name', 'last_name'],
        },
      ],
    });
  },

  // @route    POST /transactions/cost
  // @desc     Create a cost transaction for current user
  createCostTransaction(payload, userId) {
    return Transaction.create({
      ...payload,
      userId,
      transactionType: 'cost',
    });
  },

  // @route    POST /transactions/income
  // @desc     Create an income transaction for current user
  createIncomeTransaction(payload, userId) {
    return Transaction.create({
      ...payload,
      userId,
      transactionType: 'income',
    });
  },

  // @route    GET /transactions/cost/:id or /transactions/income/:id
  // @desc     Get transaction by ID
  getTransactionById(id) {
    return Transaction.findOne({
      where: {
        id,
      },
      include: [{ model: User, attributes: ['id', 'first_name', 'last_name'] }],
    });
  },
};
