"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogValidation = void 0;
const zod_1 = require("zod");
const cakeTableEnum_1 = require("../../enums/ORMEnums/cakeTableEnum");
exports.catalogValidation = zod_1.z.object({
    name: zod_1.z.string().min(cakeTableEnum_1.cakeTableEnumConfig.MinLengthName).max(cakeTableEnum_1.cakeTableEnumConfig.MaxLengthName),
    shortDescription: zod_1.z.string().min(cakeTableEnum_1.cakeTableEnumConfig.MinLengthShortDescription).max(cakeTableEnum_1.cakeTableEnumConfig.MaxLengthShortDescription),
    longDescription: zod_1.z.string().min(cakeTableEnum_1.cakeTableEnumConfig.MinLengthLongDescription).max(cakeTableEnum_1.cakeTableEnumConfig.MaxLengthLongDescription),
    price: zod_1.z.number().min(cakeTableEnum_1.cakeTableEnumConfig.MinPrice).max(cakeTableEnum_1.cakeTableEnumConfig.MaxPrice),
    imageUrl: zod_1.z.string().url("invalid url string")
});
//# sourceMappingURL=catalogValidation.js.map