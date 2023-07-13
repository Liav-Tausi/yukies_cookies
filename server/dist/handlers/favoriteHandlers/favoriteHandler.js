"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteHandler = void 0;
const AppDataSource_1 = require("../../AppDataSource");
const favoriteDAL_1 = require("../../DAL/favoriteDAL/favoriteDAL");
const Favorite_1 = require("../../entities/Favorite");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const IFavorite_1 = require("../../interfaces/favoriteInterfaces/IFavorite");
const validateDAL_1 = require("../../middleware/validateDAL");
exports.favoriteHandler = {
    addItemHandler: async (addItemData) => {
        const { user, cake } = addItemData;
        const validateFavorite = AppDataSource_1.AppDataSource.manager.create(Favorite_1.Favorite, {
            user,
            cake,
        });
        const validationResult = await (0, validateDAL_1.validationDAL)(validateFavorite);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await favoriteDAL_1.favoriteDAL.addItemDAL(addItemData);
            if (dalResult.status === serverStatus_1.serverStatus.Created && (0, IFavorite_1.isIFavorite)(dalResult.data)) {
                return {
                    status: serverStatus_1.serverStatus.Created,
                    data: dalResult.data,
                    msg: dalResult.msg,
                };
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.RequestFail,
                    data: dalResult.data,
                    msg: serverMSG_1.serverMSG.RequestFail,
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
            const dalResult = await favoriteDAL_1.favoriteDAL.getItemDAL(getItemData);
            if (dalResult.status === serverStatus_1.serverStatus.Success && (0, IFavorite_1.isIFavorite)(dalResult.data["favorite"])) {
                return dalResult;
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: dalResult.data,
                    msg: serverMSG_1.serverMSG.NotFound,
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
            const dalResult = await favoriteDAL_1.favoriteDAL.listItemDAL(listItemData);
            if (dalResult.status === serverStatus_1.serverStatus.Success) {
                const favorites = dalResult.data["favorites"];
                if (Array.isArray(favorites)) {
                    return {
                        status: serverStatus_1.serverStatus.Success,
                        data: { favorites: favorites },
                        msg: serverMSG_1.serverMSG.Success,
                    };
                }
                else {
                    return {
                        status: serverStatus_1.serverStatus.NotFound,
                        data: dalResult.data,
                        msg: serverMSG_1.serverMSG.NotFound,
                    };
                }
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: dalResult.data,
                    msg: serverMSG_1.serverMSG.NotFound,
                };
            }
        }
        else {
            return validationResult;
        }
    },
    patchItemHandler: async (patchItemData, favoriteId) => {
        const validationResult = await (0, validateDAL_1.validationDAL)(patchItemData);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await favoriteDAL_1.favoriteDAL.patchItemDAL(patchItemData, favoriteId);
            if (dalResult.status === serverStatus_1.serverStatus.Updated) {
                return dalResult;
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: dalResult.data,
                    msg: serverMSG_1.serverMSG.NotFound,
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
            const dalResult = await favoriteDAL_1.favoriteDAL.deleteItemDAL(deleteItemData);
            if (dalResult.status === serverStatus_1.serverStatus.Deleted) {
                return dalResult;
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: dalResult.data,
                    msg: serverMSG_1.serverMSG.NotFound,
                };
            }
        }
        else {
            return validationResult;
        }
    },
};
//# sourceMappingURL=favoriteHandler.js.map