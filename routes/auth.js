'use strict';

const router = require('express').Router();
const config = require('../config');
const passport = require('../services/passport');

const { generateTokens } = require('../controllers/auth');
const { getUsers } = require('../controllers/user');

// @route /auth

// GET request for user authorization with Facebook

router.get('/facebook', passport.authenticate('facebook'));

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    failureRedirect: '/',
  }),
  async (req, res) => {
    try {
      const user = await getUsers.getFacebookUser(req.user);
      const tokens = await generateTokens(user);

      // res.json(tokens);
      res.redirect('/api/v1/me?token=' + tokens.accessToken);
    } catch (err) {
      return res.status(500).send({ Error: err.name, message: err.message });
    }
  },
);

// GET request for user authorization with Google

router.get(
  '/google',
  passport.authenticate('google', { scope: config.google.scopes }),
);

router.get(
  '/google/callback',
  passport.authenticate('google', {
    failureRedirect: '/',
  }),
  async (req, res) => {
    try {
      const user = await getUsers.getGoogleUser(req.user);
      const tokens = await generateTokens(user);

      // res.json(tokens);
      res.redirect('/api/v1/me?token=' + tokens.accessToken);
    } catch (err) {
      return res.status(500).send({ Error: err.name, message: err.message });
    }
  },
);

// GET request for user authorization with LinkedIn

router.get(
  '/linkedin',
  passport.authenticate('linkedin', {
    scope: config.linkedIn.scopes,
  }),
);

router.get(
  '/linkedin/callback',
  passport.authenticate('linkedin', {
    failureRedirect: '/',
  }),
  async (req, res) => {
    try {
      const user = await getUsers.getLinkedInUser(req.user);
      const tokens = await generateTokens(user);

      // res.json(tokens);
      res.redirect('/api/v1/me?token=' + tokens.accessToken);
    } catch (err) {
      return res.status(500).send({ Error: err.name, message: err.message });
    }
  },
);

module.exports = router;
