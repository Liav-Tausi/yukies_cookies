"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isISpecUser = void 0;
const isISpecUser = (obj) => {
    return (obj && (obj.fullName !== undefined || obj.email !== undefined || obj.phoneNumber !== undefined));
};
exports.isISpecUser = isISpecUser;
//# sourceMappingURL=ISpecUser.js.map