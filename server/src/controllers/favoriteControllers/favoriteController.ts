import { Request, Response } from "express";
import { IFavorite } from "../../interfaces/favoriteInterfaces/IFavorite";
import { favoriteHandler } from "../../handlers/favoriteHandlers/favoriteHandler";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { zodErrorHandling } from "../../middleware/zodErrorHandling";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { ISpecFavorite } from "../../interfaces/favoriteInterfaces/ISpecFavorite";
import { favoriteOptionalValidation } from "../../middleware/favoriteValidations/favoriteOptionalValidation";
import { favoriteValidation } from "../../middleware/favoriteValidations/favoriteValidation";

export const favoriteController = {
  addItemController: async (req: Request, res: Response): Promise<void> => {
    try {
      const initialFavoriteData: IFavorite = req.body;
      const favoriteData: any = favoriteValidation.parse(initialFavoriteData);
      const handlerResult = await favoriteHandler.addItemHandler(favoriteData);
      const serverResultStatus: number = handlerResult.status;

      res.status(
        serverResultStatus === serverStatus.Created
          ? serverStatus.Created
          : serverStatus.RequestFail
      ).json(handlerResult);
    } catch (error: any) {
      console.error(error.stack);
      zodErrorHandling(error, res);
    }
  },
  getItemController: async (req: Request, res: Response): Promise<void> => {
    try {
      const listOrGet = req.query.first;
      const user = req.query.user !== undefined ? Number(req.query.user) : undefined;
      const favoriteData: any = favoriteOptionalValidation.parse({ user });

      if (listOrGet) {
        const handlerResult: IServer = await favoriteHandler.getItemHandler(favoriteData);
        res.status(
          handlerResult.status === serverStatus.Success
            ? serverStatus.Success
            : handlerResult.status === serverStatus.NotFound
            ? serverStatus.NotFound
            : serverStatus.RequestFail
        ).json(handlerResult);
      } else {
        const handlerResult: IServer = await favoriteHandler.listItemHandler(favoriteData);
        res.status(
          handlerResult.status === serverStatus.Success
            ? serverStatus.Success
            : handlerResult.status === serverStatus.NotFound
            ? serverStatus.NotFound
            : serverStatus.RequestFail
        ).json(handlerResult);
      }
    } catch (error: any) {
      console.error(error.stack);
      zodErrorHandling(error, res);
    }
  },
  patchItemController: async (req: Request, res: Response): Promise<void> => {
    try {
      const initialFavoriteData: ISpecFavorite = req.body;
      const favoriteId: number = Number(req.query.favorite);
      const favoriteData: any = favoriteOptionalValidation.parse(initialFavoriteData);
      const handlerResult = await favoriteHandler.patchItemHandler(favoriteData, favoriteId);
      const serverResultStatus: number = handlerResult.status;

      res.status(
        serverResultStatus === serverStatus.Updated
          ? serverStatus.Updated
          : serverStatus.RequestFail
      ).json(handlerResult);
    } catch (error: any) {
      console.error(error.stack);
      zodErrorHandling(error, res);
    }
  },
  deleteItemController: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.query.user !== undefined ? Number(req.query.user) : undefined;
      const favoriteData: any = favoriteOptionalValidation.parse({ user });
      const handlerResult = await favoriteHandler.deleteItemHandler(favoriteData);
      const serverResultStatus: number = handlerResult.status;

      res.status(
        serverResultStatus === serverStatus.Deleted
          ? serverStatus.Deleted
          : serverStatus.RequestFail
      ).json(handlerResult);
    } catch (error: any) {
      console.error(error.stack);
      zodErrorHandling(error, res);
    }
  },
};
