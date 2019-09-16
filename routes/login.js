'use strict';

const router = require('express').Router();

const authController = require('../controllers/auth');

// @route /login

// POST request for user authorization
router.post('/', async (req, res) => {
  const tokens = await authController.login(req.body);

  if (!tokens) {
    res.status(404).json({ code: 'USER_NOT_FOUND', message: 'User not found' });
  }

  res.status(201).json(tokens);
});

// // POST request for creating Transaction Income
// router.post('/income', async (req, res) => {
//   const income = await operationsController.createTransaction(req.body);
//   res.status(201).json({ status: 'OK', income });
// });

// // GET request for transaction by its ID
// router.get('/:id', async (req, res) => {
//   const transaction = await operationsController.getTransactionById(
//     req.params.id,
//   );

//   if (!transaction) {
//     return res
//       .status(404)
//       .json({ code: 'NOT_FOUND', message: 'Transaction not Found' });
//   }

//   res.status(200).json({ status: 'OK', transaction });
// });

module.exports = router;
