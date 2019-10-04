'use strict';

const router = require('express').Router();

const authMiddleware = require('../middleware/authorization');
const { getUsers } = require('../controllers/user');
const { getCurrencyRates } = require('../controllers/currency');
// const { getCurrentCurrencyRates } = require('../controllers/transactions');

// @route /me

// GET request for authorized user's profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await getUsers.getUserById(req.user.id);
    user.token = req.query.token;

    const currencyRates = await getCurrencyRates();

    // const currencyRates = await getCurrentCurrencyRates();
    // res.status(200).json({ status: 'OK', user: user.render() });
    res.status(200).render('user', { users: [user], currencyRates });
  } catch (err) {
    return res.status(500).send({ Error: err.name, message: err.message });
  }
});

module.exports = router;
