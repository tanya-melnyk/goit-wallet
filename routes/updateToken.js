'use strict';

const router = require('express').Router();

const { exchangeRefreshToken } = require('../controllers/auth');

// @route /refresh

// POST request for updating refresh token
router.post('/', async (req, res) => {
  const tokens = await exchangeRefreshToken(req.headers['authorization']);

  res.status(200).json({ status: 'OK', tokens });
});

module.exports = router;
