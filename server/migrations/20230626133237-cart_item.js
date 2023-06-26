"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("CartItem", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      cart_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Cart",
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
      quantity: {
        type: Sequelize.INTEGER,
        validate: {
          min: {
            args: [1],
            msg: "quantity must be greater than or equal to 1",
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

    await queryInterface.addConstraint("Cart", {
      fields: ["id"],
      type: "foreign key",
      name: "fk_cart_id",
      references: {
        table: "Cart",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("Cake", {
      fields: ["id"],
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
    await queryInterface.removeConstraint("CartItem", "fk_cart_id");
    await queryInterface.removeConstraint("CartItem", "fk_cake_id");

    await queryInterface.dropTable("CartItem");
  },
};
