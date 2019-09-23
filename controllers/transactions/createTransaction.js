'use strict';

const request = require('request-promise');

const { Transaction } = require('../../models');
const { updateUser } = require('../user');

// @route    POST /transactions/cost or /transactions/income
// @desc     Create a cost or an income transaction for current user
async function createTransaction(transaction, user) {
  if (!transaction.currency) {
    transaction.currency = user.defaultCurrency ? user.defaultCurrency : 'UAH';
  }

  const date = transaction.createdAt || new Date();

  try {
    const currencyRates = await getCurrencyRatesBy(date);

    await updateUser.updateBalance(transaction, user.id);

    return Transaction.create({
      ...transaction,
      userId: user.id,
      currencyRates,
    });
  } catch (err) {
    throw new Error(err);
  }
}

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

  try {
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
  } catch (err) {
    throw new Error(err);
  }
}

module.exports = createTransaction;