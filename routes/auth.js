'use strict';

const router = require('express').Router();
const config = require('../config');
const passport = require('../auth');

const authController = require('../controllers/auth');
const userController = require('../controllers/user');

// @route /auth

// request for user authorization

router.get(
  '/linkedin',
  passport.authenticate('linkedin', {
    scope: config.linkedIn.scopes,
  }),
);

router.get(
  '/linkedin/callback',
  passport.authenticate('linkedin', {
    // successRedirect: '/api/v1/me',
    failureRedirect: '/api/v1/login',
  }),
  async (req, res) => {
    const user = await userController.getLinkedInUser(req.user);
    const tokens = await authController.generateTokens(user);

    res.json(tokens);
  },
);

// @route /*

// request for user authorization

// router.use('/', async (req, res, next) => {
//   const token = await req.headers['authorization'];

//   if (!token) {
//     return res
//       .status(401)
//       .json({ code: 'Unauthorized', message: 'Unauthorized' });
//   }

//   req.user = authController.validateToken(token);

//   next();
// });

module.exports = router;
