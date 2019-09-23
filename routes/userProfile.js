'use strict';

const router = require('express').Router();

const authMiddleware = require('../middleware/authorization');
const { getUsers } = require('../controllers/user');

// @route /me

// GET request for authorized user's profile
router.get('/', authMiddleware, async (req, res) => {
  try {
    const user = await getUsers.getUserById(req.user.id);

    res.status(200).json({ status: 'OK', user: user.render() });
  } catch (err) {
    return res.status(500).send({ Error: err.name, message: err.message });
  }
});

module.exports = router;
