"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOrRegisterController = void 0;
const loginOrRegisterHandler_1 = require("../../handlers/userHandlers/loginOrRegisterHandler");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
exports.loginOrRegisterController = {
    loginController: async (req, res) => {
        try {
            const loginData = req.body;
            loginOrRegisterHandler_1.loginOrRegisterHandler.loginHandler(loginData);
            res.status(serverStatus_1.serverStatus.Success).json({
                status: serverMSG_1.serverMSG.Success,
            });
        }
        catch (error) {
            console.error(`${serverMSG_1.serverErrorMSG.loginControllerERROR} ${error.stack}`);
            res.status(serverStatus_1.serverStatus.ServerFail).json({
                status: serverMSG_1.serverMSG.ServerFail,
                msg: error.message
            });
        }
    },
    registerController: async (req, res) => {
        try {
            const registerData = req.body;
            loginOrRegisterHandler_1.loginOrRegisterHandler.registerHandler(registerData);
            res.status(serverStatus_1.serverStatus.Success).json({
                status: serverMSG_1.serverMSG.Success,
            });
        }
        catch (error) {
            console.error(`${serverMSG_1.serverErrorMSG.registerControllerERROR} ${error.stack}`);
            res.status(serverStatus_1.serverStatus.ServerFail).json({
                status: serverMSG_1.serverMSG.ServerFail,
                msg: error.message
            });
        }
    },
};
//# sourceMappingURL=loginOrRegisterController.js.map