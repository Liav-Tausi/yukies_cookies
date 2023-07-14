import { Request, Response } from "express";
import { catalogHandler } from "../../handlers/catalogHandlers/catalogHandler";
import { catalogValidation } from "../../middleware/catalogValidations/catalogValidation";
import { zodErrorHandling } from "../../middleware/zodErrorHandling";
import { ICake } from "../../interfaces/cakeInterfaces/ICake";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { catalogOptionalValidation } from "../../middleware/catalogValidations/catalogOptionalValidation";
import { ISpecCake } from "../../interfaces/cakeInterfaces/ISpecCake";

export const catalogController = {
  addItemController: async (req: Request, res: Response): Promise<void> => {
    try {
      const initialCakeData: ICake = req.body
      const catalogData: any = catalogValidation.parse(initialCakeData);
      const handlerResult = await catalogHandler.addItemHandler(catalogData);
      const serverResultStatus: number = handlerResult.status;

      res.status(
        serverResultStatus === serverStatus.Created
        ? serverStatus.Created 
        : serverStatus.RequestFail
      ).json(handlerResult);
    } catch (error: any) {
      console.error(error.stack);
      zodErrorHandling(error, res)
    }
  },
  getItemController: async (req: Request, res: Response): Promise<void> => {
    try {
      const listOrGet = req.query.first
      const { name, shortDescription, longDescription, imageUrl } = req.query
      const price = req.query.price !== undefined ? Number(req.query.price) : undefined;
      const catalogData: any = catalogOptionalValidation.parse({
        name, shortDescription, longDescription, price, imageUrl
      });
      if (listOrGet) {
        const handlerResult: IServer = await catalogHandler.getItemHandler(catalogData);
        res.status(
          handlerResult.status === serverStatus.Success
          ? serverStatus.Success 
          : handlerResult.status === serverStatus.NotFound
          ? serverStatus.NotFound 
          : serverStatus.RequestFail
        ).json(handlerResult);
      } else {
        const handlerResult: IServer = await catalogHandler.listItemHandler(catalogData);
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
      zodErrorHandling(error, res)
    }
  },
  patchItemController: async (req: Request, res: Response): Promise<void> => {
    try {
      const initialCakeData: ISpecCake = req.body
      const cakeId: number = Number(req.query.cake)
      const catalogData: any = catalogOptionalValidation.parse(initialCakeData);
      const handlerResult = await catalogHandler.patchItemHandler(catalogData, cakeId);
      const serverResultStatus: number = handlerResult.status

      res.status(
        serverResultStatus === serverStatus.Updated
        ? serverStatus.Updated 
        : serverStatus.RequestFail
      ).json(handlerResult);

    } catch (error: any) {
      console.error(error.stack);
      zodErrorHandling(error, res)
    }
  },
  deleteItemController: async (req: Request, res: Response): Promise<void> => {
    try {
      const { name, shortDescription, longDescription, imageUrl } = req.query
      const cakeId = req.query.cake !== undefined ? Number(req.query.cake) : undefined;
      const price = req.query.price !== undefined ? Number(req.query.price) : undefined;
      const catalogData: any = catalogOptionalValidation.parse({
        id:cakeId, name, shortDescription, longDescription, price, imageUrl
      });
      const handlerResult = await catalogHandler.deleteItemHandler(catalogData);
      const serverResultStatus: number = handlerResult.status

      res.status(
        serverResultStatus === serverStatus.Deleted
        ? serverStatus.Deleted 
        : serverStatus.RequestFail
      ).json(handlerResult);

    } catch (error: any) {
      console.error(error.stack);
      zodErrorHandling(error, res)
    }
  },
}