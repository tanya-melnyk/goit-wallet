'use strict';

const router = require('express').Router();

const { login } = require('../controllers/auth');

// @route /login

// GET request for user authorization
router.get('/', async (req, res) => {
  try {
    res.render('login');
  } catch (err) {
    return res.status(500).send({ Error: err.name, message: err.message });
  }
});

// POST request for user authorization
router.post('/', async (req, res) => {
  try {
    const tokens = await login(req.body);

    if (!tokens) {
      res
        .status(404)
        .json({ code: 'USER_NOT_FOUND', message: 'User not found' });
    }

    // res.status(201).json(tokens);
    res.redirect('/api/v1/me?token=' + tokens.accessToken);
  } catch (err) {
    return res.status(500).send({ Error: err.name, message: err.message });
  }
});

module.exports = router;
