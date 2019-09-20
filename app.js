'use strict';

require('dotenv').config();
require('./core/express-promise');

const cors = require('cors');
const express = require('express');
const expressDomain = require('express-domain');
const logger = require('morgan');

const config = require('./config');
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const passport = require('./services/passport');
const routes = require('./routes');
const validationErrorHandler = require('./middleware/validation-error-handler');

const app = express();

const PORT = config.PORT;

// Asynchronous error handler for Express
app.use(expressDomain());

// Configuration
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ extended: false, limit: '2mb' }));

// Cors
app.use(cors('*'));

// Logger
app.use(logger('dev'));

// Passport
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
