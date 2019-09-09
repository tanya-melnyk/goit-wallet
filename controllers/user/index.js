'use strict';

const { User, Transaction } = require('../../models');

module.exports = {
  // @route    POST /users
  // @desc     Create a user
  createUser(payload) {
    return User.create(payload);
  },

  // @route    GET /users/:userId
  // @desc     Get user by ID
  getUserById(id) {
    return User.findOne({
      where: {
        id,
      },
      include: [
        {
          model: Transaction,
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
    return User.findAll();
  },

  // @route    DELETE /users/:userId
  // @desc     Delete user by ID
  deleteUserById(id) {
    return User.destroy({
      where: {
        id,
      },
    });
  },
};
