const cron = require('node-cron');
const { saveCurrencyRates } = require('../controllers/currency');

// https://api.privatbank.ua/p24api/pubinfo?json&exchange&coursid=5
cron.schedule('0 1,10 * * *', () => {
  console.log('Cron saves current currency rates to BD');
  saveCurrencyRates();
});
