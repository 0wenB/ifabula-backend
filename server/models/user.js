"use strict";
const { Model } = require("sequelize");
const { hashPassword } = require("../helpers/bcrypt");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Book, {
        foreignKey: "userId",
      });
    }
  }
  User.init(
    {
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          notNull: {
            msg: "Email tidak boleh kosong",
          },
          notEmpty: {
            msg: "Email tidak boleh kosong",
          },
          isEmail: {
            msg: "Email harus berupa format email yang valid",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password tidak boleh kosong",
          },
          notEmpty: {
            msg: "Password tidak boleh kosong",
          },
          isAlphanumeric: {
            msg: "Password harus terdiri dari 8 Karakter Alphanumeric dan harus mengandung setidaknya 1 huruf kapital, tidak boleh mengandung special karakter",
          },
          len: {
            args: [8, 100],
            msg: "Password harus terdiri dari minimal 8 karakter",
          },
          isStrongPassword(value) {
            if (!/(?=.*[A-Z])/.test(value) || /[^a-zA-Z0-9]/.test(value)) {
              throw new Error(
                "Password harus terdiri dari 8 Karakter Alphanumeric dan harus mengandung setidaknya 1 huruf kapital, tidak boleh mengandung special karakter"
              );
            }
          },
        },
      },
      role: DataTypes.STRING,
      status: {
        type: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  User.beforeCreate((instance, options) => {
    instance.password = hashPassword(instance.password);
  });
  return User;
};
