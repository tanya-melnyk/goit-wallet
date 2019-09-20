'use strict';

const router = require('express').Router();

const authRouter = require('./auth');
const changePasswordRouter = require('./changePassword');
const loginRouter = require('./login');
const transactionsRouter = require('./transactions');
const updateTokenRouter = require('./updateToken');
const userProfileRouter = require('./userProfile');
const usersRouter = require('./users');

router
  .use('/auth', authRouter)
  .use('/change-password', changePasswordRouter)
  .use('/login', loginRouter)
  .use('/me', userProfileRouter)
  .use('/refresh', updateTokenRouter)
  .use('/transactions', transactionsRouter)
  .use('/users', usersRouter);

module.exports = router;
