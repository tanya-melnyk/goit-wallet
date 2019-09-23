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
    return res.status(500).send({ Error: err.name, message: err.message });
  }
});

module.exports = router;
