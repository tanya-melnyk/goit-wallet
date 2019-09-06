'use strict';

const { Users, Transactions } = require('../../models');

module.exports = {
  // @route    POST /operations/cost or /operations/income
  // @desc     Create a transaction
  createTransaction(payload) {
    return Transactions.create(payload);
  },

  // @route    GET /transactions/:userId
  // @desc     Get user's transactions by user ID
  getTransactionsByUserId(userId) {
    return Transactions.findAll({
      where: {
        userId,
      },
      include: [
        { model: Users, attributes: ['id', 'first_name', 'last_name'] },
      ],
    });
  },
};
