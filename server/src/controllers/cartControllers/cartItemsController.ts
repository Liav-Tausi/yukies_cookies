import { Request, Response } from "express";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { zodErrorHandling } from "../../middleware/zodErrorHandling";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { ICartItem } from "../../interfaces/cartItemInterfaces/ICartItem";
import { cartItemsValidation } from "../../middleware/cartValidations/cartItemsValidation";
import { ISpecCartItems } from "../../interfaces/cartItemInterfaces/ISpecCartItems";
import { cartItemsOptionalValidation } from "../../middleware/cartValidations/cartItemsOptionalValidation";
import { cartItemsHandler } from "../../handlers/cartHandlers/cartItemsHandler";

export const cartItemsController = {
  addCartController: async (req: Request, res: Response): Promise<void> => {
    try {
      const initialCartItemsData: ICartItem = req.body
      const cartData: any = cartItemsValidation.parse(initialCartItemsData);
      const handlerResult = await cartItemsHandler.addCartHandler(cartData);
      const serverResultStatus: number = handlerResult.status;

      res.status(
        handlerResult.status === serverStatus.Success
          ? serverStatus.Success 
          : handlerResult.status === serverStatus.NotFound
          ? serverStatus.NotFound 
          : serverStatus.RequestFail
      ).json(handlerResult);
    } catch (error: any) {
      console.error(error.stack);
      zodErrorHandling(error, res)
    }
  },
  getCartController: async (req: Request, res: Response): Promise<void> => {
    try {
      const listOrGet = req.query.first
      const user = req.query.user !== undefined ? Number(req.query.user) : undefined;
      const cart = req.query.cart !== undefined ? Number(req.query.cart) : undefined;
      const cake = req.query.cake !== undefined ? Number(req.query.cake) : undefined;
      const quantity = req.query.quantity !== undefined ? Number(req.query.quantity) : undefined;

      const cartData: any = cartItemsOptionalValidation.parse({user, cart, cake, quantity});

      if (listOrGet) {
        const handlerResult: IServer = await cartItemsHandler.getCartHandler(cartData);
        res.status(
          handlerResult.status === serverStatus.Success
          ? serverStatus.Success 
          : handlerResult.status === serverStatus.NotFound
          ? serverStatus.NotFound 
          : serverStatus.RequestFail
        ).json(handlerResult);
      } else {
        const handlerResult: IServer = await cartItemsHandler.listCartHandler(cartData);
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
  patchCartController: async (req: Request, res: Response): Promise<void> => {
    try {
      const initialCartItemsData: ISpecCartItems = req.body
      const cartId: number = Number(req.query.cart)
      const cartData: any = cartItemsOptionalValidation.parse(initialCartItemsData);
      const handlerResult = await cartItemsHandler.patchCartHandler(cartData, cartId);
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
  deleteCartController: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.query.cart !== undefined ? Number(req.query.cart) : undefined;
      const cartData: any = cartItemsOptionalValidation.parse({user});
      const handlerResult = await cartItemsHandler.deleteCartHandler(cartData);
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