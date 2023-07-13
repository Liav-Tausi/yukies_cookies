import { AppDataSource } from "../../AppDataSource";
import { favoriteDAL } from "../../DAL/favoriteDAL/favoriteDAL";
import { Favorite } from "../../entities/Favorite";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { IFavorite, isIFavorite } from "../../interfaces/favoriteInterfaces/IFavorite";
import { ISpecFavorite, isISpecFavorite } from "../../interfaces/favoriteInterfaces/ISpecFavorite";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { validationDAL } from "../../middleware/validateDAL";

export const favoriteHandler = {
  addItemHandler: async (addItemData: IFavorite): Promise<IServer> => {
    const { user, cake } = addItemData;
    const validateFavorite = AppDataSource.manager.create(Favorite, {
      user,
      cake,
    });
    const validationResult = await validationDAL(validateFavorite);

    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await favoriteDAL.addItemDAL(addItemData);
      if (dalResult.status === serverStatus.Created && isIFavorite(dalResult.data)) {
        return {
          status: serverStatus.Created,
          data: dalResult.data,
          msg: dalResult.msg,
        };
      } else {
        return {
          status: serverStatus.RequestFail,
          data: dalResult.data,
          msg: serverMSG.RequestFail,
        };
      }
    } else {
      return validationResult;
    }
  },
  getItemHandler: async (getItemData: ISpecFavorite): Promise<IServer> => {
    const validationResult = await validationDAL(getItemData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await favoriteDAL.getItemDAL(getItemData);
      if (dalResult.status === serverStatus.Success && isIFavorite(dalResult.data["favorite"])) {
        return dalResult;
      } else {
        return {
          status: serverStatus.NotFound,
          data: dalResult.data,
          msg: serverMSG.NotFound,
        };
      }
    } else {
      return validationResult;
    }
  },
  listItemHandler: async (listItemData: ISpecFavorite): Promise<IServer> => {
    const validationResult = await validationDAL(listItemData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await favoriteDAL.listItemDAL(listItemData);
      if (dalResult.status === serverStatus.Success) {
        const favorites = dalResult.data["favorites"];
        if (Array.isArray(favorites)) {
          return {
            status: serverStatus.Success,
            data: { favorites: favorites },
            msg: serverMSG.Success,
          };
        } else {
          return {
            status: serverStatus.NotFound,
            data: dalResult.data,
            msg: serverMSG.NotFound,
          };
        }
      } else {
        return {
          status: serverStatus.NotFound,
          data: dalResult.data,
          msg: serverMSG.NotFound,
        };
      }
    } else {
      return validationResult;
    }
  },
  patchItemHandler: async (
    patchItemData: ISpecFavorite,
    favoriteId: number
  ): Promise<IServer> => {
    const validationResult = await validationDAL(patchItemData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await favoriteDAL.patchItemDAL(
        patchItemData,
        favoriteId
      );
      if (dalResult.status === serverStatus.Updated) {
        return dalResult;
      } else {
        return {
          status: serverStatus.NotFound,
          data: dalResult.data,
          msg: serverMSG.NotFound,
        };
      }
    } else {
      return validationResult;
    }
  },
  deleteItemHandler: async (deleteItemData: ISpecFavorite): Promise<IServer> => {
    const validationResult = await validationDAL(deleteItemData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await favoriteDAL.deleteItemDAL(deleteItemData);
      if (dalResult.status === serverStatus.Deleted) {
        return dalResult;
      } else {
        return {
          status: serverStatus.NotFound,
          data: dalResult.data,
          msg: serverMSG.NotFound,
        };
      }
    } else {
      return validationResult;
    }
  },
};
