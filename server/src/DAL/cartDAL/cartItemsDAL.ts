import { DeleteResult, UpdateResult } from "typeorm";
import { AppDataSource } from "../../AppDataSource";
import { Cart } from "../../entities/Cart";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { ICartItem, isICartItem } from "../../interfaces/cartItemInterfaces/ICartItem";
import { ISpecCartItems } from "../../interfaces/cartItemInterfaces/ISpecCartItems";
import { CartItems } from "../../entities/CartItems";
import { validationDAL } from "../../middleware/validateDAL";

export const cartItemsDAL = {
  addCartDAL: async (addCartData: ICartItem): Promise<IServer> => {
    const { user, cart, cake, quantity } = addCartData
    try {
      let newCartItems: CartItems
      if (user) {
        const cartId: Cart = await AppDataSource.manager.createQueryBuilder(Cart, "cart")
        .where("cart.user = :userId", { userId: user }).getOne();
        if (cartId) {
          const validateUser = AppDataSource.manager.create(CartItems, { cart: cartId.id, cake, quantity });
          const validationResult = await validationDAL(validateUser)
          if (validationResult.status === serverStatus.Success) {
            newCartItems = AppDataSource.manager.create(CartItems, { cart: cartId.id, cake, quantity });
          } else {return validationResult}
        } else {
          return {
            status: serverStatus.NotFound,
            data: {},
            msg: serverMSG.NotFound
          }
        }
      } else {
        const validateUser = AppDataSource.manager.create(CartItems, { cart, cake, quantity });
        const validationResult = await validationDAL(validateUser)
        if (validationResult.status === serverStatus.Success) {
          newCartItems = AppDataSource.manager.create(CartItems, { cart, cake, quantity })
        } else {return validationResult}
      }
      try { 
        await newCartItems.save() 
        return {
          status: serverStatus.Created,
          data: newCartItems,
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
          functionName: cartItemsDAL.addCartDAL.name,
        });
        return {
          status: serverStatus.RequestFail,
          data: error.message,
          msg: serverMSG.RequestFail
        };
      }
    },
  getCartDAL: async (getCartData: ISpecCartItems): Promise<IServer> => {
    try {
      const { user, cart, cake, quantity } = getCartData
      let cartItems: CartItems
      if (user) {
        const cartId: Cart = await AppDataSource.manager.findOneBy(Cart, { user });
        const cartItems: CartItems = await AppDataSource.manager.findOneBy(CartItems, { cart: cartId.id, cake, quantity });
      } else {
        const cartItems: CartItems = await AppDataSource.manager.findOneBy(CartItems, { cart, cake, quantity });
      }
      if (cartItems) {
        return {
          status: serverStatus.Success,
          data: {cartItems},
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
        functionName: cartItemsDAL.getCartDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  listCartDAL: async (listCartData: ISpecCartItems): Promise<IServer> => {
    try {
       const { user, cart, cake, quantity } = listCartData
       let cartItems: []
       if (user) {
        const cartId: Cart = await AppDataSource.manager.findOneBy(Cart, { user });
        const cartItems: CartItems[] = await AppDataSource.manager.findBy(CartItems, { cart: cartId.id, cake, quantity });
      } else {
        const cartItems: CartItems[] = await AppDataSource.manager.findBy(CartItems, { cart, cake, quantity });
      }
      if (cartItems.some(cart => isICartItem(cart))) {
        return {
          status: serverStatus.Success,
          data: { cartItems },
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
        functionName: cartItemsDAL.listCartDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  patchCartDAL: async (patchCartData: ISpecCartItems, cartItemsId: number): Promise<IServer> => {
    try {
      const cartItems: UpdateResult = await AppDataSource.manager.update(CartItems, cartItemsId, patchCartData);
      if (cartItems) {
        return {
          status: serverStatus.Updated,
          data: { cartItems },
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
        functionName: cartItemsDAL.patchCartDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
  deleteCartDAL: async (deleteCartData: ISpecCartItems): Promise<IServer> => {
    try {
      const { user } = deleteCartData
      const cart: DeleteResult = await AppDataSource.manager.delete(Cart, {user});
      if (cart) {
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
        functionName: cartItemsDAL.deleteCartDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      };
    }
  },
}