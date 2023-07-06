"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validationDAL = void 0;
const class_validator_1 = require("class-validator");
const serverStatus_1 = require("../enums/serverStatusesEnums/serverStatus");
const validationDAL = async (values) => {
    const validationErrors = await (0, class_validator_1.validate)(values);
    if (validationErrors.length > 0) {
        return {
            status: serverStatus_1.serverStatus.RequestFail,
            data: validationErrors.map((error) => { return error.property; })
        };
    }
    else {
        return {
            status: serverStatus_1.serverStatus.Success,
        };
    }
};
exports.validationDAL = validationDAL;
//# sourceMappingURL=validateDAL.js.map