const request = require('request-promise');
const { CurrencyRates } = require('../../models');

async function saveCurrencyRates() {
  try {
    const currencyRates = await getCurrencyRates();

    if (!currencyRates) return;

    CurrencyRates.create(currencyRates);
  } catch (error) {
    console.log(error.message);
  }
}

async function getCurrencyRates() {
  const uri =
    'https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5';

  const options = { json: true, uri };

  try {
    const exchangeRates = await request(options);

    const usdData = exchangeRates.find(obj => obj.ccy === 'USD');
    const eurData = exchangeRates.find(obj => obj.ccy === 'EUR');

    return {
      buyUsd: Number(usdData.buy).toFixed(2),
      saleUsd: Number(usdData.sale).toFixed(2),
      buyEur: Number(eurData.buy).toFixed(2),
      saleEur: Number(eurData.sale).toFixed(2),
    };
  } catch (err) {
    return null;
  }
}

module.exports = saveCurrencyRates;
