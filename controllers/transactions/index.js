'use strict';

const request = require('request-promise');

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
  getTransactionById(id) {
    return Transaction.findOne({
      where: {
        id,
      },
      include: [{ model: User, attributes: ['id', 'first_name', 'last_name'] }],
    });
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
