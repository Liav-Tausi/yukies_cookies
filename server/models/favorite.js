"use strict";
import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class Favorite extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Favorite.belongsTo(models.User, { foreignKey: "user" });
    }
  }
  Favorite.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cake_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
    },
    {
      sequelize,
      modelName: "Favorite",
    }
  );
  return Favorite;
};
