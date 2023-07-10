"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userOptionalValidation = void 0;
const validator_1 = __importDefault(require("validator"));
const zod_1 = require("zod");
exports.userOptionalValidation = zod_1.z.object({
    id: zod_1.z.number().optional(),
    fullName: zod_1.z.string().regex(/^[A-Za-z]+\s[A-Za-z]+$/).optional(),
    email: zod_1.z.string().email().optional(),
    phoneNumber: zod_1.z.string().refine((value) => validator_1.default.isMobilePhone(value, "he-IL")).optional()
});
//# sourceMappingURL=userOptionalValidation.js.map