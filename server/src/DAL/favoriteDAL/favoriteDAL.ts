import { DeleteResult, UpdateResult } from "typeorm";
import { AppDataSource } from "../../AppDataSource";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { Favorite } from "../../entities/Favorite";
import { IFavorite, isIFavorite } from "../../interfaces/favoriteInterfaces/IFavorite";
import { ISpecFavorite } from "../../interfaces/favoriteInterfaces/ISpecFavorite";

export const favoriteDAL = {
  addItemDAL: async (addItemData: IFavorite): Promise<IServer> => {
    const { user, cake } = addItemData;
    try {
      const newFavorite: Favorite = AppDataSource.manager.create(Favorite, {
        user,
        cake,
      });
      try {
        await newFavorite.save();
        return {
          status: serverStatus.Created,
          data: newFavorite,
          msg: serverMSG.Created,
        };
      } catch (error: any) {
        return {
          status: serverStatus.RequestFail,
          data: error.detail,
          msg: serverMSG.RequestFail,
        };
      }
    } catch (error: any) {
      console.error(error.message, {
        functionName: favoriteDAL.addItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail,
      };
    }
  },
  getItemDAL: async (getItemData: ISpecFavorite): Promise<IServer> => {
    try {
      const favorite: Favorite = await AppDataSource.manager.findOneBy(
        Favorite,
        getItemData
      );
      if (favorite) {
        return {
          status: serverStatus.Success,
          data: { favorite: favorite },
          msg: serverMSG.Success,
        };
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound,
        };
      }
    } catch (error: any) {
      console.error(error.message, {
        functionName: favoriteDAL.getItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail,
      };
    }
  },
  listItemDAL: async (getItemData: ISpecFavorite): Promise<IServer> => {
    try {
      const favorites: Favorite[] = await AppDataSource.manager.findBy(
        Favorite,
        getItemData
      );
      if (favorites.some((favorite) => isIFavorite(favorite))) {
        return {
          status: serverStatus.Success,
          data: { favorites: favorites },
          msg: serverMSG.Success,
        };
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound,
        };
      }
    } catch (error: any) {
      console.error(error.message, {
        functionName: favoriteDAL.listItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail,
      };
    }
  },
  patchItemDAL: async (
    patchItemData: ISpecFavorite,
    favoriteId: number
  ): Promise<IServer> => {
    try {
      const favorite: UpdateResult = await AppDataSource.manager.update(
        Favorite,
        favoriteId,
        patchItemData
      );
      if (favorite) {
        return {
          status: serverStatus.Updated,
          data: { favorite: favorite },
          msg: serverMSG.Updated,
        };
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound,
        };
      }
    } catch (error: any) {
      console.error(error.message, {
        functionName: favoriteDAL.listItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail,
      };
    }
  },
  deleteItemDAL: async (deleteItemData: ISpecFavorite): Promise<IServer> => {
    try {
      const favorite: DeleteResult = await AppDataSource.manager.delete(
        Favorite,
        deleteItemData
      );
      if (favorite.affected >= 1) {
        return {
          status: serverStatus.Deleted,
          data: { favorite: favorite },
          msg: serverMSG.Deleted,
        };
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound,
        };
      }
    } catch (error: any) {
      console.error(error.message, {
        functionName: favoriteDAL.deleteItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail,
      };
    }
  },
};