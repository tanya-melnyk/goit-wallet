'use strict';

require('dotenv').config();
require('./core/express-promise');

const express = require('express');
const expressDomain = require('express-domain');
const logger = require('morgan');

const config = require('./config');
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const passport = require('./auth');
const routes = require('./routes');
const validationErrorHandler = require('./middleware/validation-error-handler');

const app = express();

const PORT = config.PORT;

// Use asynchronous error handler for Express
app.use(expressDomain());

// Use logger
app.use(logger('dev'));

// Configuration
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: false, limit: '2mb' }));

// Use passport
app.use(passport.initialize());
app.use(passport.session());

// Routes
// main route return static
app.get('/', express.static('public'));
app.use('/api/v1', routes);
app.use('/*', notFound);

// Error handlers
app.use(validationErrorHandler);
app.use(errorHandler);

// Start server
const server = app.listen(PORT, () => {
  console.log(`➡️  Wallet app listening on port ${PORT} 🤟`);
});

app.set('server', server);

// write connection to DB
// https://remotemysql.com/login.php can be used for free MySQL db
// www.elephantsql.com/‎

/*
* Username: VAULOT615Y

Database name: VAULOT615Y

Password: 2q7QRqpjM1

Server: remotemysql.com

Port: 3306
* 
* */

// wallet-goit.eu.auth0.com
