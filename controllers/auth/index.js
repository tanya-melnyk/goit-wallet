'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const { User, RefreshToken } = require('../../models');

class AuthError extends Error {}

module.exports = {
  async login({ email, password }) {
    const user = await User.findOne({ where: { email } });

    if (!user) return;

    if (!bcrypt.compareSync(password, user.password)) {
      throw new AuthError('Unauthorized');
    }

    // console.log(this);

    return this._generateTokens(user);
  },

  validateToken(token) {
    return jwt.verify(token, process.env.JWT_SECRET);
  },

  async exchangeRefreshToken(oldRefreshToken) {
    console.log(this);
    const token = await RefreshToken.findOne({
      where: { token: oldRefreshToken },
    });

    if (!token) {
      throw new jwt.JsonWebTokenError('Invalid refresh token');
    }

    await token.destroy();

    const decoded = jwt.verify(oldRefreshToken, process.env.JWT_SECRET);

    const user = await User.findOne({ where: { id: decoded.id } });

    // return this._generateTokens(user);

    // expires in 15 min
    const accessToken = jwt.sign(
      { ...user.render(), exp: Math.floor(Date.now() / 1000) + 15 * 60 },
      process.env.JWT_SECRET,
    );

    // expires in a week
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7 days',
    });

    await RefreshToken.create({
      token: refreshToken,
      userId: user.id,
    });

    return {
      accessToken,
      refreshToken,
    };
  },

  async _generateTokens(user) {
    // expires in 15 min
    const accessToken = jwt.sign(
      { ...user.render(), exp: Math.floor(Date.now() / 1000) + 15 * 60 },
      process.env.JWT_SECRET,
    );

    // expires in a week
    const refreshToken = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '7 days',
    });

    await RefreshToken.create({
      token: refreshToken,
      userId: user.id,
    });

    return {
      accessToken,
      refreshToken,
    };
  },

  AuthError,
};
