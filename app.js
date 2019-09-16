'use strict';

require('dotenv').config();
require('./core/express-promise');

const express = require('express');
const expressDomain = require('express-domain');
const logger = require('morgan');

const config = require('./config');
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const routes = require('./routes');
const validationErrorHandler = require('./middleware/validation-error-handler');

const app = express();

const PORT = config.PORT;

app.use(expressDomain());

// use logger
app.use(logger('dev'));

// Routes
// main route return static
app.get('/', express.static('public'));

app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: false, limit: '2mb' }));

app.use('/api/v1', routes);
app.use('/*', notFound);
app.use(validationErrorHandler);
app.use(errorHandler);

// add error handlers

const server = app.listen(PORT, () => {
  console.log(`➡️  Wallet app listening on port ${PORT} 🤟`);
});

app.set('server', server);

//Run app, then load http://localhost:PORT in a browser to see the output.

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
