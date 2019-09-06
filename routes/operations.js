'use strict';

const router = require('express').Router();

const operationsController = require('../controllers/operations');

// @route /operations

// POST request for creating Transaction Cost
router.post('/costs', async (req, res) => {
  const cost = await operationsController.createTransaction(req.body);
  res.status(201).json({ status: 'OK', cost });
});

// POST request for creating Transaction Income
router.post('/income', async (req, res) => {
  const income = await operationsController.createTransaction(req.body);
  res.status(201).json({ status: 'OK', income });
});

// GET request for transaction by its ID
router.get('/:id', async (req, res) => {
  const transaction = await operationsController.getTransactionById(
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
