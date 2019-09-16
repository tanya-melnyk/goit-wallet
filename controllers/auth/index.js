'use strict';

const bcrypt = require('bcryptjs');
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

    // expires in 15 min
    const accessToken = jwt.sign(
      { ...user.render(), exp: Math.floor(Date.now() / 1000) + 15 * 60 },
      process.env.JWT_SECRET,
    );

    // expires in a week
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7 days',
    });

    return {
      accessToken,
      refreshToken,
    };
  },

  validateToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  },

  async exchangeRefreshToken(oldRefreshToken) {
    const decoded = jwt.verify(oldRefreshToken, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { id: decoded.id } });

    // expires in 15 min
    const accessToken = jwt.sign(
      { ...user.render(), exp: Math.floor(Date.now() / 1000) + 15 * 60 },
      process.env.JWT_SECRET,
    );

    // expires in a week
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7 days',
    });

    return {
      accessToken,
      refreshToken,
    };
  },

  AuthError,
};
