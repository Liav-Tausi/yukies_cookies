import { DeleteResult, UpdateResult } from "typeorm";
import { AppDataSource } from "../../AppDataSource";
import { Cart } from "../../entities/Cart";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { ICart, isICart } from "../../interfaces/cartInterfaces/ICart";
import { ISpecCart } from "../../interfaces/cartInterfaces/ISpecCart";
import { IServer } from "../../interfaces/serverInterfaces/IServer";

export const cartDAL = {
  addItemDAL: async (addItemData: ICart): Promise<IServer> => {
    const { user } = addItemData
    try {
        const newCart: Cart = AppDataSource.manager.create(Cart, {user})
      try { 
        await newCart.save() 
        return {
          status: serverStatus.Created,
          data: newCart,
          msg:  serverMSG.Created 
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
          functionName: cartDAL.addItemDAL.name,
        });
        return {
          status: serverStatus.RequestFail,
          data: error.message,
          msg: serverMSG.RequestFail
        };
      }
    },
  getItemDAL: async (getItemData: ISpecCart): Promise<IServer> => {
    try {
      const { user } = getItemData
      const cart: Cart = await AppDataSource.manager.findOneBy(Cart, {user});
      if (cart) {
        return {
          status: serverStatus.Success,
          data: {cart: cart},
          msg: serverMSG.Success
        }
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound
        }
      }
    } catch (error: any) {
        console.error(error.message, {
        functionName: cartDAL.getItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  listItemDAL: async (getItemData: ISpecCart): Promise<IServer> => {
    try {
      const { user } = getItemData
      const carts: Cart[] = await AppDataSource.manager.findBy(Cart, {user});
      if (carts.some(cart => isICart(cart))) {
        return {
          status: serverStatus.Success,
          data: { carts: carts },
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
        functionName: cartDAL.listItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  patchItemDAL: async (patchItemData: ISpecCart, cartId: number): Promise<IServer> => {
    try {
      const { user } = patchItemData
      const cart: UpdateResult = await AppDataSource.manager.update(Cart, cartId, patchItemData);
      if (cart) {
        return {
          status: serverStatus.Updated,
          data: {cart: cart},
          msg: serverMSG.Updated
        }
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound
        }
      }
    } catch (error: any) {
        console.error(error.message, {
        functionName: cartDAL.listItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  deleteItemDAL: async (deleteItemData: ISpecCart): Promise<IServer> => {
    try {
      const { user } = deleteItemData
      const cart: DeleteResult = await AppDataSource.manager.delete(Cart, {user});
      if (cart.affected >= 1) {
        return {
          status: serverStatus.Deleted,
          data: {cart: cart},
          msg: serverMSG.Deleted
        }
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound
        }
      }
    } catch (error: any) {
        console.error(error.message, {
        functionName: cartDAL.deleteItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
}