"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Cake", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Name is required.",
          },
          len: {
            args: [1, 50],
            msg: "Name must be between 1 and 100 characters long.",
          },
        },
      },
      short_description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Short Description is required.",
          },
          len: {
            args: [1, 100],
            msg: "Short Description must be between 1 and 100 characters long.",
          },
        },
      },
      long_description: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Long Description is required.",
          },
          len: {
            args: [1, 600],
            msg: "Long Description must be between 1 and 600 characters long.",
          },
        },
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: "Price is required.",
          },
          max: {
            args: 999999,
            msg: "Price must be greater than or equal to 999999",
          },
          min: {
            args: 1,
            msg: "Price must be less than or equal to 1",
          },
        },
      },
      image_url: {
        type: Sequelize.STRING,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable("Cake");
  },
};
