"use strict";
import {
  orderTableEnum,
  orderTableEnumMSG,
} from "../src/enums/sequelizeTablesEnums/orderTableEnum";
import { configValues } from "../src/enums/sequelizeTablesEnums/configValues";
import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Order.belongsTo(models.User, { foreignKey: "user" });
    }
  }
  Order.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      total_amount: {
        type: DataTypes.INTEGER,
        validate: {
          min: {
            args: [configValues.MinTotalOrder],
            msg:
              orderTableEnum.Order +
              orderTableEnumMSG.Min +
              configValues.MinTotalOrder,
          },
        },
      },
      order_time: {
        type: DataTypes.DATE,
        allowNull: false,
        validate: {
          isAfter: {
            args: new Date().toISOString(),
            msg: orderTableEnum.Order + orderTableEnumMSG.timeMustBe,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Order",
    }
  );
  return Order;
};
