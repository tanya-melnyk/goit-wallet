'use strict';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { User, Transaction } = require('../../models');

module.exports = {
  // @route    GET /transactions/
  // @desc     Get all transactions of current user
  getUserTransactions(userId, { offset = 0, limit = 10, period }) {
    offset = Number(offset);
    limit = Number(limit);

    if (!period) {
      return Transaction.findAll({ where: { userId }, offset, limit });
    }

    const date = new Date();
    const curDate = date.getDate();
    const curWeekday = date.getDay() + 1;
    const curHour = date.getHours();

    switch (period) {
      case 'one-week':
        return getUserTransactionsForPeriod({
          daysCount: 7,
          hoursCount: 0,
        });
      case 'two-weeks':
        return getUserTransactionsForPeriod({
          daysCount: 14,
          hoursCount: 0,
        });
      case 'one-month':
        return getUserTransactionsForPeriod({
          daysCount: 30,
          hoursCount: 0,
        });
      case 'cur-week':
        return getUserTransactionsForPeriod({
          daysCount: curWeekday,
          hoursCount: 24 - curHour,
        });
      case 'cur-month':
        return getUserTransactionsForPeriod({
          daysCount: curDate,
          hoursCount: 24 - curHour,
        });
      default:
        throw new Error('Incorrect period');
    }

    function getUserTransactionsForPeriod({ daysCount, hoursCount }) {
      return Transaction.findAll({
        where: {
          userId,
          createdAt: {
            [Op.lt]: new Date(),
            [Op.gte]: new Date(
              new Date() -
                daysCount * 24 * 60 * 60 * 1000 +
                hoursCount * 60 * 60 * 1000,
            ),
          },
        },
        offset,
        limit,
      });
    }
  },

  // @route    GET /transactions/cost/:id or /transactions/income/:id
  // @desc     Get transaction by ID
  getTransactionById(userId, transactionId, transactionType) {
    return Transaction.findOne({
      where: {
        userId,
        id: transactionId,
        transactionType,
      },
      include: [{ model: User, attributes: ['id', 'first_name', 'last_name'] }],
    });
  },
};
