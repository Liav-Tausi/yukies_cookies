"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessOrRefreshController = void 0;
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
const accessOrRefreshHandler_1 = require("../../handlers/userHandlers/accessOrRefreshHandler");
exports.accessOrRefreshController = {
    loginController: async (req, res) => {
        try {
            const loginData = req.body;
            accessOrRefreshHandler_1.accessOrRefreshHandler.loginHandler(loginData);
            res.status(serverStatus_1.serverStatus.Success).json({
                status: serverMSG_1.serverMSG.Success,
                msg: 'login'
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
            accessOrRefreshHandler_1.accessOrRefreshHandler.registerHandler(registerData);
            res.status(serverStatus_1.serverStatus.Success).json({
                status: serverMSG_1.serverMSG.Success,
                msg: 'register'
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
//# sourceMappingURL=accessOrRefreshController.js.map