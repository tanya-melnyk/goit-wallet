'use strict';

const router = require('express').Router();

const authMiddleware = require('../middleware/authorization');
const { updateUser } = require('../controllers/user');

// @route /change-default-currency

// GET request for changing user's default currency form
router.get('/', authMiddleware, (req, res) => {
  try {
    const user = req.user;
    user.token = req.query.token;

    res.render('change-default-currency', { user });
  } catch (err) {
    return res.status(500).send({ Error: err.name, message: err.message });
  }
});

// PATCH request for saving new user's default currency
router.post('/', authMiddleware, async (req, res) => {
  const userId = req.user.id;
  const newDefaultCurrency = req.body.defaultCurrency;
  const token = req.query.token;

  try {
    await updateUser.changeDefaultCurrency(userId, newDefaultCurrency);

    res.redirect('/api/v1/me?token=' + token);
  } catch (err) {
    return res.status(500).send({ Error: err.name, message: err.message });
  }
});

module.exports = router;
