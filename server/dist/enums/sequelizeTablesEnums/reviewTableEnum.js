"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewTableEnumMSG = exports.reviewTableEnum = void 0;
var reviewTableEnum;
(function (reviewTableEnum) {
    reviewTableEnum["Review"] = "Review";
    reviewTableEnum["LongDescription"] = "Long Description";
})(reviewTableEnum || (exports.reviewTableEnum = reviewTableEnum = {}));
var reviewTableEnumMSG;
(function (reviewTableEnumMSG) {
    reviewTableEnumMSG["Invalid"] = "invalid";
    reviewTableEnumMSG["IsRequired"] = "is required.";
    reviewTableEnumMSG["MustBeBetWeen1_600"] = "must be between 1 and 600 characters long.";
    reviewTableEnumMSG["Min"] = "must be greater than or equal to";
    reviewTableEnumMSG["Max"] = "must be less than or equal to";
})(reviewTableEnumMSG || (exports.reviewTableEnumMSG = reviewTableEnumMSG = {}));
//# sourceMappingURL=reviewTableEnum.js.map