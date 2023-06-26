"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("Favorite", {
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
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });

    await queryInterface.addConstraint("Favorite", {
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

    await queryInterface.addConstraint("Favorite", {
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
    await queryInterface.removeConstraint("Favorite", "fk_user_id");
    await queryInterface.removeConstraint("Favorite", "fk_cake_id");

    await queryInterface.dropTable("Favorite");
  },
};
