'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const config = require('../../config');
const { User, RefreshToken } = require('../../models');

module.exports = {
  async login({ email, password }) {
    const user = await User.findOne({ where: { email } });

    if (!user) return;

    if (!user.password || !bcrypt.compareSync(password, user.password)) {
      throw new jwt.JsonWebTokenError('Unauthorized');
    }

    console.log(this);

    return this.generateTokens(user);
  },

  validateToken(token) {
    return jwt.verify(token, config.jwtSecret);
  },

  async exchangeRefreshToken(oldRefreshToken) {
    const token = await RefreshToken.findOne({
      where: { token: oldRefreshToken },
    });

    if (!token) {
      throw new jwt.JsonWebTokenError('Invalid refresh token');
    }

    await token.destroy();

    const decoded = jwt.verify(oldRefreshToken, config.jwtSecret);

    const user = await User.findOne({ where: { id: decoded.id } });

    // В этом методе this не видит объекта и выдает undefined,
    // не могу понять почему...
    // console.log(this); // undefined
    // return this.generateTokens(user); // "Cannot read property '_generateTokens' of undefined"

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

  async generateTokens(user) {
    // expires in 15 min
    const accessToken = jwt.sign(
      { ...user.render(), exp: Math.floor(Date.now() / 1000) + 15 * 60 },
      config.jwtSecret,
    );

    // expires in a week
    const refreshToken = jwt.sign({ id: user.id }, config.jwtSecret, {
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
};
