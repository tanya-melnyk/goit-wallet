const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const { Transaction, User } = require('../../models');

// @route    GET /balance
// @desc     Get user balance
async function getUserBalance(user, period) {
  if (!period) {
    try {
      const curUser = await User.findOne({ where: { id: user.id } });

      return curUser.currentBalance + ' ' + (curUser.defaultCurrency || 'UAH');
    } catch (error) {
      throw new Error("Server error: couldn't get the balance");
    }
  }

  const date = new Date();
  const curDate = date.getDate();
  const curWeekday = date.getDay() + 1;
  const curHour = date.getHours();

  switch (period) {
    case 'cur-week':
      return getUserBalanceForPeriod({
        daysCount: curWeekday,
        hoursCount: 24 - curHour,
      });
    case 'cur-month':
      return getUserBalanceForPeriod({
        daysCount: curDate,
        hoursCount: 24 - curHour,
      });
    default:
      throw new Error('Incorrect period');
  }

  async function getUserBalanceForPeriod({ daysCount, hoursCount }) {
    const transactions = await Transaction.findAll({
      where: {
        userId: user.id,
        createdAt: {
          [Op.lt]: new Date(),
          [Op.gte]: new Date(
            new Date() -
              daysCount * 24 * 60 * 60 * 1000 +
              hoursCount * 60 * 60 * 1000,
          ),
        },
      },
    });

    return (
      transactions.reduce(
        (balance, transaction) =>
          transaction.transactionType === 'cost'
            ? balance - transaction.amount
            : balance + transaction.amount,
        0,
      ) +
      ' ' +
      (user.defaultCurrency || 'UAH')
    );
  }
}

module.exports = getUserBalance;
