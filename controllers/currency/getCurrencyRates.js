const { CurrencyRates } = require('../../models');

// @desc   Get last currency rates from DB
async function getCurrencyRates() {
  try {
    const exchangeRates = await CurrencyRates.findAll({
      limit: 1,
      order: [['createdAt', 'DESC']],
    });

    return exchangeRates[0];
  } catch (err) {
    return null;
  }
}

module.exports = getCurrencyRates;
