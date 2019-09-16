'use strict';

const express = require('express');

const loginRouter = require('./login');
const operationsRouter = require('./operations');
const transactionsRouter = require('./transactions');
const usersRouter = require('./users');

const app = express();

app.use('/login', loginRouter);
app.use('/operations', operationsRouter);
app.use('/transactions', transactionsRouter);
app.use('/users', usersRouter);

module.exports = app;
