'use strict';

const { Users, Transactions } = require('../../models');

module.exports = {
  // @route    GET /transactions/:userId
  // @desc     Get all user's transactions by user ID
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
