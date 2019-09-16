'use strict';

const express = require('express');

const operationsRouter = require('./operations');
const transactionsRouter = require('./transactions');
const usersRouter = require('./users');

const app = express();

app.use('/operations', operationsRouter);
app.use('/transactions', transactionsRouter);
app.use('/users', usersRouter);

module.exports = app;
