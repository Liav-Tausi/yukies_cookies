"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartOptionalValidation = void 0;
const zod_1 = require("zod");
exports.cartOptionalValidation = zod_1.z.object({
    user: zod_1.z.number().optional()
});
//# sourceMappingURL=cartOptionalValidation.js.map