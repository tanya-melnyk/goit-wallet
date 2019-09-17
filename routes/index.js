'use strict';

const express = require('express');

const authorizeUser = require('./auth');
const loginRouter = require('./login');
const userProfileRouter = require('./userProfile');
const transactionsRouter = require('./transactions');
const updateTokenRouter = require('./updateToken');
const usersRouter = require('./users');

const app = express();

app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use(authorizeUser);
app.use('/refresh', updateTokenRouter);
app.use('/me', userProfileRouter);
app.use('/transactions', transactionsRouter);

module.exports = app;
