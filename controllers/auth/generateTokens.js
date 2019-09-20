'use strict';

const jwt = require('jsonwebtoken');

const config = require('../../config');
const { RefreshToken } = require('../../models');

async function generateTokens(user) {
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

  return { accessToken, refreshToken };
}

module.exports = generateTokens;
