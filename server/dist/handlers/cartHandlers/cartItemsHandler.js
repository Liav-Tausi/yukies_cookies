"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemsHandler = void 0;
const cartItemsDAL_1 = require("../../DAL/cartDAL/cartItemsDAL");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const ICartItem_1 = require("../../interfaces/cartItemInterfaces/ICartItem");
const ISpecCartItems_1 = require("../../interfaces/cartItemInterfaces/ISpecCartItems");
const validateDAL_1 = require("../../middleware/validateDAL");
exports.cartItemsHandler = {
    addCartHandler: async (addCartData) => {
        const dalResult = await cartItemsDAL_1.cartItemsDAL.addCartDAL(addCartData);
        if (dalResult.status === serverStatus_1.serverStatus.Created && (0, ICartItem_1.isICartItem)(dalResult.data)) {
            return {
                status: serverStatus_1.serverStatus.Created,
                data: dalResult.data,
                msg: dalResult.msg
            };
        }
        else if (dalResult.status === serverStatus_1.serverStatus.NotFound) {
            return {
                status: serverStatus_1.serverStatus.NotFound,
                data: dalResult.data,
                msg: serverMSG_1.serverMSG.NotFound
            };
        }
        else {
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: dalResult.data,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
    getCartHandler: async (getCartData) => {
        const validationResult = await (0, validateDAL_1.validationDAL)(getCartData);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await cartItemsDAL_1.cartItemsDAL.getCartDAL(getCartData);
            if (dalResult.status === serverStatus_1.serverStatus.Success && (0, ISpecCartItems_1.isISpecCartItems)(dalResult.data["cartItems"])) {
                return dalResult;
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: dalResult.data,
                    msg: serverMSG_1.serverMSG.NotFound
                };
            }
        }
        else {
            return validationResult;
        }
    },
    listCartHandler: async (listItemData) => {
        const validationResult = await (0, validateDAL_1.validationDAL)(listItemData);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await cartItemsDAL_1.cartItemsDAL.listCartDAL(listItemData);
            if (dalResult.status === serverStatus_1.serverStatus.Success) {
                const cartItems = dalResult.data["cartItems"];
                if (Array.isArray(cartItems)) {
                    return {
                        status: serverStatus_1.serverStatus.Success,
                        data: { cartItems },
                        msg: serverMSG_1.serverMSG.Success
                    };
                }
                else {
                    return {
                        status: serverStatus_1.serverStatus.NotFound,
                        data: dalResult.data,
                        msg: serverMSG_1.serverMSG.NotFound
                    };
                }
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: dalResult.data,
                    msg: serverMSG_1.serverMSG.NotFound
                };
            }
        }
        else {
            return validationResult;
        }
    },
    patchCartHandler: async (patchCartData, cartItemsId) => {
        const validationResult = await (0, validateDAL_1.validationDAL)(patchCartData);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await cartItemsDAL_1.cartItemsDAL.patchCartDAL(patchCartData, cartItemsId);
            if (dalResult.status === serverStatus_1.serverStatus.Updated && (0, ISpecCartItems_1.isISpecCartItems)(dalResult.data["cartItems"])) {
                return dalResult;
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: dalResult.data,
                    msg: serverMSG_1.serverMSG.NotFound
                };
            }
        }
        else {
            return validationResult;
        }
    },
    deleteCartHandler: async (deleteCartData) => {
        const validationResult = await (0, validateDAL_1.validationDAL)(deleteCartData);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await cartItemsDAL_1.cartItemsDAL.deleteCartDAL(deleteCartData);
            if (dalResult.status === serverStatus_1.serverStatus.Deleted && (0, ISpecCartItems_1.isISpecCartItems)(dalResult.data["cartItems"])) {
                return dalResult;
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: dalResult.data,
                    msg: serverMSG_1.serverMSG.NotFound
                };
            }
        }
        else {
            return validationResult;
        }
    },
};
//# sourceMappingURL=cartItemsHandler.js.map