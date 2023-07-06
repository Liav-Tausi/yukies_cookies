"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.zodErrorHandling = void 0;
const zod_1 = require("zod");
const serverStatus_1 = require("../enums/serverStatusesEnums/serverStatus");
const serverMSG_1 = require("../enums/serverStatusesEnums/serverMSG");
const zodErrorHandling = (error, res) => {
    if (error instanceof zod_1.ZodError) {
        let validationErrors = [];
        error.errors.forEach((validationError) => validationErrors.push(validationError.message));
        res.status(serverStatus_1.serverStatus.RequestFail).json({
            status: serverMSG_1.serverMSG.RequestFail,
            msg: validationErrors,
        });
    }
    else {
        res.status(serverStatus_1.serverStatus.ServerFail).json({
            status: serverMSG_1.serverMSG.ServerFail,
            msg: error.message,
        });
    }
};
exports.zodErrorHandling = zodErrorHandling;
//# sourceMappingURL=zodErrorHandling.js.map