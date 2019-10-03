'use strict';

const router = require('express').Router();

const authMiddleware = require('../middleware/authorization');
const { getUsers } = require('../controllers/user');
const {
  createTransaction,
  getTransactions,
} = require('../controllers/transactions');

// @route /transactions

// GET request for all transactions of current user
router.get('/', authMiddleware, async (req, res) => {
  try {
    const transactions = await getTransactions.getUserTransactions(
      req.user.id,
      req.query,
    );

    res
      .status(200)
      .render('transaction-list', { transactions, token: req.query.token });
    // res.status(200).json({ status: 'OK', transactions });
  } catch (err) {
    return res.status(500).send({ Error: err.name, message: err.message });
  }
});

// GET request for creating Cost Transaction
router.get('/costs', authMiddleware, async (req, res) => {
  try {
    const token = req.query.token;
    const user = await getUsers.getUserById(req.user.id);
    const defaultCurrency = user.defaultCurrency;

    res.status(200).render('add-cost', { token, defaultCurrency });
  } catch (err) {
    return res.status(500).send({ Error: err.name, message: err.message });
  }
});

// GET request for creating Income Transaction
router.get('/income', authMiddleware, async (req, res) => {
  try {
    const token = req.query.token;
    const user = await getUsers.getUserById(req.user.id);
    const defaultCurrency = user.defaultCurrency;

    res.status(200).render('add-income', { token, defaultCurrency });
  } catch (err) {
    return res.status(500).send({ Error: err.name, message: err.message });
  }
});

// POST request for saving Cost Transaction to DB
router.post('/costs', authMiddleware, async (req, res) => {
  try {
    await createTransaction({ ...req.body, transactionType: 'cost' }, req.user);
    // const user = await getUsers.getUserById(req.user.id);
    // const balance = user.currentBalance;

    res.redirect(`/api/v1/transactions?token=${req.query.token}`);
  } catch (err) {
    const errors = err.message.split(',\n');

    return res.status(500).render('error', {
      errors,
      goBackUrl: req.originalUrl,
    });
  }
});

// POST request for saving Income Transaction to DB
router.post('/income', authMiddleware, async (req, res) => {
  try {
    await createTransaction(
      { ...req.body, transactionType: 'income' },
      req.user,
    );
    // const user = await getUsers.getUserById(req.user.id);
    // const balance = user.currentBalance;

    res.redirect(`/api/v1/transactions?token=${req.query.token}`);
  } catch (err) {
    const errors = err.message.split(',\n');

    return res.status(500).render('error', {
      errors,
      goBackUrl: req.originalUrl,
    });
    // return res.status(500).send({ Error: err.name, message: err.message });
  }
});

// GET request for cost transaction of current user by transaction ID
router.get('/costs/:id', authMiddleware, async (req, res) => {
  try {
    const transaction = await getTransactions.getTransactionById(
      req.user.id,
      req.params.id,
      'cost',
    );

    if (!transaction) {
      return res
        .status(404)
        .json({ code: 'NOT_FOUND', message: 'Transaction not Found' });
    }

    res.status(200).json({ status: 'OK', transaction });
  } catch (err) {
    return res.status(500).send({ Error: err.name, message: err.message });
  }
});

// GET request for income transaction of current user by transaction ID
router.get('/income/:id', authMiddleware, async (req, res) => {
  try {
    const transaction = await getTransactions.getTransactionById(
      req.user.id,
      req.params.id,
      'income',
    );

    if (!transaction) {
      return res
        .status(404)
        .json({ code: 'NOT_FOUND', message: 'Transaction not Found' });
    }

    res.status(200).json({ status: 'OK', transaction });
  } catch (err) {
    return res.status(500).send({ Error: err.name, message: err.message });
  }
});

module.exports = router;
