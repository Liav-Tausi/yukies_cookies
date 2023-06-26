"use strict";
import { configValues } from "../src/enums/sequelizeTablesEnums/configValues";
import { cartItemsTableEnumMSG } from "../src/enums/sequelizeTablesEnums/cartItemsTableEnum";
import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class CartItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CartItem.belongsTo(models.Cart, { foreignKey: "cart" });
      CartItem.belongsTo(models.Cake, { foreignKey: "cake" });
    }
  }
  CartItem.init(
    {
      cart_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cake_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: [configValues.MinCakeItemsQuantity],
            msg: cartItemsTableEnumMSG.Min + configValues.MinCakeItemsQuantity,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "CartItem",
    }
  );
  return CartItem;
};
