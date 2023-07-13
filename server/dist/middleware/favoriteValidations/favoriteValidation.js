"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteValidation = void 0;
const zod_1 = require("zod");
exports.favoriteValidation = zod_1.z.object({
    user: zod_1.z.number(),
    cake: zod_1.z.number()
});
//# sourceMappingURL=favoriteValidation.js.map