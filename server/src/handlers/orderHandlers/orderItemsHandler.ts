import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { validationDAL } from "../../middleware/validateDAL";
import { IOrderItems, isIOrderItems } from "../../interfaces/orderItemInterfaces/IOrderItems";
import { orderItemsDAL } from "../../DAL/orderDAL/orderItemsDAL";
import { ISpecOrderItems } from "../../interfaces/orderItemInterfaces/ISpecOrderItems";

export const orderItemsHandler = {
  addItemHandler: async (addItemData: IOrderItems): Promise<IServer> => {
    const dalResult: IServer = await orderItemsDAL.addItemDAL(addItemData);
    if (dalResult.status === serverStatus.Created && isIOrderItems(dalResult.data)) {
      return {
        status: serverStatus.Created,
        data: dalResult.data,
        msg: dalResult.msg,
      };
    } else if (dalResult.status === serverStatus.NotFound) {
      return {
        status: serverStatus.NotFound,
        data: dalResult.data,
        msg: serverMSG.NotFound,
      };
    } else {
      return {
        status: serverStatus.RequestFail,
        data: dalResult.data,
        msg: serverMSG.RequestFail,
      };
    }
  },
  getItemHandler: async (getItemData: ISpecOrderItems): Promise<IServer> => {
    const validationResult = await validationDAL(getItemData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await orderItemsDAL.getItemDAL(getItemData);
      if (dalResult.status === serverStatus.Success && Array.isArray(dalResult.data)) {
        return dalResult;
      } else {
        return {
          status: serverStatus.NotFound,
          data: dalResult.data,
          msg: serverMSG.NotFound,
        };
      }
    } else {
      return validationResult;
    }
  },
  listItemHandler: async (listItemData: ISpecOrderItems): Promise<IServer> => {
    const validationResult = await validationDAL(listItemData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await orderItemsDAL.listItemDAL(listItemData);
      if (dalResult.status === serverStatus.Success && Array.isArray(dalResult.data)) {
        return {
          status: serverStatus.Success,
          data: dalResult.data,
          msg: serverMSG.Success,
        };
      } else {
        return {
          status: serverStatus.NotFound,
          data: dalResult.data,
          msg: serverMSG.NotFound,
        };
      }
    } else {
      return validationResult;
    }
  },
  patchItemHandler: async (patchItemData: ISpecOrderItems, orderId: number): Promise<IServer> => {
    const validationResult = await validationDAL(patchItemData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await orderItemsDAL.patchItemDAL(patchItemData, orderId);
      if (dalResult.status === serverStatus.Updated) {
        return dalResult;
      } else {
        return {
          status: serverStatus.NotFound,
          data: dalResult.data,
          msg: serverMSG.NotFound,
        };
      }
    } else {
      return validationResult;
    }
  },
  deleteItemHandler: async (deleteItemData: ISpecOrderItems): Promise<IServer> => {
    const validationResult = await validationDAL(deleteItemData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await orderItemsDAL.deleteItemDAL(deleteItemData);
      if (dalResult.status === serverStatus.Deleted) {
        return dalResult;
      } else {
        return {
          status: serverStatus.NotFound,
          data: dalResult.data,
          msg: serverMSG.NotFound,
        };
      }
    } else {
      return validationResult;
    }
  },
};
