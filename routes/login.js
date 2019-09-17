'use strict';

const router = require('express').Router();

const authController = require('../controllers/auth');

// @route /login

// POST request for user authorization
router.post('/', async (req, res) => {
  const tokens = await authController.login(req.body);

  if (!tokens) {
    res.status(404).json({ code: 'USER_NOT_FOUND', message: 'User not found' });
  }

  res.status(201).json(tokens);
});

module.exports = router;
