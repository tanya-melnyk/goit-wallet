'use strict';

const router = require('express').Router();

const authMiddleware = require('../middleware/authorization');
const usersController = require('../controllers/user');

// @route /change-password

// PATCH request for changing current user password
router.patch('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const newPassword = req.body.password;

  await usersController.changeUserPassword(userId, newPassword);

  res.sendStatus(200);
});

module.exports = router;
