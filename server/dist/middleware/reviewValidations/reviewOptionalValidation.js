"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewOptionalValidation = void 0;
const zod_1 = require("zod");
const reviewTableEnum_1 = require("../../enums/ORMEnums/reviewTableEnum");
exports.reviewOptionalValidation = zod_1.z.object({
    user: zod_1.z.number().optional(),
    cake: zod_1.z.number().optional(),
    rating: zod_1.z.number().min(reviewTableEnum_1.reviewTableEnumConfig.MinRating).max(reviewTableEnum_1.reviewTableEnumConfig.MaxRating).optional(),
    comment: zod_1.z.string().min(reviewTableEnum_1.reviewTableEnumConfig.MinCommentLength).max(reviewTableEnum_1.reviewTableEnumConfig.MaxCommentLength).optional()
});
//# sourceMappingURL=reviewOptionalValidation.js.map