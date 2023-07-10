"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userValidation = void 0;
const validator_1 = __importDefault(require("validator"));
const zod_1 = require("zod");
exports.userValidation = zod_1.z.object({
    fullName: zod_1.z.string().regex(/^[A-Za-z]+\s[A-Za-z]+$/),
    email: zod_1.z.string().email(),
    phoneNumber: zod_1.z.string().refine((value) => validator_1.default.isMobilePhone(value, "he-IL"))
});
//# sourceMappingURL=userValidation.js.map