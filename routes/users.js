'use strict';

const router = require('express').Router();

const { createUser, deleteUserById, getUsers } = require('../controllers/user');

// @route /users

// POST request for creating User
router.post('/', async (req, res) => {
  try {
    const user = await createUser(req.body);

    res.status(201).render('dashboard', { user });
    // res.status(201).json({ status: 'OK', user: user.render() });
  } catch (err) {
    const errors = err.message.split(',\n');

    return res.status(500).render('error', {
      errors,
      goBackUrl: '/api/v1/register',
    });
    // return res.status(500).send({ Error: err.name, message: err.message });
  }
});

// GET request for User by ID
router.get('/:userId', async (req, res) => {
  try {
    const user = await getUsers.getUserById(req.params.userId);

    if (!user) {
      return res
        .status(404)
        .json({ code: 'NOT_FOUND', message: 'User not Found' });
    }

    res.status(200).json({ status: 'OK', user: user.render() });
  } catch (err) {
    return res.status(500).send({ Error: err.name, message: err.message });
  }
});

// GET request for all Users
router.get('/', async (req, res) => {
  try {
    let users = await getUsers.getAllUsers(req.query);

    users = users.map(user => user.render());

    res.status(200).json(users);
  } catch (err) {
    return res.status(500).send({ Error: err.name, message: err.message });
  }
});

// DELETE request for deleting User by ID
router.delete('/:userId', async (req, res) => {
  try {
    const wasDeleted = await deleteUserById(req.params.userId);

    if (!wasDeleted) {
      return res
        .status(404)
        .json({ code: 'NOT_FOUND', message: 'User not Found' });
    }

    res.status(200).json(`User was deleted`);
  } catch (err) {
    return res.status(500).send({ Error: err.name, message: err.message });
  }
});

module.exports = router;
