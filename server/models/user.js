"use strict";
import {
  userTableEnum,
  userTableEnumMSG,
} from "../src/enums/sequelizeTablesEnums/userTableEnum";
import { regexValidations } from "../src/enums/regexValidations";
import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
    }
  }
  User.init(
    {
      full_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: userTableEnum.FullName + userTableEnumMSG.IsRequired,
          },
          isFullName(value) {
            if (!regexValidations.FullName.test(value)) {
              throw new Error(
                userTableEnumMSG.Invalid + userTableEnum.FullName
              );
            }
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: userTableEnum.Email + userTableEnumMSG.IsRequired,
          },
          isEmail: {
            msg: userTableEnumMSG.Invalid + userTableEnumMSG.EmailFormat,
          },
        },
      },
      phone_number: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: userTableEnum.phoneNumber + userTableEnumMSG.IsRequired,
          },
          isValidPhoneNumber(value) {
            if (!regexValidations.PhoneNumber.test(value)) {
              throw new Error(
                userTableEnumMSG.Invalid + userTableEnumMSG.PhoneNumber
              );
            }
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: userTableEnum.Password + userTableEnumMSG.IsRequired,
          },
          isStrongPassword(value) {
            if (!regexValidations.UserPassword.test(value)) {
              throw new Error(
                userTableEnum.Password + userTableEnumMSG.ValidPassword
              );
            }
          },
        },
      },
      is_staff: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
