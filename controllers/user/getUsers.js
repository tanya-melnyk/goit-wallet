'use strict';

const { User, Transaction } = require('../../models');

module.exports = {
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
            'category',
            'amount',
            'currency',
            'created_at',
          ],
        },
      ],
    });
  },

  // @route    GET /facebook/callback
  // @desc     Get user by email from Facebook profile
  async getFacebookUser(facebookUser) {
    console.log(facebookUser);

    const [givenName, familyName] = facebookUser.displayName.split(' ');

    try {
      const user = await User.findOne({
        where: {
          facebookId: facebookUser.id,
        },
      });

      if (!user) {
        user = await User.create({
          firstName: givenName,
          lastName: familyName,
          facebookId: facebookUser.id,
        });
      }

      return user;
    } catch (err) {
      throw new Error(err);
    }
  },

  // @route    GET /google/callback
  // @desc     Get user by email from Google profile
  async getGoogleUser(googleUser) {
    try {
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
    } catch (err) {
      throw new Error(err);
    }
  },

  // @route    GET /linkedin/callback
  // @desc     Get user by email from Linkedin profile
  async getLinkedInUser(linkedinUser) {
    try {
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
    } catch (err) {
      throw new Error(err);
    }
  },

  // @route    GET /users
  // @desc     Get all users
  getAllUsers({ offset = 0, limit = 100 }) {
    return User.findAll({ offset, limit });
  },
};
