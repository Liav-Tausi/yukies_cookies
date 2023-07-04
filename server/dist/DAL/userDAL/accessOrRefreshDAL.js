"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessOrRefreshDAL = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../../entities/User");
const AppDataSource_1 = require("../../AppDataSource");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
const validateDAL_1 = require("../../middleware/validateDAL");
exports.accessOrRefreshDAL = {
    loginDAL: async (loginData) => {
        const { email, phoneNumber, password } = loginData;
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
            if (await bcrypt_1.default.compare(password, checkUser.password)) {
                return { status: serverStatus_1.serverStatus.Success, data: checkUser, msg: serverMSG_1.serverMSG.Success };
            }
            else {
                return { status: serverStatus_1.serverStatus.Unauthorized, data: {}, msg: serverMSG_1.serverMSG.Unauthorized };
            }
        }
    },
    registerDAL: async (registerData) => {
        const { fullName, email, phoneNumber, password } = registerData;
        const hashedPasswordWithSalt = await bcrypt_1.default.hash(password, 10);
        const validateUser = AppDataSource_1.AppDataSource.manager.create(User_1.User, {
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            password: password,
            isStaff: false
        });
        try {
            const validationResult = await (0, validateDAL_1.validationDAL)(validateUser);
            const newUser = AppDataSource_1.AppDataSource.manager.create(User_1.User, {
                fullName: fullName,
                email: email,
                phoneNumber: phoneNumber,
                password: hashedPasswordWithSalt,
                isStaff: false
            });
            if (!validationResult) {
                try {
                    await newUser.save();
                }
                catch (error) {
                    return {
                        status: serverStatus_1.serverStatus.RequestFail,
                        data: error.detail
                    };
                }
            }
            return {
                status: !validationResult ? serverStatus_1.serverStatus.Success : serverStatus_1.serverStatus.RequestFail,
                data: !validationResult ? newUser : validationResult,
                msg: !validationResult ? serverMSG_1.serverMSG.Success : serverMSG_1.serverMSG.RequestFail
            };
        }
        catch (error) {
            console.error(`Error in ${exports.accessOrRefreshDAL.registerDAL.name} Message: ${error.message}`, {
                functionName: exports.accessOrRefreshDAL.registerDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
};
//# sourceMappingURL=accessOrRefreshDAL.js.map