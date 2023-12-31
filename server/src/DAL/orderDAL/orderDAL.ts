import { DeleteResult, UpdateResult } from "typeorm";
import { AppDataSource } from "../../AppDataSource";
import { Order } from "../../entities/Order";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { IOrder, isIOrder } from "../../interfaces/orderInterfaces/IOrder";
import { ISpecOrder } from "../../interfaces/orderInterfaces/ISpecOrder";
import { IServer } from "../../interfaces/serverInterfaces/IServer";

export const orderDAL = {
  addItemDAL: async (addItemData: IOrder): Promise<IServer> => {
    const { user, totalAmount, orderTime } = addItemData;
    try {
      const newOrder: Order = AppDataSource.manager.create(Order, {
        user,
        totalAmount,
        orderTime
      });
      try {
        await newOrder.save();
        return {
          status: serverStatus.Created,
          data: newOrder,
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
        functionName: orderDAL.addItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  getItemDAL: async (getItemData: ISpecOrder): Promise<IServer> => {
    try {
      const { user } = getItemData;
      const order: Order = await AppDataSource.manager.findOneBy(Order, { user });
      if (order) {
        return {
          status: serverStatus.Success,
          data: { order: order },
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
        functionName: orderDAL.getItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  listItemsDAL: async (listItemData: ISpecOrder): Promise<IServer> => {
    try {
      const { user } = listItemData;
      const orders: Order[] = await AppDataSource.manager.findBy(Order, { user });
      if (orders.some(order => isIOrder(order))) {
        return {
          status: serverStatus.Success,
          data: { orders: orders },
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
        functionName: orderDAL.listItemsDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  patchItemDAL: async (patchItemData: ISpecOrder, orderId: number): Promise<IServer> => {
    try {
      const { user } = patchItemData;
      const order: UpdateResult = await AppDataSource.manager.update(Order, orderId, patchItemData);
      if (order) {
        return {
          status: serverStatus.Updated,
          data: { order: order },
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
        functionName: orderDAL.patchItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  deleteItemDAL: async (deleteOrderData: ISpecOrder): Promise<IServer> => {
    try {
      const order: DeleteResult = await AppDataSource.manager.delete(Order, deleteOrderData);
      if (order.affected >= 1) {
        return {
          status: serverStatus.Deleted,
          data: { order: order },
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
        functionName: orderDAL.deleteItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
};
