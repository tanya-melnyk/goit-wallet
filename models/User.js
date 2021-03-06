'use strict';

const Sequelize = require('sequelize');
const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  class User extends Sequelize.Model {
    render() {
      return {
        id: this.id,
        firstName: this.firstName,
        lastName: this.lastName,
        createdAt: this.createdAt,
        updatedAt: this.updatedAt,
        email: this.email,
        defaultCurrency: this.defaultCurrency,
        transactions: this.Transactions,
        currentBalance: this.currentBalance + ' ' + this.defaultCurrency,
      };
    }
  }

  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      firstName: {
        type: DataTypes.STRING(50),
        field: 'first_name',
        allowNull: false,
        validate: {
          len: {
            args: [2, 50],
            msg: 'First name must be 2 or more characters long',
          },
        },
      },
      lastName: {
        type: DataTypes.STRING(50),
        field: 'last_name',
        allowNull: false,
        validate: {
          len: {
            args: [2, 50],
            msg: 'Last name must be 2 or more characters long',
          },
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: true,
        unique: true,
        validate: {
          shouldHaveEmail(value) {
            if (
              !value &&
              !this.linkedinId &&
              !this.googleId &&
              !this.facebookId
            ) {
              throw new Error('Email is required');
            }
          },

          isEmail: {
            args: true,
            msg: 'Email is invalid',
          },
        },
      },
      facebookId: {
        type: DataTypes.STRING(20),
        field: 'facebook_id',
        allowNull: true,
      },
      linkedinId: {
        type: DataTypes.STRING(20),
        field: 'linkedin_id',
        allowNull: true,
      },
      googleId: {
        type: DataTypes.STRING(50),
        field: 'google_id',
        allowNull: true,
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
        validate: {
          shouldHavePassword(value) {
            if (
              !value &&
              !this.linkedinId &&
              !this.googleId &&
              !this.facebookId
            ) {
              throw new Error('Password is required');
            }
          },

          len: {
            args: [6, 100],
            msg: 'Password must be 6 or more characters long',
          },

          is: {
            args: /(?=.*[0-9])(?=.*[A-Z])/g,
            msg:
              'Password must contain only latin alphabet, at least 1 number and 1 capital letter',
          },
        },
        set(val) {
          const myregexp = /(?=.*[0-9])(?=.*[A-Z])/g;

          if (val && val.length >= 6 && myregexp.test(val)) {
            this.setDataValue('password', bcrypt.hashSync(val, 10));
          } else {
            this.setDataValue('password', val);
          }
        },
      },
      defaultCurrency: {
        type: DataTypes.STRING(10),
        allowNull: true,
        defaultValue: 'UAH',
        field: 'default_currency',
        validate: {
          isIn: {
            args: [['UAH', 'USD', 'EUR']],
            msg: 'Default currency should be UAH, USD or EUR',
          },
        },
      },
      uahBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'uah_balance',
        defaultValue: 0,
      },
      usdBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'usd_balance',
        defaultValue: 0,
      },
      eurBalance: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'eur_balance',
        defaultValue: 0,
      },
    },
    {
      sequelize,
      timestamps: true,
      underscored: true,
      freezeTableName: true,
      tableName: 'users',
    },
  );

  User.associate = models => {
    User.hasMany(models.Transaction);
    User.hasMany(models.RefreshToken);
  };

  return User;
};
