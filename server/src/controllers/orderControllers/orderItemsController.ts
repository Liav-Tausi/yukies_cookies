import { Request, Response } from "express";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { zodErrorHandling } from "../../middleware/zodErrorHandling";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { orderItemsValidation } from "../../middleware/orderValidations/orderItemsValidation";
import { orderItemsOptionalValidation } from "../../middleware/orderValidations/orderItemsOptionalValidation";
import { IOrderItems } from "../../interfaces/orderItemInterfaces/IOrderItems";
import { orderItemsHandler } from "../../handlers/orderHandlers/orderItemsHandler";

export const cartItemsController = {
  addItemController: async (req: Request, res: Response): Promise<void> => {
    try {
      const initialOrderItemsData: IOrderItems = req.body;
      const orderItemsData: any = orderItemsValidation.parse(initialOrderItemsData);
      const handlerResult = await orderItemsHandler.addItemHandler(orderItemsData);
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
      zodErrorHandling(error, res);
    }
  },
  getItemController: async (req: Request, res: Response): Promise<void> => {
    try {
      const listOrGet = req.query.first;
      const { quantity, price, totalAmount } = req.query
      const orderId = req.query.order !== undefined ? Number(req.query.order) : undefined;
      const orderItemsData: any = orderItemsOptionalValidation.parse({ order:orderId, quantity, price, totalAmount });

      if (listOrGet) {
        const handlerResult: IServer = await orderItemsHandler.getItemHandler(orderItemsData);
        res.status(
          handlerResult.status === serverStatus.Success
            ? serverStatus.Success
            : handlerResult.status === serverStatus.NotFound
            ? serverStatus.NotFound
            : serverStatus.RequestFail
        ).json(handlerResult);
      } else {
        const handlerResult: IServer = await orderItemsHandler.listItemHandler(orderItemsData);
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
      const initialOrderItemsData: IOrderItems = req.body;
      const orderId: number = Number(req.query.order);
      const orderItemsData: any = orderItemsOptionalValidation.parse(initialOrderItemsData);
      const handlerResult = await orderItemsHandler.patchItemHandler(orderItemsData, orderId);
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
      const orderId = req.query.order !== undefined ? Number(req.query.order) : undefined;
      const orderItemsData: any = orderItemsOptionalValidation.parse({ id: orderId });
      const handlerResult = await orderItemsHandler.deleteItemHandler(orderItemsData);
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
