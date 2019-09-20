'use strict';

const router = require('express').Router();

const { login } = require('../controllers/auth');

// @route /login

// POST request for user authorization
router.post('/', async (req, res) => {
  try {
    const tokens = await login(req.body);

    if (!tokens) {
      res
        .status(404)
        .json({ code: 'USER_NOT_FOUND', message: 'User not found' });
    }

    res.status(201).json(tokens);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server error');
  }
});

module.exports = router;
