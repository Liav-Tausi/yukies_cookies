"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.regexValidations = void 0;
var regexValidations;
(function (regexValidations) {
    regexValidations["UserPassword"] = "/^(?=.*[A-Za-z])(?=.*d)[A-Za-zd]{8,}$/i";
    regexValidations["PhoneNumber"] = "/^(?:+972|0)(?:-|s)?(?:d{1})?(?:-|s)?(?:d{3})?(?:-|s)?(?:d{3})?(?:-|s)?(?:d{2})?(?:-|s)?(?:d{2})?$/";
    regexValidations["FullName"] = "/^[a-zA-Z]+(?:s[a-zA-Z]+)+$/";
})(regexValidations || (exports.regexValidations = regexValidations = {}));
//# sourceMappingURL=regexValidations.js.map