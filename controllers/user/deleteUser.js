'use strict';

const { User } = require('../../models');

// @route    DELETE /users/:userId
// @desc     Delete user by ID
function deleteUserById(id) {
  return User.destroy({
    where: {
      id,
    },
  });
}

module.exports = deleteUserById;
