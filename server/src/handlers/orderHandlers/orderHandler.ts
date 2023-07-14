import { AppDataSource } from "../../AppDataSource";
import { orderDAL } from "../../DAL/orderDAL/orderDAL";
import { Order } from "../../entities/Order";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { IOrder, isIOrder } from "../../interfaces/orderInterfaces/IOrder";
import { ISpecOrder } from "../../interfaces/orderInterfaces/ISpecOrder";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { validationDAL } from "../../middleware/validateDAL";

export const orderHandler = {
  addItemHandler: async (addItemData: IOrder): Promise<IServer> => {
    const { user } = addItemData;
    const validateOrder = AppDataSource.manager.create(Order, { user });
    const validationResult = await validationDAL(validateOrder);

    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await orderDAL.addItemDAL(addItemData);
      if (dalResult.status === serverStatus.Created && isIOrder(dalResult.data)) {
        return {
          status: serverStatus.Created,
          data: dalResult.data,
          msg: dalResult.msg
        };
      } else {
        return {
          status: serverStatus.RequestFail,
          data: dalResult.data,
          msg: serverMSG.RequestFail
        };
      }
    } else {
      return validationResult;
    }
  },
  getItemHandler: async (getItemData: ISpecOrder): Promise<IServer> => {
    const validationResult = await validationDAL(getItemData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await orderDAL.getItemDAL(getItemData);
      if (dalResult.status === serverStatus.Success) {
        return dalResult;
      } else {
        return {
          status: serverStatus.NotFound,
          data: dalResult.data,
          msg: serverMSG.NotFound
        };
      }
    } else {
      return validationResult;
    }
  },
  listItemHandler: async (listItemData: ISpecOrder): Promise<IServer> => {
    const validationResult = await validationDAL(listItemData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await orderDAL.listItemsDAL(listItemData);
      if (dalResult.status === serverStatus.Success) {
        const orders = dalResult.data["orders"];
        if (Array.isArray(orders)) {
          return {
            status: serverStatus.Success,
            data: { orders: orders },
            msg: serverMSG.Success
          };
        } else {
          return {
            status: serverStatus.NotFound,
            data: dalResult.data,
            msg: serverMSG.NotFound
          };
        }
      } else {
        return {
          status: serverStatus.NotFound,
          data: dalResult.data,
          msg: serverMSG.NotFound
        };
      }
    } else {
      return validationResult;
    }
  },
  patchItemHandler: async ( patchItemData: ISpecOrder, orderId: number ): Promise<IServer> => {
    const validationResult = await validationDAL(patchItemData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await orderDAL.patchItemDAL(
        patchItemData,
        orderId
      );
      if (dalResult.status === serverStatus.Updated) {
        return dalResult;
      } else {
        return {
          status: serverStatus.NotFound,
          data: dalResult.data,
          msg: serverMSG.NotFound
        };
      }
    } else {
      return validationResult;
    }
  },
  deleteItemHandler: async (deleteItemData: ISpecOrder): Promise<IServer> => {
    const validationResult = await validationDAL(deleteItemData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await orderDAL.deleteItemDAL(
        deleteItemData
      );
      if (dalResult.status === serverStatus.Deleted) {
        return dalResult;
      } else {
        return {
          status: serverStatus.NotFound,
          data: dalResult.data,
          msg: serverMSG.NotFound
        };
      }
    } else {
      return validationResult;
    }
  }
};
