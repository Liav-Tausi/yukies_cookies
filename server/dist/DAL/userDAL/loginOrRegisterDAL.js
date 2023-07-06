"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOrRegisterDAL = void 0;
const User_1 = require("../../entities/User");
const AppDataSource_1 = require("../../AppDataSource");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
exports.loginOrRegisterDAL = {
    loginDAL: async (loginData) => {
        const { email, phoneNumber } = loginData;
        let checkUser;
        if (email) {
            checkUser = await AppDataSource_1.AppDataSource.manager.findOneBy(User_1.User, { email });
        }
        else {
            checkUser = await AppDataSource_1.AppDataSource.manager.findOneBy(User_1.User, { phoneNumber });
        }
        if (!checkUser) {
            return { status: serverStatus_1.serverStatus.NotFound, data: {}, msg: serverMSG_1.serverMSG.NotFound };
        }
        else {
            return { status: serverStatus_1.serverStatus.Success, data: checkUser, msg: serverMSG_1.serverMSG.Success };
        }
    },
    registerDAL: async (registerData) => {
        const { fullName, email, phoneNumber, password } = registerData;
        try {
            const newUser = AppDataSource_1.AppDataSource.manager.create(User_1.User, {
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                password: password,
                isStaff: false
            });
            try {
                await newUser.save();
                return {
                    status: serverStatus_1.serverStatus.Created,
                    data: newUser,
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
            console.error(`Error in ${exports.loginOrRegisterDAL.registerDAL.name} Message: ${error.message}`, {
                functionName: exports.loginOrRegisterDAL.registerDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
};
//# sourceMappingURL=loginOrRegisterDAL.js.map