import { AppDataSource } from "../../AppDataSource";
import { cartDAL } from "../../DAL/cartDAL/cartDAL";
import { Cart } from "../../entities/Cart";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { ICart, isICart } from "../../interfaces/cartInterfaces/ICart";
import { ISpecCart, isISpecCart } from "../../interfaces/cartInterfaces/ISpecCart";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { validationDAL } from "../../middleware/validateDAL";

export const cartHandler = {
  addItemHandler: async (addItemData: ICart): Promise<IServer> => {
    const { user } = addItemData
    const validateUser = AppDataSource.manager.create(Cart, {user});
    const validationResult = await validationDAL(validateUser)
    
    if (validationResult.status === serverStatus.Success) {
        const dalResult: IServer = await cartDAL.addItemDAL(addItemData);
        if (dalResult.status === serverStatus.Created && isICart(dalResult.data)) {
          return {
            status: serverStatus.Created, 
            data: dalResult.data,
            msg: dalResult.msg
          }
      } else {
          return {
          status: serverStatus.RequestFail, 
          data: dalResult.data,
          msg: serverMSG.RequestFail
        }
      }  
    } else {
       return validationResult
    }
  },
  getItemHandler: async (getItemData: ISpecCart): Promise<IServer> => {
    const validationResult = await validationDAL(getItemData)
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await cartDAL.getItemDAL(getItemData);
      if (dalResult.status === serverStatus.Success) {
          return dalResult
      } else {
          return {
          status: serverStatus.NotFound, 
          data: dalResult.data,
          msg: serverMSG.NotFound
        }
      }  
    } else {
       return validationResult
    }
  },
  listItemHandler: async (listItemData: ISpecCart): Promise<IServer> => {
    const validationResult = await validationDAL(listItemData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await cartDAL.listItemDAL(listItemData);
      if (dalResult.status === serverStatus.Success) {
        const carts = dalResult.data["carts"];
        if (Array.isArray(carts)) {
          return {
            status: serverStatus.Success,
            data: { carts: carts },
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
      return validationResult
    }
  },
  patchItemHandler: async (patchItemData: ISpecCart, cartId: number): Promise<IServer> => {
    const validationResult = await validationDAL(patchItemData)
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await cartDAL.patchItemDAL(patchItemData, cartId);
      if (dalResult.status === serverStatus.Updated) {
          return dalResult
      } else {
          return {
          status: serverStatus.NotFound, 
          data: dalResult.data,
          msg: serverMSG.NotFound
        }
      }  
    } else {
       return validationResult
    }
  },
  deleteItemHandler: async (deleteItemData: ISpecCart): Promise<IServer> => {
    const validationResult = await validationDAL(deleteItemData)
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await cartDAL.deleteItemDAL(deleteItemData);
      if (dalResult.status === serverStatus.Deleted) {
          return dalResult
      } else {
          return {
          status: serverStatus.NotFound, 
          data: dalResult.data,
          msg: serverMSG.NotFound
        }
      }  
    } else {
       return validationResult
    }
  },
}