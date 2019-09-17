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

  // @route    GET /linkedin/callback
  // @desc     Get user by email from Linkedin profile
  async getLinkedInUser(linkedinUser) {
    const user = await User.findOne({
      where: {
        email: linkedinUser.emails[0].value,
      },
    });

    if (!user) {
      user = await User.create({
        firstName: linkedinUser.name.givenName,
        lastName: linkedinUser.name.familyName,
        email: linkedinUser.emails[0].value,
        linkedinId: linkedinUser.id,
      });
    }

    return user;
  },

  // @route    GET /google/callback
  // @desc     Get user by email from Google profile
  async getGoogleUser(googleUser) {
    const user = await User.findOne({
      where: {
        email: googleUser.emails[0].value,
      },
    });

    if (!user) {
      user = await User.create({
        firstName: googleUser.name.givenName,
        lastName: googleUser.name.familyName,
        email: googleUser.emails[0].value,
        googleId: googleUser.id,
      });
    }

    return user;
  },

  // @route    GET /users
  // @desc     Get all users
  getAllUsers({ offset = 0, limit = 10 }) {
    return User.findAll({ offset, limit });
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
