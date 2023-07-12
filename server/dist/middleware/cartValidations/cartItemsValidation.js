"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemsValidation = void 0;
const zod_1 = require("zod");
const cartItemsTableEnum_1 = require("../../enums/ORMEnums/cartItemsTableEnum");
exports.cartItemsValidation = zod_1.z.object({
    user: zod_1.z.number().optional(),
    cart: zod_1.z.number().optional(),
    cake: zod_1.z.number(),
    quantity: zod_1.z.number().min(cartItemsTableEnum_1.cartItemsTableEnumConfig.MinQuantity).max(cartItemsTableEnum_1.cartItemsTableEnumConfig.MaxQuantity)
});
//# sourceMappingURL=cartItemsValidation.js.map