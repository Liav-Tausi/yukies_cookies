"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isICartItem = void 0;
const isICartItem = (obj) => {
    return (obj && (obj.cart !== undefined || obj.cake !== undefined || obj.quantity !== undefined));
};
exports.isICartItem = isICartItem;
//# sourceMappingURL=ICartItem.js.map