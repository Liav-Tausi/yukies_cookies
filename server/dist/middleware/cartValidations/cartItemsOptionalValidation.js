"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemsOptionalValidation = void 0;
const zod_1 = require("zod");
const cartItemsTableEnum_1 = require("../../enums/ORMEnums/cartItemsTableEnum");
exports.cartItemsOptionalValidation = zod_1.z.object({
    user: zod_1.z.number().optional(),
    cart: zod_1.z.number().optional(),
    cake: zod_1.z.number().optional(),
    quantity: zod_1.z.number().min(cartItemsTableEnum_1.cartItemsTableEnumConfig.MinQuantity).max(cartItemsTableEnum_1.cartItemsTableEnumConfig.MaxQuantity).optional()
});
//# sourceMappingURL=cartItemsOptionalValidation.js.map