'use strict';

const router = require('express').Router();

const authRouter = require('./auth');
const balanceRouter = require('./balance');
const changeDefaultCurrency = require('./changeDefaultCurrency');
const changePasswordRouter = require('./changePassword');
const loginRouter = require('./login');
const registerRouter = require('./register');
const transactionsRouter = require('./transactions');
const updateTokenRouter = require('./updateToken');
const userProfileRouter = require('./userProfile');
const usersRouter = require('./users');

router
  .use('/auth', authRouter)
  .use('/balance', balanceRouter)
  .use('/change-default-currency', changeDefaultCurrency)
  .use('/change-password', changePasswordRouter)
  .use('/login', loginRouter)
  .use('/me', userProfileRouter)
  .use('/refresh', updateTokenRouter)
  .use('/register', registerRouter)
  .use('/transactions', transactionsRouter)
  .use('/users', usersRouter);

module.exports = router;
