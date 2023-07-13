"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteDAL = void 0;
const AppDataSource_1 = require("../../AppDataSource");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const Favorite_1 = require("../../entities/Favorite");
const IFavorite_1 = require("../../interfaces/favoriteInterfaces/IFavorite");
exports.favoriteDAL = {
    addItemDAL: async (addItemData) => {
        const { user, cake } = addItemData;
        try {
            const newFavorite = AppDataSource_1.AppDataSource.manager.create(Favorite_1.Favorite, {
                user,
                cake,
            });
            try {
                await newFavorite.save();
                return {
                    status: serverStatus_1.serverStatus.Created,
                    data: newFavorite,
                    msg: serverMSG_1.serverMSG.Created,
                };
            }
            catch (error) {
                return {
                    status: serverStatus_1.serverStatus.RequestFail,
                    data: error.detail,
                    msg: serverMSG_1.serverMSG.RequestFail,
                };
            }
        }
        catch (error) {
            console.error(error.message, {
                functionName: exports.favoriteDAL.addItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail,
            };
        }
    },
    getItemDAL: async (getItemData) => {
        try {
            const favorite = await AppDataSource_1.AppDataSource.manager.findOneBy(Favorite_1.Favorite, getItemData);
            if (favorite) {
                return {
                    status: serverStatus_1.serverStatus.Success,
                    data: { favorite: favorite },
                    msg: serverMSG_1.serverMSG.Success,
                };
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: {},
                    msg: serverMSG_1.serverMSG.NotFound,
                };
            }
        }
        catch (error) {
            console.error(error.message, {
                functionName: exports.favoriteDAL.getItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail,
            };
        }
    },
    listItemDAL: async (getItemData) => {
        try {
            const favorites = await AppDataSource_1.AppDataSource.manager.findBy(Favorite_1.Favorite, getItemData);
            if (favorites.some((favorite) => (0, IFavorite_1.isIFavorite)(favorite))) {
                return {
                    status: serverStatus_1.serverStatus.Success,
                    data: { favorites: favorites },
                    msg: serverMSG_1.serverMSG.Success,
                };
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: {},
                    msg: serverMSG_1.serverMSG.NotFound,
                };
            }
        }
        catch (error) {
            console.error(error.message, {
                functionName: exports.favoriteDAL.listItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail,
            };
        }
    },
    patchItemDAL: async (patchItemData, favoriteId) => {
        try {
            const favorite = await AppDataSource_1.AppDataSource.manager.update(Favorite_1.Favorite, favoriteId, patchItemData);
            if (favorite) {
                return {
                    status: serverStatus_1.serverStatus.Updated,
                    data: { favorite: favorite },
                    msg: serverMSG_1.serverMSG.Updated,
                };
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: {},
                    msg: serverMSG_1.serverMSG.NotFound,
                };
            }
        }
        catch (error) {
            console.error(error.message, {
                functionName: exports.favoriteDAL.listItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail,
            };
        }
    },
    deleteItemDAL: async (deleteItemData) => {
        try {
            const favorite = await AppDataSource_1.AppDataSource.manager.delete(Favorite_1.Favorite, deleteItemData);
            if (favorite.affected >= 1) {
                return {
                    status: serverStatus_1.serverStatus.Deleted,
                    data: { favorite: favorite },
                    msg: serverMSG_1.serverMSG.Deleted,
                };
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: {},
                    msg: serverMSG_1.serverMSG.NotFound,
                };
            }
        }
        catch (error) {
            console.error(error.message, {
                functionName: exports.favoriteDAL.deleteItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail,
            };
        }
    },
};
//# sourceMappingURL=favoriteDAL.js.map