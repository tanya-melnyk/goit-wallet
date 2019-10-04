const router = require('express').Router();

const authMiddleware = require('../middleware/authorization');
const { getBalance } = require('../controllers/transactions');

// @route /balance

// GET request for user's balance
router.get('/', authMiddleware, async (req, res) => {
  try {
    const period = req.query.period;
    const balance = await getBalance(req.user, period);

    res
      .status(200)
      .render('balance', { balance, period, token: req.query.token });
  } catch (err) {
    res.status(500).send({ Error: err.name, message: err.message });
  }
});

module.exports = router;
