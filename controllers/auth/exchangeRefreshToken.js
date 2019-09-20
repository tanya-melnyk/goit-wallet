'use strict';

const jwt = require('jsonwebtoken');

const config = require('../../config');
const generateTokens = require('./generateTokens');
const { User, RefreshToken } = require('../../models');

async function exchangeRefreshToken(oldRefreshToken) {
  const token = await RefreshToken.findOne({
    where: { token: oldRefreshToken },
  });

  if (!token) {
    throw new jwt.JsonWebTokenError('Invalid refresh token');
  }

  await token.destroy();

  const decoded = jwt.verify(oldRefreshToken, config.jwtSecret);
  const user = await User.findOne({ where: { id: decoded.id } });

  return generateTokens(user);
}

module.exports = exchangeRefreshToken;
