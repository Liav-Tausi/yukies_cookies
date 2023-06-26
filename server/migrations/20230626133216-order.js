"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Order", {
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
      total_amount: {
        type: Sequelize.INTEGER,
        validate: {
          min: {
            args: [1],
            msg: "Order must be greater than or equal to 1",
          },
        },
      },
      order_time: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
          isAfter: {
            args: new Date().toISOString(),
            msg: "Order time must be later than the current time.",
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

    await queryInterface.addConstraint("Order", {
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
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("Order", "fk_user_id");

    await queryInterface.dropTable("Order");
  },
};
