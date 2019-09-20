'use strict';

const request = require('request-promise');
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

  // @route    POST /transactions/cost or /transactions/income
  // @desc     Create a cost or an income transaction for current user
  async createTransaction(payload, user, transactionType) {
    if (!payload.currency) {
      payload.currency = user.defaultCurrency ? user.defaultCurrency : 'UAH';
    }

    const date = payload.createdAt || new Date();
    const currencyRates = await getCurrencyRatesBy(date);

    return Transaction.create({
      ...payload,
      userId: user.id,
      transactionType,
      currencyRates,
    });
  },

  // @route    GET /transactions/cost/:id or /transactions/income/:id
  // @desc     Get transaction by ID
  async getTransactionById(id) {
    return Transaction.findOne({
      where: {
        id,
      },
      include: [{ model: User, attributes: ['id', 'first_name', 'last_name'] }],
    });
  },

  // @route    GET /transactions/week(/two-weeks/month)
  // @desc     Get all transactions of current user for the last 7/14/30 days
  async getUserTransactionsForPeriod() {
    const days = 7; // 14 or 30
    const trans = await Transaction.findAll({
      where: {
        createdAt: {
          [Op.lt]: new Date(),
          [Op.gt]: new Date(new Date() - days * 24 * 60 * 60 * 1000),
        },
      },
      // include: [{ model: User, attributes: ['id', 'first_name', 'last_name'] }],
    });

    return trans;
  },

  // @route    GET /transactions/cur-week
  // @desc     Get all transactions of current user for the current week
  async getUserTransactionsForCurWeek() {
    const date = new Date();
    const curWeekday = date.getDay() + 1;
    const curHour = date.getHours();

    const trans = await Transaction.findAll({
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

    return trans;
  },

  // @route    GET /transactions/cur-month
  // @desc     Get all transactions of current user for the current month
  async getUserTransactionsForCurMonth() {
    const date = new Date();
    const curDay = date.getDate();
    const curHour = date.getHours();
    const trans = await Transaction.findAll({
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

    return trans;
  },
};

// Это точно работает, если пользователь не ввел дату сам,
// но если ввел, то в каком формате нам это придет?
// Как обрабатывать дату введенную пользователем?
// Или мы тоже получим ее в виде объекта Date?
async function getCurrencyRatesBy(date) {
  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  const dateStr = day + '.' + month + '.' + year;

  const options = {
    uri: `https://api.privatbank.ua/p24api/exchange_rates?json&date=${dateStr}`,
    json: true,
  };

  const pbApiData = await request(options);
  const exchangeRates = pbApiData.exchangeRate;

  const usdData = exchangeRates.find(obj => obj.currency === 'USD');
  const eurData = exchangeRates.find(obj => obj.currency === 'EUR');

  const usdToUahRate = Number(usdData.saleRateNB.toFixed(4));
  const uahToUsdRate = Number((1 / usdToUahRate).toFixed(4));

  const eurToUahRate = Number(eurData.saleRateNB.toFixed(4));
  const uahToEurRate = Number((1 / eurToUahRate).toFixed(4));

  const usdToEurRate = Number((usdToUahRate / eurToUahRate).toFixed(4));
  const eurToUsdRate = Number((1 / usdToEurRate).toFixed(4));

  return {
    'UAH/USD': uahToUsdRate,
    'USD/UAH': usdToUahRate,
    'USD/EUR': usdToEurRate,
    'EUR/USD': eurToUsdRate,
    'UAH/EUR': uahToEurRate,
    'EUR/UAH': eurToUahRate,
  };
}
