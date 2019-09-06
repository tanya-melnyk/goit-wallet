'use strict';

const { Users, Transactions } = require('../../models');

module.exports = {
  // @route    POST /operations/cost or /operations/income
  // @desc     Create a transaction
  createTransaction(payload) {
    return Transactions.create(payload);
  },

  // @route    GET /operations/:id
  // @desc     Get transaction by ID
  getTransactionById(id) {
    return Transactions.findOne({
      where: {
        id,
      },
      include: [
        { model: Users, attributes: ['id', 'first_name', 'last_name'] },
      ],
    });
  },
};
