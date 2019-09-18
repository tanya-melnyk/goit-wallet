'use strict';

const express = require('express');

const authRouter = require('./auth');
const changePasswordRouter = require('./changePassword');
const loginRouter = require('./login');
const transactionsRouter = require('./transactions');
const updateTokenRouter = require('./updateToken');
const userProfileRouter = require('./userProfile');
const usersRouter = require('./users');

const app = express();

app.use('/auth', authRouter);
app.use('/change-password', changePasswordRouter);
app.use('/login', loginRouter);
app.use('/me', userProfileRouter);
app.use('/refresh', updateTokenRouter);
app.use('/transactions', transactionsRouter);
app.use('/users', usersRouter);

module.exports = app;
