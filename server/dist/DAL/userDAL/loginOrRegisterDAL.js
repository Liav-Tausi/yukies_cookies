"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOrRegisterDAL = void 0;
const crypto_1 = require("crypto");
const bcrypt_1 = __importDefault(require("bcrypt"));
const AppDataSource_1 = require("../../AppDataSource");
const User_1 = require("../../entities/User");
exports.loginOrRegisterDAL = {
    loginDAL: async (loginData) => {
    },
    registerDAL: async (registerData) => {
        const { fullName, email, phoneNumber, password } = registerData;
        const hashedPassword = (0, crypto_1.createHash)('sha256').update(password).digest('hex');
        const hashedPasswordWithSalt = await bcrypt_1.default.hash(hashedPassword, 10);
        const user = await AppDataSource_1.AppDataSource.createQueryBuilder().insert().into(User_1.User).values({
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            password: hashedPasswordWithSalt,
            isStaff: false
        }).execute();
    },
};
//# sourceMappingURL=loginOrRegisterDAL.js.map