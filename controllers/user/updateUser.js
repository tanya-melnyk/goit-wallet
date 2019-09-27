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

  async updateBalance(transaction, userId) {
    const user = await User.findOne({ where: { id: userId } });
    let currentBalance = user.currentBalance;
    const amount = Number(transaction.amount);

    if (transaction.transactionType === 'cost') {
      currentBalance -= amount;
    } else if (transaction.transactionType === 'income') {
      currentBalance += amount;
    } else {
      throw new Error('Incorrect transaction type');
    }

    return User.update({ currentBalance }, { where: { id: user.id } });
  },
};
