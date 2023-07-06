"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogHandler = void 0;
const AppDataSource_1 = require("../../AppDataSource");
const catalogDAL_1 = require("../../DAL/catalogDAL/catalogDAL");
const Cake_1 = require("../../entities/Cake");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const ICake_1 = require("../../interfaces/cakeInterfaces/ICake");
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
    },
    // getItemHandler: async (getItemData): Promise<void> => {
    //   const dalResult: IServer = await catalogDAL.getItemDAL();
    // },
    // patchItemHandler: async (patchItemData): Promise<void> => {
    //   const dalResult: IServer = await catalogDAL.patchItemDAL();
    // },
    // deleteItemHandler: async (deleteItemData): Promise<void> => {
    //   const dalResult: IServer = await catalogDAL.deleteItemDAL();
    // },
};
//# sourceMappingURL=catalogHandler.js.map