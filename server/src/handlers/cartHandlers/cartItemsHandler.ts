import { AppDataSource } from "../../AppDataSource";
import { cartDAL } from "../../DAL/cartDAL/cartDAL";
import { cartItemsDAL } from "../../DAL/cartDAL/cartItemsDAL";
import { CartItems } from "../../entities/CartItems";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { ICartItem, isICartItem } from "../../interfaces/cartItemInterfaces/ICartItem";
import { ISpecCartItems, isISpecCartItems } from "../../interfaces/cartItemInterfaces/ISpecCartItems";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { validationDAL } from "../../middleware/validateDAL";

export const cartItemsHandler = {
  addCartHandler: async (addCartData: ICartItem ): Promise<IServer> => {
    const dalResult: IServer = await cartItemsDAL.addCartDAL(addCartData);
    if (dalResult.status === serverStatus.Created && isICartItem(dalResult.data)) {
      return {
        status: serverStatus.Created, 
        data: dalResult.data,
        msg: dalResult.msg
      }
    } else if (dalResult.status === serverStatus.NotFound){
        return {
        status: serverStatus.NotFound, 
        data: dalResult.data,
        msg: serverMSG.NotFound
      }
    } else {
      return {
        status: serverStatus.RequestFail, 
        data: dalResult.data,
        msg: serverMSG.RequestFail
      }
    }
  },
  getCartHandler: async (getCartData: ISpecCartItems): Promise<IServer> => {
    const validationResult = await validationDAL(getCartData)
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await cartItemsDAL.getCartDAL(getCartData);
      if (dalResult.status === serverStatus.Success && isISpecCartItems(dalResult.data["cartItems"])) {
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
  listCartHandler: async (listItemData: ISpecCartItems): Promise<IServer> => {
    const validationResult = await validationDAL(listItemData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await cartItemsDAL.listCartDAL(listItemData);
      if (dalResult.status === serverStatus.Success) {
        const cartItems = dalResult.data["cartItems"];
        if (Array.isArray(cartItems)) {
          return {
            status: serverStatus.Success,
            data: { cartItems },
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
  patchCartHandler: async (patchCartData: ISpecCartItems, cartItemsId: number): Promise<IServer> => {
    const validationResult = await validationDAL(patchCartData)
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await cartItemsDAL.patchCartDAL(patchCartData, cartItemsId);
      if (dalResult.status === serverStatus.Updated && isISpecCartItems(dalResult.data["cartItems"])) {
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
  deleteCartHandler: async (deleteCartData: ISpecCartItems): Promise<IServer> => {
    const validationResult = await validationDAL(deleteCartData)
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await cartItemsDAL.deleteCartDAL(deleteCartData);
      if (dalResult.status === serverStatus.Deleted && isISpecCartItems(dalResult.data["cartItems"])) {
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