"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isISpecReview = void 0;
const isISpecReview = (obj) => {
    return obj && (obj.user !== undefined || obj.cake !== undefined || obj.rating !== undefined || obj.comment !== undefined);
};
exports.isISpecReview = isISpecReview;
//# sourceMappingURL=ISpecReview.js.map