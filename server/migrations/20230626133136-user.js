"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("User", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      full_name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Full Name is required.",
          },
          isFullName(value) {
            if (!/^[a-zA-Z]+(?:\s[a-zA-Z]+)+$/.test(value)) {
              throw new Error("Invalid full name!");
            }
          },
        },
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Email is required.",
          },
          isEmail: {
            msg: "Invalid email format!",
          },
        },
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Phone number is required",
          },
          isValidPhoneNumber(value) {
            if (
              !/^(?:\+972|0)(?:-|\s)?(?:\d{1})?(?:-|\s)?(?:\d{3})?(?:-|\s)?(?:\d{3})?(?:-|\s)?(?:\d{2})?(?:-|\s)?(?:\d{2})?$/.test(
                value
              )
            ) {
              throw new Error("Invalid phone number!");
            }
          },
        },
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Password is required",
          },
          isStrongPassword(value) {
            if (!/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/i.test(value)) {
              throw new Error(
                "Password must be at least 8 characters long and contain at least one letter and one digit."
              );
            }
          },
        },
      },
      is_staff: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("User");
  },
};
