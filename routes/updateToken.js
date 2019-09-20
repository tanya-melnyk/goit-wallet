'use strict';

const router = require('express').Router();

const { exchangeRefreshToken } = require('../controllers/auth');

// @route /refresh

// POST request for updating refresh token
router.post('/', async (req, res) => {
  try {
    const tokens = await exchangeRefreshToken(req.headers['authorization']);

    res.status(201).json({ status: 'OK', tokens });
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server error');
  }
});

module.exports = router;
