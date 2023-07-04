"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessOrRefreshHandler = void 0;
const accessOrRefreshDAL_1 = require("../../DAL/userDAL/accessOrRefreshDAL");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const IUser_1 = require("../../interfaces/userInterfaces/IUser");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
dotenv_1.default.config();
const jwt_secret = process.env.JWT_SECRET;
const generateAccessToken = (userData) => {
    return jsonwebtoken_1.default.sign({ email: userData.email, password: userData.password }, jwt_secret, { expiresIn: '5m' });
};
const generateRefreshToken = (userData) => {
    return jsonwebtoken_1.default.sign({ email: userData.email, password: userData.password }, jwt_secret, { expiresIn: '30d' });
};
exports.accessOrRefreshHandler = {
    loginHandler: async (loginData) => {
        const dalResult = await accessOrRefreshDAL_1.accessOrRefreshDAL.loginDAL(loginData);
        return {
            status: dalResult.status === serverStatus_1.serverStatus.Success ? serverStatus_1.serverStatus.Success :
                dalResult.status === serverStatus_1.serverStatus.NotFound ? serverStatus_1.serverStatus.NotFound : serverStatus_1.serverStatus.Unauthorized,
            data: (0, IUser_1.isIUser)(dalResult.data) ? {
                refreshToken: generateRefreshToken(dalResult.data),
                accessToken: generateAccessToken(dalResult.data)
            } : dalResult.data,
            msg: dalResult.msg
        };
    },
    registerHandler: async (registerData) => {
        const dalResult = await accessOrRefreshDAL_1.accessOrRefreshDAL.registerDAL(registerData);
        return {
            status: dalResult.status === serverStatus_1.serverStatus.Success ? serverStatus_1.serverStatus.Success : serverStatus_1.serverStatus.RequestFail,
            data: (0, IUser_1.isIUser)(dalResult.data) ? {
                refreshToken: generateRefreshToken(dalResult.data),
                accessToken: generateAccessToken(dalResult.data)
            } : dalResult.data,
            msg: dalResult.msg
        };
    },
};
//# sourceMappingURL=accessOrRefreshHandler.js.map