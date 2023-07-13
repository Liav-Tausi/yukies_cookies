"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteOptionalValidation = void 0;
const zod_1 = require("zod");
exports.favoriteOptionalValidation = zod_1.z.object({
    user: zod_1.z.number().optional(),
    cake: zod_1.z.number().optional()
});
//# sourceMappingURL=favoriteOptionalValidation.js.map