'use strict';

const { Users, Transactions } = require('../../models');

module.exports = {
  // @route    POST /users
  // @desc     Create a user
  createUser(payload) {
    return Users.create(payload);
  },

  // @route    GET /users/:userId
  // @desc     Get user by ID
  getUserById(id) {
    return Users.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Transactions,
          attributes: [
            'id',
            'transaction_type',
            'item_name',
            'amount',
            'currency',
          ],
        },
      ],
    });
  },

  // @route    GET /users
  // @desc     Get all users
  getAllUsers() {
    return Users.findAll();
  },

  // @route    DELETE /users/:userId
  // @desc     Delete user by ID
  deleteUserById(id) {
    return Users.destroy({
      where: {
        id,
      },
    });
  },
};
