"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderItemsTableEnumConfig = exports.orderItemsTableEnumMSG = exports.orderItemsTableEnum = void 0;
var orderItemsTableEnum;
(function (orderItemsTableEnum) {
    orderItemsTableEnum["OrderItem"] = "OrderItem";
    orderItemsTableEnum["Price"] = "Price";
})(orderItemsTableEnum = exports.orderItemsTableEnum || (exports.orderItemsTableEnum = {}));
var orderItemsTableEnumMSG;
(function (orderItemsTableEnumMSG) {
    orderItemsTableEnumMSG["Min"] = "must be greater than or equal to";
})(orderItemsTableEnumMSG = exports.orderItemsTableEnumMSG || (exports.orderItemsTableEnumMSG = {}));
var orderItemsTableEnumConfig;
(function (orderItemsTableEnumConfig) {
    orderItemsTableEnumConfig[orderItemsTableEnumConfig["MinTotalAmount"] = 1] = "MinTotalAmount";
    orderItemsTableEnumConfig[orderItemsTableEnumConfig["MaxTotalAmount"] = 99999] = "MaxTotalAmount";
    orderItemsTableEnumConfig[orderItemsTableEnumConfig["MinQuantity"] = 1] = "MinQuantity";
    orderItemsTableEnumConfig[orderItemsTableEnumConfig["MaxQuantity"] = 9999] = "MaxQuantity";
    orderItemsTableEnumConfig[orderItemsTableEnumConfig["MinPrice"] = 0] = "MinPrice";
    orderItemsTableEnumConfig[orderItemsTableEnumConfig["MaxPrice"] = 9999] = "MaxPrice";
})(orderItemsTableEnumConfig = exports.orderItemsTableEnumConfig || (exports.orderItemsTableEnumConfig = {}));
//# sourceMappingURL=orderItemTableEnum.js.map