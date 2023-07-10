"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogDAL = void 0;
const AppDataSource_1 = require("../../AppDataSource");
const Cake_1 = require("../../entities/Cake");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const ICake_1 = require("../../interfaces/cakeInterfaces/ICake");
exports.catalogDAL = {
    addItemDAL: async (addItemData) => {
        const { name, shortDescription, longDescription, price, imageUrl } = addItemData;
        try {
            const newCake = AppDataSource_1.AppDataSource.manager.create(Cake_1.Cake, {
                name,
                shortDescription,
                longDescription,
                price,
                imageUrl
            });
            try {
                await newCake.save();
                return {
                    status: serverStatus_1.serverStatus.Created,
                    data: newCake,
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
                functionName: exports.catalogDAL.addItemDAL.name,
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
            const cake = await AppDataSource_1.AppDataSource.manager.findOneBy(Cake_1.Cake, getItemData);
            if (cake) {
                return {
                    status: serverStatus_1.serverStatus.Success,
                    data: { cake: cake },
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
                functionName: exports.catalogDAL.getItemDAL.name,
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
            const cakes = await AppDataSource_1.AppDataSource.manager.findBy(Cake_1.Cake, getItemData);
            if (cakes.some(cake => (0, ICake_1.isICake)(cake))) {
                return {
                    status: serverStatus_1.serverStatus.Success,
                    data: { cakes: cakes },
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
                functionName: exports.catalogDAL.listItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
    patchItemDAL: async (patchItemData, cakeId) => {
        try {
            const cake = await AppDataSource_1.AppDataSource.manager.update(Cake_1.Cake, cakeId, patchItemData);
            if (cake) {
                return {
                    status: serverStatus_1.serverStatus.Updated,
                    data: { cake: cake },
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
                functionName: exports.catalogDAL.listItemDAL.name,
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
            const cake = await AppDataSource_1.AppDataSource.manager.delete(Cake_1.Cake, deleteItemData);
            if (cake) {
                return {
                    status: serverStatus_1.serverStatus.Deleted,
                    data: { cake: cake },
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
                functionName: exports.catalogDAL.deleteItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
};
//# sourceMappingURL=catalogDAL.js.map