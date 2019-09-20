'use strict';

const router = require('express').Router();

const authMiddleware = require('../middleware/authorization');
const {
  createTransaction,
  getTransactions,
} = require('../controllers/transactions');

// @route /transactions

// GET request for all transactions of current user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const transactions = await getTransactions.getUserTransactions(
      req.user,
      req.query,
    );

    res.status(200).json({ status: 'OK', transactions });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server error');
  }
});

// POST request for creating Cost Transaction
router.post('/costs', authMiddleware, async (req, res) => {
  try {
    const cost = await createTransaction(req.body, req.user, 'cost');

    res.status(201).json({ status: 'OK', cost });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server error');
  }
});

// POST request for creating Income Transaction
router.post('/income', authMiddleware, async (req, res) => {
  try {
    const income = await createTransaction(req.body, req.user, 'income');

    res.status(201).json({ status: 'OK', income });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server error');
  }
});

// GET request for cost transaction by its ID
router.get('/costs/:id', async (req, res) => {
  try {
    const transaction = await getTransactions.getTransactionById(req.params.id);

    if (!transaction) {
      return res
        .status(404)
        .json({ code: 'NOT_FOUND', message: 'Transaction not Found' });
    }

    res.status(200).json({ status: 'OK', transaction });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server error');
  }
});

// GET request for income transaction by its ID
router.get('/income/:id', async (req, res) => {
  try {
    const transaction = await getTransactions.getTransactionById(req.params.id);

    if (!transaction) {
      return res
        .status(404)
        .json({ code: 'NOT_FOUND', message: 'Transaction not Found' });
    }

    res.status(200).json({ status: 'OK', transaction });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server error');
  }
});

module.exports = router;
