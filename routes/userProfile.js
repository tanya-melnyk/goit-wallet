'use strict';

const router = require('express').Router();

const userController = require('../controllers/user');

// @route /me

// GET request for authorized user's profile
router.get('/', async (req, res) => {
  const user = await userController.getUserById(req.user.id);

  res.status(200).json({ status: 'OK', user: user.render() });
});

module.exports = router;
