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
        transactions: this.Transactions,
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
          len: [2, 50],
        },
      },
      lastName: {
        type: DataTypes.STRING(50),
        field: 'last_name',
        allowNull: false,
        validate: {
          len: [2, 50],
        },
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      linkedinId: {
        type: DataTypes.STRING(20),
        field: 'linkedin_id',
      },
      password: {
        type: DataTypes.STRING(100),
        allowNull: true,
        set(val) {
          this.setDataValue('password', bcrypt.hashSync(val, 10));
        },
        validate: {
          shouldHavePassword(value) {
            if (!value && !this.linkedinId) {
              throw new Error('Password is required for local users');
            }
          },
        },
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
