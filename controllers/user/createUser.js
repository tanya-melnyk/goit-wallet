'use strict';

const generateTokens = require('../auth/generateTokens');
const { User } = require('../../models');

// @route    POST /users
// @desc     Create a user

// const createUser = payload => User.create(payload);
const createUser = async payload => {
  try {
    const user = await User.create(payload);

    const tokens = await generateTokens(user);
    user.token = tokens.accessToken;

    return user;
  } catch (error) {
    throw new Error(error);
  }
};

module.exports = createUser;
