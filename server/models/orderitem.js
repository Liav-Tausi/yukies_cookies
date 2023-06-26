"use strict";
import {
  orderItemTableEnum,
  orderItemTableEnumMSG,
} from "../src/enums/sequelizeTablesEnums/orderItemTableEnum";
import { configValues } from "../src/enums/sequelizeTablesEnums/configValues";
import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class OrderItem extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      OrderItem.belongsTo(models.Order, { foreignKey: "order" });
      OrderItem.belongsTo(models.Cake, { foreignKey: "cake" });
    }
  }
  OrderItem.init(
    {
      order_id: {
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
            args: [configValues.MinInt],
            msg:
              orderItemTableEnum.OrderItem +
              orderItemTableEnumMSG.Min +
              configValues.MinInt,
          },
        },
      },
      price: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: [configValues.Zero],
            msg:
              orderItemTableEnum.Price +
              orderItemTableEnumMSG.Min +
              configValues.Zero,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "OrderItem",
    }
  );
  return OrderItem;
};
