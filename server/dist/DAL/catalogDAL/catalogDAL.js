"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogDAL = void 0;
const AppDataSource_1 = require("../../AppDataSource");
const Cake_1 = require("../../entities/Cake");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
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
    },
    patchItemDAL: async (patchItemData) => {
    },
    deleteItemDAL: async (deleteItemData) => {
    },
};
//# sourceMappingURL=catalogDAL.js.map