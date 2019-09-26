'use strict';

require('dotenv').config();
require('./core/express-promise');

const cors = require('cors');
const express = require('express');
const expressDomain = require('express-domain');
var expressLayouts = require('express-ejs-layouts');
const logger = require('morgan');

const config = require('./config');
const errorHandler = require('./middleware/error-handler');
const notFound = require('./middleware/not-found');
const passport = require('./services/passport');
const routes = require('./routes');
const validationErrorHandler = require('./middleware/validation-error-handler');

const app = express();

const PORT = config.PORT;

// Templates
app.set('view engine', 'ejs');
app.use(expressLayouts);

// Asynchronous error handler for Express
app.use(expressDomain());

// Configuration
app.disable('x-powered-by');
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
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/dashboard', (req, res) => {
  res.render('dashboard', {
    user: req.user,
  });
});

app.get('/profile', (req, res) => {
  const { User } = require('./models');
  User.findAll({})
    .then(result => {
      res.status(200).render('user', { users: result });
    })
    .catch(err => {
      throw new Error(err);
    });
});

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
