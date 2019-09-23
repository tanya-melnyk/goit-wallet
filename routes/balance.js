const router = require('express').Router();

const authMiddleware = require('../middleware/authorization');
const { getBalance } = require('../controllers/transactions');

// @route /balance

// GET request for user's balance
router.get('/', authMiddleware, async (req, res) => {
  try {
    const balance = await getBalance(req.user, req.query.period);

    res.status(200).json({ status: 'OK', balance });
  } catch (err) {
    res.status(500).send({ Error: err.name, message: err.message });
  }
});

module.exports = router;
