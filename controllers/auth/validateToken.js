const jwt = require('jsonwebtoken');

const config = require('../../config');

function validateToken(token) {
  return jwt.verify(token, config.jwtSecret);
}

module.exports = validateToken;
