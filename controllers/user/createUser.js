'use strict';

const { User } = require('../../models');

// @route    POST /users
// @desc     Create a user

const createUser = payload => User.create(payload);

module.exports = createUser;
