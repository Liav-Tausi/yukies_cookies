"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartDAL = void 0;
const AppDataSource_1 = require("../../AppDataSource");
const Cart_1 = require("../../entities/Cart");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const ICart_1 = require("../../interfaces/cartInterfaces/ICart");
exports.cartDAL = {
    addItemDAL: async (addItemData) => {
        const { user } = addItemData;
        try {
            const newCart = AppDataSource_1.AppDataSource.manager.create(Cart_1.Cart, { user });
            try {
                await newCart.save();
                return {
                    status: serverStatus_1.serverStatus.Created,
                    data: newCart,
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
                functionName: exports.cartDAL.addItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
    getItemDAL: async (getItemData) => {
        try {
            const { user } = getItemData;
            const cart = await AppDataSource_1.AppDataSource.manager.findOneBy(Cart_1.Cart, { user });
            if (cart) {
                return {
                    status: serverStatus_1.serverStatus.Success,
                    data: { cart: cart },
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
                functionName: exports.cartDAL.getItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
    listItemDAL: async (getItemData) => {
        try {
            const { user } = getItemData;
            const carts = await AppDataSource_1.AppDataSource.manager.findBy(Cart_1.Cart, { user });
            if (carts.some(cart => (0, ICart_1.isICart)(cart))) {
                return {
                    status: serverStatus_1.serverStatus.Success,
                    data: { carts: carts },
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
                functionName: exports.cartDAL.listItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
    patchItemDAL: async (patchItemData, cartId) => {
        try {
            const { user } = patchItemData;
            const cart = await AppDataSource_1.AppDataSource.manager.update(Cart_1.Cart, cartId, patchItemData);
            if (cart) {
                return {
                    status: serverStatus_1.serverStatus.Updated,
                    data: { cart: cart },
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
                functionName: exports.cartDAL.listItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
    deleteItemDAL: async (deleteItemData) => {
        try {
            const { user } = deleteItemData;
            const cart = await AppDataSource_1.AppDataSource.manager.delete(Cart_1.Cart, { user });
            if (cart.affected >= 1) {
                return {
                    status: serverStatus_1.serverStatus.Deleted,
                    data: { cart: cart },
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
                functionName: exports.cartDAL.deleteItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
};
//# sourceMappingURL=cartDAL.js.map