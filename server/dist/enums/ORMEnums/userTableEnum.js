"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTableEnumConfig = exports.userTableEnumMSG = exports.userTableEnum = void 0;
var userTableEnum;
(function (userTableEnum) {
    userTableEnum["Username"] = "Username";
    userTableEnum["Email"] = "Email";
    userTableEnum["FullName"] = "Full name";
    userTableEnum["phoneNumber"] = "Phone Number";
    userTableEnum["Password"] = "Password";
    userTableEnum["Staff"] = "Staff";
})(userTableEnum = exports.userTableEnum || (exports.userTableEnum = {}));
var userTableEnumMSG;
(function (userTableEnumMSG) {
    userTableEnumMSG["Invalid"] = "invalid";
    userTableEnumMSG["IsRequired"] = "is required.";
    userTableEnumMSG["MustBeBetWeen1_100"] = "must be between 1 and 100 characters long.";
    userTableEnumMSG["PhoneNumber"] = "Israeli phone number.";
    userTableEnumMSG["EmailFormat"] = "email format.";
    userTableEnumMSG["ValidPassword"] = "must be at least 8 characters long and contain at least one upper and one lower case letters and two digits.";
    userTableEnumMSG["Staff"] = "Staff";
})(userTableEnumMSG = exports.userTableEnumMSG || (exports.userTableEnumMSG = {}));
var userTableEnumConfig;
(function (userTableEnumConfig) {
    userTableEnumConfig[userTableEnumConfig["MinLengthPassword"] = 8] = "MinLengthPassword";
    userTableEnumConfig[userTableEnumConfig["MinLowercasePassword"] = 1] = "MinLowercasePassword";
    userTableEnumConfig[userTableEnumConfig["MinUppercasePassword"] = 1] = "MinUppercasePassword";
    userTableEnumConfig[userTableEnumConfig["MinNumbersPassword"] = 2] = "MinNumbersPassword";
    userTableEnumConfig[userTableEnumConfig["MinSymbolsPassword"] = 0] = "MinSymbolsPassword";
})(userTableEnumConfig = exports.userTableEnumConfig || (exports.userTableEnumConfig = {}));
//# sourceMappingURL=userTableEnum.js.map