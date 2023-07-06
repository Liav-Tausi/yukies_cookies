"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOrRegisterController = void 0;
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
const loginOrRegisterHandler_1 = require("../../handlers/userHandlers/loginOrRegisterHandler");
const loginOrRgisterDataValidation_1 = require("../../middleware/loginOrRgisterDataValidation");
const zod_1 = require("zod");
exports.loginOrRegisterController = {
    loginController: async (req, res) => {
        try {
            const loginData = loginOrRgisterDataValidation_1.loginValidation.parse(req.body);
            const handlerResult = await loginOrRegisterHandler_1.loginOrRegisterHandler.loginHandler(loginData);
            const serverResultData = handlerResult.data;
            const serverResultStatus = handlerResult.status;
            res.status(serverResultStatus === serverStatus_1.serverStatus.Success
                ? serverStatus_1.serverStatus.Success
                : serverResultStatus === serverStatus_1.serverStatus.NotFound
                    ? serverStatus_1.serverStatus.NotFound
                    : serverStatus_1.serverStatus.Unauthorized).json({
                status: serverResultStatus ? serverResultStatus : serverStatus_1.serverStatus.Unauthorized,
                data: serverResultData.refreshToken && serverResultData.accessToken
                    ? serverResultData
                    : serverResultData.data ?? serverResultData,
                msg: handlerResult.msg,
            });
        }
        catch (error) {
            console.error(`${serverMSG_1.serverErrorMSG.loginControllerERROR} ${error.stack}`);
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
        }
    },
    registerController: async (req, res) => {
        try {
            const registerData = loginOrRgisterDataValidation_1.registerValidation.parse(req.body);
            const handlerResult = await loginOrRegisterHandler_1.loginOrRegisterHandler.registerHandler(registerData);
            const serverResultData = handlerResult.data;
            const serverResultStatus = handlerResult.status;
            res.status(serverResultStatus === serverStatus_1.serverStatus.Created
                ? serverStatus_1.serverStatus.Created
                : serverStatus_1.serverStatus.RequestFail).json({
                status: serverResultStatus ? serverResultStatus : serverStatus_1.serverStatus.RequestFail,
                data: serverResultData.refreshToken && serverResultData.accessToken ?
                    serverResultData : serverResultData.data ? serverMSG_1.serverErrorMSG.InvalidFields + serverResultData.data : serverResultData,
                msg: handlerResult.msg
            });
        }
        catch (error) {
            console.error(`${serverMSG_1.serverErrorMSG.registerControllerERROR} ${error.stack}`);
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
        }
    },
};
//# sourceMappingURL=loginOrRegisterController.js.map