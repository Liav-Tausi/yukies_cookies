"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderTableEnumConfig = exports.orderTableEnumMSG = exports.orderTableEnum = void 0;
var orderTableEnum;
(function (orderTableEnum) {
    orderTableEnum["Order"] = "Order";
})(orderTableEnum = exports.orderTableEnum || (exports.orderTableEnum = {}));
var orderTableEnumMSG;
(function (orderTableEnumMSG) {
    orderTableEnumMSG["timeMustBe"] = "time must be later than the current time.";
    orderTableEnumMSG["Min"] = "must be greater than or equal to";
})(orderTableEnumMSG = exports.orderTableEnumMSG || (exports.orderTableEnumMSG = {}));
var orderTableEnumConfig;
(function (orderTableEnumConfig) {
    orderTableEnumConfig[orderTableEnumConfig["MinTotalAmount"] = 1] = "MinTotalAmount";
    orderTableEnumConfig[orderTableEnumConfig["MaxTotalAmount"] = 99999] = "MaxTotalAmount";
})(orderTableEnumConfig = exports.orderTableEnumConfig || (exports.orderTableEnumConfig = {}));
//# sourceMappingURL=orderTableEnum.js.map