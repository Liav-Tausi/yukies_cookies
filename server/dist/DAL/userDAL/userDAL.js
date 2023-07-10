"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDAL = void 0;
const AppDataSource_1 = require("../../AppDataSource");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const User_1 = require("../../entities/User");
const IUser_1 = require("../../interfaces/userInterfaces/IUser");
exports.userDAL = {
    getItemDAL: async (getUserData) => {
        try {
            const user = await AppDataSource_1.AppDataSource.manager.findOneBy(User_1.User, getUserData);
            if (user) {
                const { password, ...userWithoutPassword } = user;
                return {
                    status: serverStatus_1.serverStatus.Success,
                    data: { user: userWithoutPassword },
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
                functionName: exports.userDAL.getItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
    listItemDAL: async (getUserData) => {
        try {
            const users = await AppDataSource_1.AppDataSource.manager.findBy(User_1.User, getUserData);
            if (users.some(user => (0, IUser_1.isIUser)(user))) {
                const usersWithoutPassword = users.map(({ password, ...user }) => user);
                return {
                    status: serverStatus_1.serverStatus.Success,
                    data: { users: usersWithoutPassword },
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
                functionName: exports.userDAL.listItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
    patchItemDAL: async (patchUserData, userId) => {
        try {
            const user = await AppDataSource_1.AppDataSource.manager.update(User_1.User, userId, patchUserData);
            if (user) {
                return {
                    status: serverStatus_1.serverStatus.Updated,
                    data: { user: user },
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
                functionName: exports.userDAL.listItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
    deleteItemDAL: async (deleteUserData) => {
        try {
            const user = await AppDataSource_1.AppDataSource.manager.delete(User_1.User, deleteUserData);
            if (user) {
                return {
                    status: serverStatus_1.serverStatus.Deleted,
                    data: { user: user },
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
                functionName: exports.userDAL.deleteItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
};
//# sourceMappingURL=userDAL.js.map