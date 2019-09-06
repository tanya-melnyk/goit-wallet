'use strict';

const router = require('express').Router();

const transactionsController = require('../controllers/transactions');

// @route /operations/costs

// POST request for creating Transaction Cost
router.post('/costs', async (req, res) => {
  const cost = await transactionsController.createTransaction(req.body);
  res.status(201).json({ status: 'OK', cost });
});

// @route /operations/income

// POST request for creating Transaction Income
router.post('/income', async (req, res) => {
  const income = await transactionsController.createTransaction(req.body);
  res.status(201).json({ status: 'OK', income });
});

module.exports = router;
