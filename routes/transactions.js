'use strict';

const router = require('express').Router();

const transactionsController = require('../controllers/transactions');

// @route /transactions

// GET request for all user's transactions by user ID
router.get('/:userId', async (req, res) => {
  const transactions = await transactionsController.getTransactionsByUserId(
    req.params.userId,
    req.query,
  );

  res.status(200).json({ status: 'OK', transactions });
});

// POST request for creating Transaction Cost
router.post('/costs', async (req, res) => {
  const cost = await transactionsController.createTransaction(req.body);
  res.status(201).json({ status: 'OK', cost });
});

// POST request for creating Transaction Income
router.post('/income', async (req, res) => {
  const income = await transactionsController.createTransaction(req.body);
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
