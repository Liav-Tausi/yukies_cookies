"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemsDAL = void 0;
const AppDataSource_1 = require("../../AppDataSource");
const Cart_1 = require("../../entities/Cart");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const ICartItem_1 = require("../../interfaces/cartItemInterfaces/ICartItem");
const CartItems_1 = require("../../entities/CartItems");
const validateDAL_1 = require("../../middleware/validateDAL");
exports.cartItemsDAL = {
    addItemDAL: async (addCartData) => {
        const { user, cart, cake, quantity } = addCartData;
        try {
            let newCartItems;
            if (user) {
                const cartId = await AppDataSource_1.AppDataSource.manager.createQueryBuilder(Cart_1.Cart, "cart")
                    .where("cart.user = :userId", { userId: user }).getOne();
                if (cartId) {
                    const validateUser = AppDataSource_1.AppDataSource.manager.create(CartItems_1.CartItems, { cart: cartId.id, cake, quantity });
                    const validationResult = await (0, validateDAL_1.validationDAL)(validateUser);
                    if (validationResult.status === serverStatus_1.serverStatus.Success) {
                        newCartItems = AppDataSource_1.AppDataSource.manager.create(CartItems_1.CartItems, { cart: cartId.id, cake, quantity });
                    }
                    else {
                        return validationResult;
                    }
                }
                else {
                    return {
                        status: serverStatus_1.serverStatus.NotFound,
                        data: {},
                        msg: serverMSG_1.serverMSG.NotFound
                    };
                }
            }
            else {
                const validateUser = AppDataSource_1.AppDataSource.manager.create(CartItems_1.CartItems, { cart, cake, quantity });
                const validationResult = await (0, validateDAL_1.validationDAL)(validateUser);
                if (validationResult.status === serverStatus_1.serverStatus.Success) {
                    newCartItems = AppDataSource_1.AppDataSource.manager.create(CartItems_1.CartItems, { cart, cake, quantity });
                }
                else {
                    return validationResult;
                }
            }
            try {
                await newCartItems.save();
                return {
                    status: serverStatus_1.serverStatus.Created,
                    data: newCartItems,
                    msg: serverMSG_1.serverMSG.Created
                };
            }
            catch (error) {
                return {
                    status: serverStatus_1.serverStatus.RequestFail,
                    data: error.detail,
                    msg: serverMSG_1.serverMSG.RequestFail
                };
            }
        }
        catch (error) {
            console.error(error.message, {
                functionName: exports.cartItemsDAL.addItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
    getItemDAL: async (getCartData) => {
        try {
            const { user, cart, cake, quantity } = getCartData;
            let cartItems;
            if (user) {
                const cartId = await AppDataSource_1.AppDataSource.manager.findOneBy(Cart_1.Cart, { user });
                const cartItems = await AppDataSource_1.AppDataSource.manager.findOneBy(CartItems_1.CartItems, { cart: cartId.id, cake, quantity });
            }
            else {
                const cartItems = await AppDataSource_1.AppDataSource.manager.findOneBy(CartItems_1.CartItems, { cart, cake, quantity });
            }
            if (cartItems) {
                return {
                    status: serverStatus_1.serverStatus.Success,
                    data: { cartItems },
                    msg: serverMSG_1.serverMSG.Success
                };
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: {},
                    msg: serverMSG_1.serverMSG.NotFound
                };
            }
        }
        catch (error) {
            console.error(error.message, {
                functionName: exports.cartItemsDAL.getItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
    listItemDAL: async (listCartData) => {
        try {
            const { user, cart, cake, quantity } = listCartData;
            let cartItems;
            if (user) {
                const cartId = await AppDataSource_1.AppDataSource.manager.findOneBy(Cart_1.Cart, { user });
                const cartItems = await AppDataSource_1.AppDataSource.manager.findBy(CartItems_1.CartItems, { cart: cartId.id, cake, quantity });
            }
            else {
                const cartItems = await AppDataSource_1.AppDataSource.manager.findBy(CartItems_1.CartItems, { cart, cake, quantity });
            }
            if (cartItems.some(cart => (0, ICartItem_1.isICartItem)(cart))) {
                return {
                    status: serverStatus_1.serverStatus.Success,
                    data: { cartItems },
                    msg: serverMSG_1.serverMSG.Success
                };
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: {},
                    msg: serverMSG_1.serverMSG.NotFound
                };
            }
        }
        catch (error) {
            console.error(error.message, {
                functionName: exports.cartItemsDAL.listItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
    patchItemDAL: async (patchCartData, cartItemsId) => {
        try {
            const cartItems = await AppDataSource_1.AppDataSource.manager.update(CartItems_1.CartItems, cartItemsId, patchCartData);
            if (cartItems) {
                return {
                    status: serverStatus_1.serverStatus.Updated,
                    data: { cartItems },
                    msg: serverMSG_1.serverMSG.Updated
                };
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: {},
                    msg: serverMSG_1.serverMSG.NotFound
                };
            }
        }
        catch (error) {
            console.error(error.message, {
                functionName: exports.cartItemsDAL.patchItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
    deleteItemDAL: async (deleteCartData) => {
        try {
            const { user } = deleteCartData;
            const deletedCart = await AppDataSource_1.AppDataSource.manager.delete(CartItems_1.CartItems, { id: user });
            if (deletedCart.affected >= 1) {
                return {
                    status: serverStatus_1.serverStatus.Deleted,
                    data: { cartItems: deletedCart },
                    msg: serverMSG_1.serverMSG.Deleted
                };
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: {},
                    msg: serverMSG_1.serverMSG.NotFound
                };
            }
        }
        catch (error) {
            console.error(error.message, {
                functionName: exports.cartItemsDAL.deleteItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
};
//# sourceMappingURL=cartItemsDAL.js.map