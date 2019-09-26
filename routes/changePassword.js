'use strict';

const router = require('express').Router();

const authMiddleware = require('../middleware/authorization');
const { updateUser } = require('../controllers/user');

// @route /change-password

// GET request for changing password form
router.get('/', authMiddleware, (req, res) => {
  try {
    const user = req.user;
    // const user = await getUsers.getUserById(req.user.id);
    user.token = req.query.token;
    res.render('change-password', { user });
  } catch (err) {
    return res.status(500).send({ Error: err.name, message: err.message });
  }
});

// PATCH request for changing current user password
router.post('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const newPassword = req.body.password;

  try {
    await updateUser.changeUserPassword(userId, newPassword);

    res.status(200).send('Password has been changed');
  } catch (err) {
    return res.status(500).send({ Error: err.name, message: err.message });
  }
});

module.exports = router;
