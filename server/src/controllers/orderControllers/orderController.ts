import { Request, Response } from "express";
import { IOrder } from "../../interfaces/orderInterfaces/IOrder";
import { orderHandler } from "../../handlers/orderHandlers/orderHandler";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { zodErrorHandling } from "../../middleware/zodErrorHandling";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { ISpecOrder } from "../../interfaces/orderInterfaces/ISpecOrder";
import { orderValidation } from "../../middleware/orderValidations/orderValidation";
import { orderOptionalValidation } from "../../middleware/orderValidations/orderOptionalValidation";

export const orderController = {
  addItemController: async (req: Request, res: Response): Promise<void> => {
    try {
      const initialOrderData: IOrder = req.body;
      const orderData: any = orderValidation.parse(initialOrderData);
      const handlerResult = await orderHandler.addItemHandler(orderData);
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
      const totalAmount = req.query.total_amount !== undefined ? Number(req.query.total_amount) : undefined;
      const orderTime = req.query.order_time
      const orderData: any = orderOptionalValidation.parse({ user, totalAmount, orderTime });

      if (listOrGet) {
        const handlerResult: IServer = await orderHandler.getItemHandler(orderData);
        res.status(
          handlerResult.status === serverStatus.Success
            ? serverStatus.Success
            : handlerResult.status === serverStatus.NotFound
            ? serverStatus.NotFound
            : serverStatus.RequestFail
        ).json(handlerResult);
      } else {
        const handlerResult: IServer = await orderHandler.listItemHandler(orderData);
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
      const initialOrderData: ISpecOrder = req.body;
      const orderId: number = Number(req.query.order);
      const orderData: any = orderOptionalValidation.parse(initialOrderData);
      const handlerResult = await orderHandler.patchItemHandler(orderData, orderId);
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
      const orderId: number = Number(req.query.order);
      const orderData: any = orderOptionalValidation.parse({id:orderId});
      const handlerResult = await orderHandler.deleteItemHandler(orderData);
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
