'use strict';

const bcrypt = require('bcryptjs');
const config = require('../../config');
const jwt = require('jsonwebtoken');

const { User } = require('../../models');

class AuthError extends Error {}

module.exports = {
  async login({ email, password }) {
    const user = await User.findOne({ where: { email } });

    if (!user) return;

    if (!bcrypt.compareSync(password, user.password)) {
      throw new AuthError('Unauthorized');
    }

    // expires in 5 min
    const accessToken = jwt.sign(
      { ...user.render(), exp: Math.floor(Date.now() / 1000) + 5 * 60 },
      process.env.JWT_SECRET,
    );

    // expires in 1 hour
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '1h',
    });

    return {
      accessToken,
      refreshToken,
    };
  },

  AuthError,
};
