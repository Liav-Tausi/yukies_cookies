"use strict";
import {
  reviewTableEnum,
  reviewTableEnumMSG,
} from "../src/enums/sequelizeTablesEnums/reviewTableEnum";
import { configValues } from "../src/enums/sequelizeTablesEnums/configValues";
import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.User, { foreignKey: "user_id" });
      Review.belongsTo(models.Cake, { foreignKey: "cake_id" });
    }
  }
  Review.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      cake_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      rating: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: {
            args: [configValues.MinReviewRating],
            msg:
              reviewTableEnum.Review +
              reviewTableEnumMSG.Min +
              configValues.MinReviewRating,
          },
          max: {
            args: [configValues.MaxReviewRating],
            msg:
              reviewTableEnum.Review +
              reviewTableEnumMSG.Max +
              configValues.MaxReviewRating,
          },
        },
      },
      comment: {
        type: DataTypes.STRING,
        allowNull: true,
        validate: {
          len: {
            args: [
              configValues.MinLenString,
              configValues.MaxLenLongDescription,
            ],
            msg:
              reviewTableEnum.LongDescription +
              reviewTableEnumMSG.MustBeBetWeen1_600,
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Reviews",
    }
  );
  return Review;
};
