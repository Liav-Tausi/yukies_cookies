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
            const handlerResult = await accessOrRefreshHandler_1.accessOrRefreshHandler.loginHandler(loginData);
            const serverResultData = handlerResult.data;
            const serverResultStatus = handlerResult.status;
            res.status(serverResultStatus === serverStatus_1.serverStatus.Success ? serverStatus_1.serverStatus.Success :
                serverResultStatus === serverStatus_1.serverStatus.NotFound ? serverStatus_1.serverStatus.NotFound : serverStatus_1.serverStatus.Unauthorized).json({
                status: serverResultStatus ? serverResultStatus : serverStatus_1.serverStatus.Unauthorized,
                data: serverResultData["refreshToken"] && serverResultData["accessToken"] ?
                    serverResultData : serverResultData["data"] ?? serverResultData,
                msg: handlerResult.msg
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
            const handlerResult = await accessOrRefreshHandler_1.accessOrRefreshHandler.registerHandler(registerData);
            const serverResultData = handlerResult.data;
            const serverResultStatus = handlerResult.status;
            res.status(serverResultStatus === serverStatus_1.serverStatus.Success ? serverStatus_1.serverStatus.Created : serverStatus_1.serverStatus.RequestFail).json({
                status: serverResultStatus ? serverResultStatus : serverStatus_1.serverStatus.RequestFail,
                data: serverResultData["refreshToken"] && serverResultData["accessToken"] ?
                    serverResultData : serverResultData["data"] ? serverMSG_1.serverErrorMSG.InvalidFields + serverResultData["data"] : serverResultData,
                msg: handlerResult.msg
            });
        }
        catch (error) {
            console.error(`${serverMSG_1.serverErrorMSG.registerControllerERROR} ${error.stack}`);
            res.status(serverStatus_1.serverStatus.ServerFail).json({
                status: serverMSG_1.serverMSG.ServerFail,
                msg: error.message,
            });
        }
    },
};
//# sourceMappingURL=accessOrRefreshController.js.map