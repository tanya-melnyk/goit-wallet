'use strict';

const { User } = require('../../models');

module.exports = {
  // @route    PATCH /change-password
  // @desc     Change current user password
  changeUserPassword(userId, newPassword) {
    return User.update(
      { password: newPassword },
      {
        where: { id: userId },
      },
    );
  },
};
