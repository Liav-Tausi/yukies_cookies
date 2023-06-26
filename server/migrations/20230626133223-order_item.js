"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("OrderItem", {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      order_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: {
          model: "Order",
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
            msg: "OrderItem must be greater than or equal to 1",
          },
        },
      },
      price: {
        type: Sequelize.INTEGER,
        validate: {
          min: {
            args: [0],
            msg: "Price must be greater than or equal to 0",
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

    await queryInterface.addConstraint("OrderItem", {
      fields: ["order_id"],
      type: "foreign key",
      name: "fk_order_id",
      references: {
        table: "Order",
        field: "id",
      },
      onDelete: "SET NULL",
      onUpdate: "CASCADE",
    });

    await queryInterface.addConstraint("OrderItem", {
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
    await queryInterface.removeConstraint("OrderItem", "fk_order_id");
    await queryInterface.removeConstraint("OrderItem", "fk_cake_id");

    await queryInterface.dropTable("OrderItem");
  },
};
