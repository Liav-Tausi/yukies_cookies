"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userTableEnumMSG = exports.userTableEnum = void 0;
var userTableEnum;
(function (userTableEnum) {
    userTableEnum["Username"] = "Username";
    userTableEnum["Email"] = "Email";
    userTableEnum["FullName"] = "Full name";
    userTableEnum["phoneNumber"] = "Phone Number";
    userTableEnum["Password"] = "Password";
    userTableEnum["Staff"] = "Staff";
})(userTableEnum || (exports.userTableEnum = userTableEnum = {}));
var userTableEnumMSG;
(function (userTableEnumMSG) {
    userTableEnumMSG["Invalid"] = "invalid";
    userTableEnumMSG["IsRequired"] = "is required.";
    userTableEnumMSG["MustBeBetWeen1_100"] = "must be between 1 and 100 characters long.";
    userTableEnumMSG["PhoneNumber"] = "Israeli phone number.";
    userTableEnumMSG["EmailFormat"] = "email format.";
    userTableEnumMSG["ValidPassword"] = "must be at least 8 characters long and contain at least one letter and one digit.";
    userTableEnumMSG["Staff"] = "Staff";
})(userTableEnumMSG || (exports.userTableEnumMSG = userTableEnumMSG = {}));
//# sourceMappingURL=userTableEnum.js.map