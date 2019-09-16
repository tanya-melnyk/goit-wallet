'use strict';

const { User, Transaction } = require('../../models');

module.exports = {
  // @route    GET /transactions/:userId
  // @desc     Get all user's transactions by user ID
  getTransactionsByUserId(userId) {
    return Transaction.findAll({
      where: {
        userId,
      },
      include: [
        { model: User, attributes: ['id', 'first_name', 'last_name'] },
      ],
    });
  },
};
