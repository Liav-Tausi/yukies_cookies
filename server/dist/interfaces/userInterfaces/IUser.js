"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isIUser = void 0;
const isIUser = (value) => {
    if (typeof value !== 'object' || value === null) {
        return false;
    }
    const requiredProperties = [
        'fullName',
        'email',
        'phoneNumber',
        'password',
        'isStaff',
        'id',
        'createdAt',
        'updatedAt',
    ];
    return requiredProperties.every((property) => Object.prototype.hasOwnProperty.call(value, property));
};
exports.isIUser = isIUser;
//# sourceMappingURL=IUser.js.map