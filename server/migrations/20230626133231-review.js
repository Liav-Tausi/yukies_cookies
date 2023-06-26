"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Review", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "User",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      cake_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Cake",
          key: "id",
        },
        onUpdate: "CASCADE",
        onDelete: "SET NULL",
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [1],
            msg: "Review must be greater than or equal to 1",
          },
          max: {
            args: [5],
            msg: "Review must be less than or equal to 5",
          },
        },
      },
      comment: {
        type: Sequelize.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [1, 600],
            msg: "Long Description must be between 1 and 600 characters long.",
          },
        },
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

    await queryInterface.addConstraint("Review", {
      fields: ["user_id"],
      type: "foreign key",
      name: "fk_user_id",
      references: {
        table: "User",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("Review", {
      fields: ["cake_id"],
      type: "foreign key",
      name: "fk_cake_id",
      references: {
        table: "Cake",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Review", "fk_user_id");
    await queryInterface.removeConstraint("Review", "fk_cake_id");
    await queryInterface.dropTable("Review");
  },
};
