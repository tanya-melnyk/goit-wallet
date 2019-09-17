'use strict';

const router = require('express').Router();

const authMiddleware = require('../middleware/authorization');
const transactionsController = require('../controllers/transactions');

// @route /transactions

// GET request for all transactions of current user
router.get('/', authMiddleware, async (req, res) => {
  const transactions = await transactionsController.getUserTransactions(
    req.user,
    req.query,
  );

  res.status(200).json({ status: 'OK', transactions });
});

// POST request for creating Transaction Cost
router.post('/costs', authMiddleware, async (req, res) => {
  const cost = await transactionsController.createTransaction(
    req.body,
    req.user.id,
  );
  res.status(201).json({ status: 'OK', cost });
});

// POST request for creating Transaction Income
router.post('/income', authMiddleware, async (req, res) => {
  const income = await transactionsController.createTransaction(
    req.body,
    req.user.id,
  );
  res.status(201).json({ status: 'OK', income });
});

// GET request for cost transaction by its ID
router.get('/costs/:id', async (req, res) => {
  const transaction = await transactionsController.getTransactionById(
    req.params.id,
  );

  if (!transaction) {
    return res
      .status(404)
      .json({ code: 'NOT_FOUND', message: 'Transaction not Found' });
  }

  res.status(200).json({ status: 'OK', transaction });
});

// GET request for income transaction by its ID
router.get('/income/:id', async (req, res) => {
  const transaction = await transactionsController.getTransactionById(
    req.params.id,
  );

  if (!transaction) {
    return res
      .status(404)
      .json({ code: 'NOT_FOUND', message: 'Transaction not Found' });
  }

  res.status(200).json({ status: 'OK', transaction });
});

module.exports = router;
