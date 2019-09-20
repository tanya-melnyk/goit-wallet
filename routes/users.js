'use strict';

const router = require('express').Router();

const { createUser, deleteUserById, getUsers } = require('../controllers/user');

// @route /users

// POST request for creating User
router.post('/', async (req, res) => {
  const user = await createUser(req.body);
  res.status(201).json({ status: 'OK', user: user.render() });
});

// GET request for User by ID
router.get('/:userId', async (req, res) => {
  const user = await getUsers.getUserById(req.params.userId);

  if (!user) {
    return res
      .status(404)
      .json({ code: 'NOT_FOUND', message: 'User not Found' });
  }

  res.status(200).json({ status: 'OK', user: user.render() });
});

// GET request for all Users
router.get('/', async (req, res) => {
  const users = (await getUsers.getAllUsers(req.query)).map(user =>
    user.render(),
  );
  res.status(200).json(users);
});

// DELETE request for deleting User by ID
router.delete('/:userId', async (req, res) => {
  const user = await getUsers.getUserById(req.params.userId);

  if (!user) {
    return res
      .status(404)
      .json({ code: 'NOT_FOUND', message: 'User not Found' });
  }

  await deleteUserById(req.params.userId);
  res.status(200).json(`User ${user.firstName} ${user.lastName} was deleted`);
});

module.exports = router;
