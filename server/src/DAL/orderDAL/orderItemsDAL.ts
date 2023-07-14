import { DeleteResult, UpdateResult } from "typeorm";
import { AppDataSource } from "../../AppDataSource";
import { Order } from "../../entities/Order";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { IOrderItems, isIOrderItems } from "../../interfaces/orderItemInterfaces/IOrderItems";
import { ISpecOrderItems } from "../../interfaces/orderItemInterfaces/ISpecOrderItems";
import { OrderItems } from "../../entities/OrderItems";
import { validationDAL } from "../../middleware/validateDAL";

export const orderItemsDAL = {
  addItemDAL: async (addOrderItemData: IOrderItems): Promise<IServer> => {
    const { order, totalAmount, quantity, price } = addOrderItemData;
    try {
      let newOrderItem: OrderItems;
      const validateOrderItem = AppDataSource.manager.create(OrderItems, { order, totalAmount, quantity, price });
      const validationResult = await validationDAL(validateOrderItem);
      if (validationResult.status === serverStatus.Success) {
        newOrderItem = AppDataSource.manager.create(OrderItems, { order, totalAmount, quantity, price });
      } else {
        return validationResult;
      }

      try { 
        await newOrderItem.save();
        return {
          status: serverStatus.Created,
          data: newOrderItem,
          msg: serverMSG.Created
        };
      } catch (error: any) {
        return {
          status: serverStatus.RequestFail,
          data: error.detail,
          msg: serverMSG.RequestFail
        };
      }
    } catch (error: any) {
      console.error(error.message, {
        functionName: orderItemsDAL.addItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },

  getItemDAL: async (getOrderItemData: ISpecOrderItems): Promise<IServer> => {
    try {
      const { order, totalAmount, quantity, price } = getOrderItemData;
      const orderItem: OrderItems = await AppDataSource.manager.findOneBy(OrderItems, { order, totalAmount, quantity, price });
      
      if (orderItem) {
        return {
          status: serverStatus.Success,
          data: { orderItem },
          msg: serverMSG.Success
        };
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound
        };
      }
    } catch (error: any) {
      console.error(error.message, {
        functionName: orderItemsDAL.getItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  listItemDAL: async (listOrderItemData: ISpecOrderItems): Promise<IServer> => {
    try {
      const { order, totalAmount, quantity, price } = listOrderItemData;
      const orderItems: OrderItems[] = await AppDataSource.manager.findBy(OrderItems, { order, totalAmount, quantity, price });
      
      if (orderItems.some(orderItem => isIOrderItems(orderItem))) {
        return {
          status: serverStatus.Success,
          data: { orderItems },
          msg: serverMSG.Success
        };
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound
        };
      }
    } catch (error: any) {
      console.error(error.message, {
        functionName: orderItemsDAL.listItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  patchItemDAL: async (patchOrderItemData: ISpecOrderItems, orderItemId: number): Promise<IServer> => {
    try {
      const orderItem: UpdateResult = await AppDataSource.manager.update(OrderItems, orderItemId, patchOrderItemData);
      
      if (orderItem) {
        return {
          status: serverStatus.Updated,
          data: { orderItem },
          msg: serverMSG.Updated
        };
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound
        };
      }
    } catch (error: any) {
      console.error(error.message, {
        functionName: orderItemsDAL.patchItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  deleteItemDAL: async (deleteOrderItemData: ISpecOrderItems): Promise<IServer> => {
    try {
      const deletedOrderItem: DeleteResult = await AppDataSource.manager.delete(OrderItems, deleteOrderItemData);
      
      if (deletedOrderItem.affected >= 1) {
        return {
          status: serverStatus.Deleted,
          data: { orderItems: deletedOrderItem },
          msg: serverMSG.Deleted
        };
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound
        };
      }
    } catch (error: any) {
      console.error(error.message, {
        functionName: orderItemsDAL.deleteItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  }
};
