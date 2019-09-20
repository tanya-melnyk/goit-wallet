'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const generateTokens = require('./generateTokens');
const { User } = require('../../models');

// @route    POST /login
// @desc     Login a user by his credentials
async function login({ email, password }) {
  const user = await User.findOne({ where: { email } });

  if (!user) return;

  if (!user.password || !bcrypt.compareSync(password, user.password)) {
    throw new jwt.JsonWebTokenError('Unauthorized');
  }

  return generateTokens(user);
}

module.exports = login;
