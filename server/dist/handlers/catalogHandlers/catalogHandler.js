"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogHandler = void 0;
const AppDataSource_1 = require("../../AppDataSource");
const catalogDAL_1 = require("../../DAL/catalogDAL/catalogDAL");
const Cake_1 = require("../../entities/Cake");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const ICake_1 = require("../../interfaces/cakeInterfaces/ICake");
const ISpecCake_1 = require("../../interfaces/cakeInterfaces/ISpecCake");
const validateDAL_1 = require("../../middleware/validateDAL");
exports.catalogHandler = {
    addItemHandler: async (addItemData) => {
        const validateUser = AppDataSource_1.AppDataSource.manager.create(Cake_1.Cake, addItemData);
        const validationResult = await (0, validateDAL_1.validationDAL)(validateUser);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await catalogDAL_1.catalogDAL.addItemDAL(addItemData);
            if (dalResult.status === serverStatus_1.serverStatus.Created && (0, ICake_1.isICake)(dalResult.data)) {
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
            const dalResult = await catalogDAL_1.catalogDAL.getItemDAL(getItemData);
            if (dalResult.status === serverStatus_1.serverStatus.Success && (0, ISpecCake_1.isISpacCake)(dalResult.data["cake"])) {
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
            const dalResult = await catalogDAL_1.catalogDAL.listItemDAL(listItemData);
            if (dalResult.status === serverStatus_1.serverStatus.Success) {
                const cakes = dalResult.data["cakes"];
                if (Array.isArray(cakes)) {
                    return {
                        status: serverStatus_1.serverStatus.Success,
                        data: { cakes: cakes },
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
    patchItemHandler: async (patchItemData, cakeId) => {
        const validationResult = await (0, validateDAL_1.validationDAL)(patchItemData);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await catalogDAL_1.catalogDAL.patchItemDAL(patchItemData, cakeId);
            if (dalResult.status === serverStatus_1.serverStatus.Updated && (0, ISpecCake_1.isISpacCake)(dalResult.data["cake"])) {
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
            const dalResult = await catalogDAL_1.catalogDAL.deleteItemDAL(deleteItemData);
            if (dalResult.status === serverStatus_1.serverStatus.Deleted && (0, ISpecCake_1.isISpacCake)(dalResult.data["cake"])) {
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
//# sourceMappingURL=catalogHandler.js.map