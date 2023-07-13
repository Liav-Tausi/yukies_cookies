"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidation = void 0;
const zod_1 = require("zod");
const reviewTableEnum_1 = require("../../enums/ORMEnums/reviewTableEnum");
exports.reviewValidation = zod_1.z.object({
    user: zod_1.z.number(),
    cake: zod_1.z.number(),
    rating: zod_1.z.number().min(reviewTableEnum_1.reviewTableEnumConfig.MinRating).max(reviewTableEnum_1.reviewTableEnumConfig.MaxRating),
    comment: zod_1.z.string().min(reviewTableEnum_1.reviewTableEnumConfig.MinCommentLength).max(reviewTableEnum_1.reviewTableEnumConfig.MaxCommentLength)
});
//# sourceMappingURL=reviewValidation.js.map