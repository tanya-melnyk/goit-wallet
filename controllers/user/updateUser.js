'use strict';

const { User } = require('../../models');

module.exports = {
  // @route    PATCH /change-password
  // @desc     Change user password
  changeUserPassword(userId, newPassword) {
    return User.update(
      { password: newPassword },
      {
        where: { id: userId },
      },
    );
  },

  // @route    PATCH /change-default-currency
  // @desc     Change user default currency
  changeDefaultCurrency(userId, newDefaultCurrency) {
    return User.update(
      { defaultCurrency: newDefaultCurrency },
      {
        where: { id: userId },
      },
    );
  },

  async updateBalance(transaction, userId) {
    const user = await User.findOne({ where: { id: userId } });

    const balance = {
      UAH: 'uahBalance',
      USD: 'usdBalance',
      EUR: 'eurBalance',
    };

    const updatedBalanceFieldName = balance[transaction.currency];
    let updatedBalance = user[updatedBalanceFieldName];
    const amount = Number(transaction.amount);

    if (transaction.transactionType === 'cost') {
      updatedBalance -= amount;
    } else if (transaction.transactionType === 'income') {
      updatedBalance += amount;
    } else {
      throw new Error('Incorrect transaction type');
    }

    return User.update(
      { [updatedBalanceFieldName]: updatedBalance },
      { where: { id: user.id } },
    );
  },
};
