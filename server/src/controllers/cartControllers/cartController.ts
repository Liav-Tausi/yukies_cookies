import { Request, Response } from "express";
import { ICart } from "../../interfaces/cartInterfaces/ICart";
import { cartHandler } from "../../handlers/cartHandlers/cartHandler";
import { cartValidation } from "../../middleware/cartValidations/cartValidation";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { zodErrorHandling } from "../../middleware/zodErrorHandling";
import { cartOptionalValidation } from "../../middleware/cartValidations/cartOptionalValidation";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { ISpecCart } from "../../interfaces/cartInterfaces/ISpecCart";

export const cartController = {
  addItemController: async (req: Request, res: Response): Promise<void> => {
    try {
      const initialCartData: ICart = req.body
      const cartData: any = cartValidation.parse(initialCartData);
      const handlerResult = await cartHandler.addItemHandler(cartData);
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
      const id = req.query.user !== undefined ? Number(req.query.user) : undefined;
      const cartData: any = cartOptionalValidation.parse({id});

      if (listOrGet) {
        const handlerResult: IServer = await cartHandler.getItemHandler(cartData);
        res.status(
          handlerResult.status === serverStatus.Success
          ? serverStatus.Success 
          : handlerResult.status === serverStatus.NotFound
          ? serverStatus.NotFound 
          : serverStatus.RequestFail
        ).json(handlerResult);
      } else {
        const handlerResult: IServer = await cartHandler.listItemHandler(cartData);
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
      const initialCartData: ISpecCart = req.body
      const cartId: number = Number(req.query.cart)
      const cartData: any = cartOptionalValidation.parse(initialCartData);
      const handlerResult = await cartHandler.patchItemHandler(cartData, cartId);
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
      const id = req.query.user !== undefined ? Number(req.query.user) : undefined;
      const cartData: any = cartOptionalValidation.parse({id});
      const handlerResult = await cartHandler.deleteItemHandler(cartData);
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