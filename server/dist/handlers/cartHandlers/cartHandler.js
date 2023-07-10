"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartHandler = void 0;
const AppDataSource_1 = require("../../AppDataSource");
const cartDAL_1 = require("../../DAL/cartDAL/cartDAL");
const Cart_1 = require("../../entities/Cart");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const ICart_1 = require("../../interfaces/cartInterfaces/ICart");
const ISpecCart_1 = require("../../interfaces/cartInterfaces/ISpecCart");
const validateDAL_1 = require("../../middleware/validateDAL");
exports.cartHandler = {
    addItemHandler: async (addItemData) => {
        const { user } = addItemData;
        const validateUser = AppDataSource_1.AppDataSource.manager.create(Cart_1.Cart, { user });
        const validationResult = await (0, validateDAL_1.validationDAL)(validateUser);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await cartDAL_1.cartDAL.addItemDAL(addItemData);
            if (dalResult.status === serverStatus_1.serverStatus.Created && (0, ICart_1.isICart)(dalResult.data)) {
                return {
                    status: serverStatus_1.serverStatus.Created,
                    data: dalResult.data,
                    msg: dalResult.msg
                };
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.RequestFail,
                    data: dalResult.data,
                    msg: serverMSG_1.serverMSG.RequestFail
                };
            }
        }
        else {
            return validationResult;
        }
    },
    getItemHandler: async (getItemData) => {
        const validationResult = await (0, validateDAL_1.validationDAL)(getItemData);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await cartDAL_1.cartDAL.getItemDAL(getItemData);
            if (dalResult.status === serverStatus_1.serverStatus.Success && (0, ISpecCart_1.isISpecCart)(dalResult.data["cart"])) {
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
    listItemHandler: async (listItemData) => {
        const validationResult = await (0, validateDAL_1.validationDAL)(listItemData);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await cartDAL_1.cartDAL.listItemDAL(listItemData);
            if (dalResult.status === serverStatus_1.serverStatus.Success) {
                const carts = dalResult.data["carts"];
                if (Array.isArray(carts)) {
                    return {
                        status: serverStatus_1.serverStatus.Success,
                        data: { carts: carts },
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
    patchItemHandler: async (patchItemData, cartId) => {
        const validationResult = await (0, validateDAL_1.validationDAL)(patchItemData);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await cartDAL_1.cartDAL.patchItemDAL(patchItemData, cartId);
            if (dalResult.status === serverStatus_1.serverStatus.Updated && (0, ISpecCart_1.isISpecCart)(dalResult.data["cart"])) {
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
    deleteItemHandler: async (deleteItemData) => {
        const validationResult = await (0, validateDAL_1.validationDAL)(deleteItemData);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await cartDAL_1.cartDAL.deleteItemDAL(deleteItemData);
            if (dalResult.status === serverStatus_1.serverStatus.Deleted && (0, ISpecCart_1.isISpecCart)(dalResult.data["cart"])) {
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
//# sourceMappingURL=cartHandler.js.map