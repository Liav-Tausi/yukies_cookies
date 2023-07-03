"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessOrRefreshDAL = void 0;
const crypto_1 = require("crypto");
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = require("../../entities/User");
const AppDataSource_1 = require("../../AppDataSource");
exports.accessOrRefreshDAL = {
    loginDAL: async (loginData) => {
    },
    registerDAL: async (registerData) => {
        const { fullName, email, phoneNumber, password } = registerData;
        const hashedPassword = (0, crypto_1.createHash)('sha256').update(password).digest('hex');
        const hashedPasswordWithSalt = await bcrypt_1.default.hash(hashedPassword, 10);
        const insertedUser = AppDataSource_1.AppDataSource.manager.create(User_1.User, {
            fullName: fullName,
            email: email,
            phoneNumber: phoneNumber,
            password: hashedPasswordWithSalt,
            isStaff: false
        });
        await insertedUser.save();
        return insertedUser;
    },
};
//# sourceMappingURL=accessOrRefreshDAL.js.map