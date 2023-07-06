"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const zod_1 = require("zod");
const validator_1 = __importDefault(require("validator"));
exports.registerValidation = zod_1.z.object({
    email: zod_1.z.string().email().refine(Boolean, { message: "Email is required" }),
    fullName: zod_1.z.string().regex(/^[A-Za-z]+\s[A-Za-z]+$/, {
        message: "Invalid full name format"
    }).refine(Boolean, { message: "Full name is required" }),
    phoneNumber: zod_1.z.string().refine((value) => validator_1.default.isMobilePhone(value, "he-IL"), {
        message: "Invalid israeli phone number"
    }).refine(Boolean, { message: "Israeli phone number is required" }),
    address: zod_1.z.string(),
    password: zod_1.z.string().regex(/^(?=.*\d.*\d)(?=.*[A-Z]).{8,}$/, {
        message: "Invalid password format!, must have at list 8 characters, 1 uppercase, 2 digits"
    }).refine(Boolean, { message: "Password is required" }),
});
exports.loginValidation = zod_1.z.object({
    email: zod_1.z.string().email().optional(),
    phoneNumber: zod_1.z
        .string()
        .refine((value) => validator_1.default.isMobilePhone(value, "he-IL"), { message: "Invalid Israeli phone number" })
        .optional(),
    password: zod_1.z.string().regex(/^(?=.*\d.*\d)(?=.*[A-Z]).{8,}$/, {
        message: "Invalid password format!, must have at list 8 characters, 1 uppercase, 2 digits"
    }).refine(Boolean, { message: "Password is required" }),
});
//# sourceMappingURL=loginOrRgisterDataValidation.js.map