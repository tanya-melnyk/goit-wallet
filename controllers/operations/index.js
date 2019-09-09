'use strict';

const { User, Transaction } = require('../../models');

module.exports = {
  // @route    POST /operations/cost or /operations/income
  // @desc     Create a transaction
  createTransaction(payload) {
    return Transaction.create(payload);
  },

  // @route    GET /operations/:id
  // @desc     Get transaction by ID
  getTransactionById(id) {
    return Transaction.findOne({
      where: {
        id,
      },
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name'] },
      ],
    });
  },
};
