"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessOrRefreshHandler = void 0;
const accessOrRefreshDAL_1 = require("../../DAL/userDAL/accessOrRefreshDAL");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwt_secret = process.env.JWT_SECRET;
const generateAccessToken = (accessData) => {
    return jsonwebtoken_1.default.sign(accessData, jwt_secret, { expiresIn: '5m' });
};
const generateRefreshToken = (userData) => {
    return jsonwebtoken_1.default.sign({ email: userData.email, password: userData.password }, jwt_secret, { expiresIn: '30d' });
};
exports.accessOrRefreshHandler = {
    loginHandler: async (loginData) => {
        const retVal = await accessOrRefreshDAL_1.accessOrRefreshDAL.loginDAL(loginData);
        // if (retVal) {return generateRefreshToken(loginData)}
    },
    registerHandler: async (registerData) => {
        const retVal = await accessOrRefreshDAL_1.accessOrRefreshDAL.registerDAL(registerData);
        return generateRefreshToken(retVal);
    },
};
//# sourceMappingURL=accessOrRefreshHandler.js.map