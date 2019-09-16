'use strict';

const express = require('express');

const authorizeUser = require('./auth');
const loginRouter = require('./login');
const userProfileRouter = require('./userProfile');
const operationsRouter = require('./operations');
const transactionsRouter = require('./transactions');
const usersRouter = require('./users');

const app = express();

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use(authorizeUser);
app.use('/me', userProfileRouter);
app.use('/operations', operationsRouter);
app.use('/transactions', transactionsRouter);

module.exports = app;
