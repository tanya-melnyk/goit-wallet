'use strict';

const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

  // @route    GET /transactions/week(/two-weeks/month)
  // @desc     Get all transactions of current user for the last 7/14/30 days
  getUserTransactionsForPeriod() {
    const days = 7; // 14 or 30
    return Transaction.findAll({
      where: {
        createdAt: {
          [Op.lt]: new Date(),
          [Op.gt]: new Date(new Date() - days * 24 * 60 * 60 * 1000),
        },
      },
      // include: [{ model: User, attributes: ['id', 'first_name', 'last_name'] }],
    });
  },

  // @route    GET /transactions/cur-week
  // @desc     Get all transactions of current user for the current week
  getUserTransactionsForCurWeek() {
    const date = new Date();
    const curWeekday = date.getDay() + 1;
    const curHour = date.getHours();

    return Transaction.findAll({
      where: {
        createdAt: {
          [Op.lt]: new Date(),
          [Op.gte]: new Date(
            new Date() -
              curWeekday * 24 * 60 * 60 * 1000 +
              (24 - curHour) * 60 * 60 * 1000,
          ),
        },
      },
      // include: [{ model: User, attributes: ['id', 'first_name', 'last_name'] }],
    });
  },

  // @route    GET /transactions/cur-month
  // @desc     Get all transactions of current user for the current month
  getUserTransactionsForCurMonth() {
    const date = new Date();
    const curDay = date.getDate();
    const curHour = date.getHours();

    return Transaction.findAll({
      where: {
        createdAt: {
          [Op.lt]: new Date(),
          [Op.gte]: new Date(
            new Date() -
              curDay * 24 * 60 * 60 * 1000 +
              (24 - curHour) * 60 * 60 * 1000,
          ),
        },
      },
      // include: [{ model: User, attributes: ['id', 'first_name', 'last_name'] }],
    });
  },
};
