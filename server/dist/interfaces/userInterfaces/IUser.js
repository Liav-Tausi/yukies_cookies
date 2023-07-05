"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIUser = void 0;
const isIUser = (obj) => {
    return obj && obj.fullName && obj.email && obj.phoneNumber && obj.password;
};
exports.isIUser = isIUser;
//# sourceMappingURL=IUser.js.map