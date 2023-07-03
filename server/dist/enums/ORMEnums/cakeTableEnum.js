"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cakeTableEnumConfig = exports.cakeTableEnumMSG = exports.cakeTableEnum = void 0;
var cakeTableEnum;
(function (cakeTableEnum) {
    cakeTableEnum["Name"] = "Name";
    cakeTableEnum["ShortDescription"] = "Short Description";
    cakeTableEnum["LongDescription"] = "Long Description";
    cakeTableEnum["Price"] = "Price";
})(cakeTableEnum = exports.cakeTableEnum || (exports.cakeTableEnum = {}));
var cakeTableEnumMSG;
(function (cakeTableEnumMSG) {
    cakeTableEnumMSG["Invalid"] = "invalid";
    cakeTableEnumMSG["IsRequired"] = "is required.";
    cakeTableEnumMSG["MustBeBetWeen1_100"] = "must be between 1 and 100 characters long.";
    cakeTableEnumMSG["MustBeBetWeen1_600"] = "must be between 1 and 600 characters long.";
    cakeTableEnumMSG["Max"] = "must be less than or equal to";
    cakeTableEnumMSG["Min"] = "must be greater than or equal to";
})(cakeTableEnumMSG = exports.cakeTableEnumMSG || (exports.cakeTableEnumMSG = {}));
var cakeTableEnumConfig;
(function (cakeTableEnumConfig) {
    cakeTableEnumConfig[cakeTableEnumConfig["MinLengthName"] = 1] = "MinLengthName";
    cakeTableEnumConfig[cakeTableEnumConfig["MaxLengthName"] = 20] = "MaxLengthName";
    cakeTableEnumConfig[cakeTableEnumConfig["MinLengthShortDescription"] = 1] = "MinLengthShortDescription";
    cakeTableEnumConfig[cakeTableEnumConfig["MaxLengthShortDescription"] = 150] = "MaxLengthShortDescription";
    cakeTableEnumConfig[cakeTableEnumConfig["MinLengthLongDescription"] = 1] = "MinLengthLongDescription";
    cakeTableEnumConfig[cakeTableEnumConfig["MaxLengthLongDescription"] = 600] = "MaxLengthLongDescription";
    cakeTableEnumConfig[cakeTableEnumConfig["MinPrice"] = 0] = "MinPrice";
    cakeTableEnumConfig[cakeTableEnumConfig["MaxPrice"] = 99999] = "MaxPrice";
})(cakeTableEnumConfig = exports.cakeTableEnumConfig || (exports.cakeTableEnumConfig = {}));
//# sourceMappingURL=cakeTableEnum.js.map