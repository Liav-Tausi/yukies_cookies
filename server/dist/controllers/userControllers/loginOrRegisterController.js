"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOrRegisterController = void 0;
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const loginOrRegisterHandler_1 = require("../../handlers/userHandlers/loginOrRegisterHandler");
const loginOrRgisterDataValidation_1 = require("../../middleware/userValidations/loginOrRgisterDataValidation");
const zodErrorHandling_1 = require("../../middleware/zodErrorHandling");
exports.loginOrRegisterController = {
    loginController: async (req, res) => {
        try {
            const initialLoginData = req.body;
            const loginData = loginOrRgisterDataValidation_1.loginValidation.parse(initialLoginData);
            const handlerResult = await loginOrRegisterHandler_1.loginOrRegisterHandler.loginHandler(loginData);
            const serverResultStatus = handlerResult.status;
            res.status(serverResultStatus === serverStatus_1.serverStatus.Success
                ? serverStatus_1.serverStatus.Success
                : serverResultStatus === serverStatus_1.serverStatus.NotFound
                    ? serverStatus_1.serverStatus.NotFound
                    : serverStatus_1.serverStatus.Unauthorized).json(handlerResult);
        }
        catch (error) {
            console.error(error.stack);
            (0, zodErrorHandling_1.zodErrorHandling)(error, res);
        }
    },
    registerController: async (req, res) => {
        try {
            const initialRegisterData = req.body;
            const registerData = loginOrRgisterDataValidation_1.registerValidation.parse(initialRegisterData);
            const handlerResult = await loginOrRegisterHandler_1.loginOrRegisterHandler.registerHandler(registerData);
            const serverResultStatus = handlerResult.status;
            res.status(serverResultStatus === serverStatus_1.serverStatus.Created
                ? serverStatus_1.serverStatus.Created
                : serverStatus_1.serverStatus.RequestFail).json(handlerResult);
        }
        catch (error) {
            console.error(error.stack);
            (0, zodErrorHandling_1.zodErrorHandling)(error, res);
        }
    },
};
//# sourceMappingURL=loginOrRegisterController.js.map