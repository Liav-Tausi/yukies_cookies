"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isISpecCake = void 0;
const isISpecCake = (obj) => {
    return (obj &&
        (obj.name !== undefined ||
            obj.shortDescription !== undefined ||
            obj.longDescription !== undefined ||
            obj.price !== undefined ||
            obj.imageUrl !== undefined));
};
exports.isISpecCake = isISpecCake;
//# sourceMappingURL=ISpecCake.js.map