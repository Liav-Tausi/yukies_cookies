"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOrRegisterHandler = void 0;
const loginOrRegisterDAL_1 = require("../../DAL/userDAL/loginOrRegisterDAL");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const IUser_1 = require("../../interfaces/userInterfaces/IUser");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppDataSource_1 = require("../../AppDataSource");
const User_1 = require("../../entities/User");
const validateDAL_1 = require("../../middleware/validateDAL");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
dotenv_1.default.config();
const jwt_secret = process.env.JWT_SECRET;
const generateAccessToken = (userData) => {
    return jsonwebtoken_1.default.sign({ email: userData.email, password: userData.password }, jwt_secret, { expiresIn: '5m' });
};
const generateRefreshToken = (userData) => {
    return jsonwebtoken_1.default.sign({ email: userData.email, password: userData.password }, jwt_secret, { expiresIn: '30d' });
};
exports.loginOrRegisterHandler = {
    loginHandler: async (loginData) => {
        const { password } = loginData;
        const dalResult = await loginOrRegisterDAL_1.loginOrRegisterDAL.loginDAL(loginData);
        if ((0, IUser_1.isIUser)(dalResult.data)) {
            if (await bcrypt_1.default.compare(password, dalResult.data.password)) {
                return {
                    status: serverStatus_1.serverStatus.Success,
                    data: { refreshToken: generateRefreshToken(dalResult.data), accessToken: generateAccessToken(dalResult.data) },
                    msg: serverMSG_1.serverMSG.Success
                };
            }
            else if (dalResult.status === serverStatus_1.serverStatus.NotFound) {
                return { status: serverStatus_1.serverStatus.NotFound, data: {}, msg: serverMSG_1.serverMSG.NotFound };
            }
            else {
                return { status: serverStatus_1.serverStatus.Unauthorized, data: {}, msg: serverMSG_1.serverMSG.Unauthorized };
            }
        }
    },
    registerHandler: async (registerData) => {
        const { fullName, email, phoneNumber, password } = registerData;
        const validateUser = AppDataSource_1.AppDataSource.manager.create(User_1.User, { fullName, email, phoneNumber, password, isStaff: false });
        const validationResult = await (0, validateDAL_1.validationDAL)(validateUser);
        if (!validationResult) {
            registerData.password = await bcrypt_1.default.hash(password, 10);
            const dalResult = await loginOrRegisterDAL_1.loginOrRegisterDAL.registerDAL(registerData);
            if (dalResult.status === serverStatus_1.serverStatus.Created && (0, IUser_1.isIUser)(dalResult.data)) {
                return {
                    status: serverStatus_1.serverStatus.Created,
                    data: { refreshToken: generateRefreshToken(dalResult.data), accessToken: generateAccessToken(dalResult.data) },
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
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: validationResult,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    },
};
//# sourceMappingURL=loginOrRegisterHandler.js.map