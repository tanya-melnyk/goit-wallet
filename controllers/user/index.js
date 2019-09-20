'use strict';

const createUser = require('./createUser');
const deleteUserById = require('./deleteUser');
const getUsers = require('./getUsers');
const updateUser = require('./updateUser');

module.exports = {
  createUser,
  deleteUserById,
  getUsers,
  updateUser,
};
