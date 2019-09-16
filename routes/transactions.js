'use strict';

const router = require('express').Router();

const transactionsController = require('../controllers/transactions');

// @route /transactions

// GET request for all user's transactions by user ID
router.get('/:userId', async (req, res) => {
  const transactions = await transactionsController.getTransactionsByUserId(
    req.params.userId,
  );

  res.status(200).json({ status: 'OK', transactions });
});

module.exports = router;
