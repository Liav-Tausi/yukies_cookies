"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isISpecCartItems = void 0;
const isISpecCartItems = (obj) => {
    return (obj && (obj.cart !== undefined || obj.cake !== undefined || obj.quantity !== undefined));
};
exports.isISpecCartItems = isISpecCartItems;
//# sourceMappingURL=ISpecCartItems.js.map