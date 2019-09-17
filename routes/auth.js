'use strict';

const router = require('express').Router();
const config = require('../config');
const passport = require('../auth');

const authController = require('../controllers/auth');
const userController = require('../controllers/user');

// @route /auth

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
    failureRedirect: '/api/v1/login',
  }),
  async (req, res) => {
    const user = await userController.getLinkedInUser(req.user);
    const tokens = await authController.generateTokens(user);

    res.json(tokens);
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
    failureRedirect: '/api/v1/login',
  }),
  async (req, res) => {
    const user = await userController.getGoogleUser(req.user);
    const tokens = await authController.generateTokens(user);

    res.json(tokens);
  },
);

module.exports = router;
