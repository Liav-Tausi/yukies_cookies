"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userHandler = void 0;
const userDAL_1 = require("../../DAL/userDAL/userDAL");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const ISpecUser_1 = require("../../interfaces/userInterfaces/ISpecUser");
const validateDAL_1 = require("../../middleware/validateDAL");
exports.userHandler = {
    getUserHandler: async (getUserData) => {
        const validationResult = await (0, validateDAL_1.validationDAL)(getUserData);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await userDAL_1.userDAL.getItemDAL(getUserData);
            if (dalResult.status === serverStatus_1.serverStatus.Success && (0, ISpecUser_1.isISpecUser)(dalResult.data["user"])) {
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
    listUserHandler: async (listUserData) => {
        const validationResult = await (0, validateDAL_1.validationDAL)(listUserData);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await userDAL_1.userDAL.listItemDAL(listUserData);
            if (dalResult.status === serverStatus_1.serverStatus.Success) {
                const users = dalResult.data["users"];
                if (Array.isArray(users)) {
                    return {
                        status: serverStatus_1.serverStatus.Success,
                        data: { users: users },
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
    patchUserHandler: async (patchUserData, userId) => {
        const validationResult = await (0, validateDAL_1.validationDAL)(patchUserData);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await userDAL_1.userDAL.patchItemDAL(patchUserData, userId);
            if (dalResult.status === serverStatus_1.serverStatus.Updated && (0, ISpecUser_1.isISpecUser)(dalResult.data["user"])) {
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
    deleteUserHandler: async (deleteUserData) => {
        const validationResult = await (0, validateDAL_1.validationDAL)(deleteUserData);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await userDAL_1.userDAL.deleteItemDAL(deleteUserData);
            if (dalResult.status === serverStatus_1.serverStatus.Deleted && (0, ISpecUser_1.isISpecUser)(dalResult.data["user"])) {
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
//# sourceMappingURL=userHandler.js.map