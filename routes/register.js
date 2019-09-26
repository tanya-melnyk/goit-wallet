'use strict';

const router = require('express').Router();

// @route /register

// GET request for user registration
router.get('/', async (req, res) => {
  try {
    res.render('register');
  } catch (err) {
    return res.status(500).send({ Error: err.name, message: err.message });
  }
});

module.exports = router;
