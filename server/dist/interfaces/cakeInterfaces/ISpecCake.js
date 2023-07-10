"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isISpacCake = void 0;
const isISpacCake = (obj) => {
    return (obj &&
        (obj.name !== undefined ||
            obj.shortDescription !== undefined ||
            obj.longDescription !== undefined ||
            obj.price !== undefined ||
            obj.imageUrl !== undefined));
};
exports.isISpacCake = isISpacCake;
//# sourceMappingURL=ISpecCake.js.map