'use strict';

const { User, Transaction } = require('../../models');

module.exports = {
  // @route    GET /transactions/:userId
  // @desc     Get all user's transactions by user ID
  getTransactionsByUserId(userId, { offset = 0, limit = 10 }) {
    return Transaction.findAll({
      where: {
        userId,
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
  // @desc     Create a transaction
  createTransaction(payload) {
    return Transaction.create(payload);
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
