"use strict";
import {
  cakeTableEnum,
  cakeTableEnumMSG,
} from "../src/enums/sequelizeTablesEnums/cakeTableEnum";
import { configValues } from "../src/enums/sequelizeTablesEnums/configValues";
import { Model } from "sequelize";

module.exports = (sequelize, DataTypes) => {
  class Cake extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Cake.init(
    {
      name: {
        types: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: cakeTableEnum.Name + cakeTableEnumMSG.IsRequired,
          },
          len: {
            args: [configValues.MinLenString, configValues.MaxCakePrice],
            msg: cakeTableEnum.Name + cakeTableEnumMSG.MustBeBetWeen1_100,
          },
        },
      },
      short_description: {
        types: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: cakeTableEnum.ShortDescription + cakeTableEnumMSG.IsRequired,
          },
          len: {
            args: [
              configValues.MinLenString,
              configValues.MaxLenShortDescription,
            ],
            msg:
              cakeTableEnum.ShortDescription +
              cakeTableEnumMSG.MustBeBetWeen1_100,
          },
        },
      },
      long_description: {
        types: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: cakeTableEnum.LongDescription + cakeTableEnumMSG.IsRequired,
          },
          len: {
            args: [
              configValues.MinLenString,
              configValues.MaxLenLongDescription,
            ],
            msg:
              cakeTableEnum.LongDescription +
              cakeTableEnumMSG.MustBeBetWeen1_100,
          },
        },
      },
      price: {
        types: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: {
            msg: cakeTableEnum.Price + cakeTableEnumMSG.IsRequired,
          },
          max: {
            args: configValues.MaxCakePrice,
            msg:
              cakeTableEnum.Price +
              cakeTableEnumMSG.Max +
              configValues.MaxCakePrice,
          },
          min: {
            args: configValues.MinCakePrice,
            msg:
              cakeTableEnum.Price +
              cakeTableEnumMSG.Min +
              configValues.MinCakePrice,
          },
        },
      },
      image_url: {
        types: DataTypes.STRING,
      },
    },
    {
      sequelize,
      modelName: "Cake",
    }
  );
  return Cake;
};
