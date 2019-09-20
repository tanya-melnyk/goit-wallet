'use strict';

const router = require('express').Router();

const authMiddleware = require('../middleware/authorization');
const { updateUser } = require('../controllers/user');

// @route /change-password

// PATCH request for changing current user password
router.patch('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const newPassword = req.body.password;

  try {
    await updateUser.changeUserPassword(userId, newPassword);

    res.sendStatus(200);
  } catch (err) {
    console.error(err.message);

    res.status(500).send('Server error');
  }
});

module.exports = router;
