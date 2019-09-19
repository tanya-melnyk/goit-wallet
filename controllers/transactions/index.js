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

  // @route    POST /transactions/cost or /transactions/income
  // @desc     Create a cost or an income transaction for current user
  async createTransaction(payload, user, transactionType) {
    if (!payload.currency) {
      payload.currency = user.defaultCurrency ? user.defaultCurrency : 'UAH';
    }

    return Transaction.create({
      ...payload,
      userId: user.id,
      transactionType,
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
