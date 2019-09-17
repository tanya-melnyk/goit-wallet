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
};
