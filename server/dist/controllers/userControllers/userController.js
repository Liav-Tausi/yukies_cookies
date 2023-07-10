"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userController = void 0;
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const zodErrorHandling_1 = require("../../middleware/zodErrorHandling");
const userOptionalValidation_1 = require("../../middleware/userValidations/userOptionalValidation");
const userHandler_1 = require("../../handlers/userHandlers/userHandler");
exports.userController = {
    getUserController: async (req, res) => {
        try {
            const listOrGet = req.query.first;
            const { fullName, phoneNumber, email } = req.query;
            const id = req.query.user !== undefined ? Number(req.query.user) : undefined;
            const userData = userOptionalValidation_1.userOptionalValidation.parse({ id, fullName, phoneNumber, email });
            if (listOrGet) {
                const handlerResult = await userHandler_1.userHandler.getUserHandler(userData);
                res.status(handlerResult.status === serverStatus_1.serverStatus.Success
                    ? serverStatus_1.serverStatus.Success
                    : handlerResult.status === serverStatus_1.serverStatus.NotFound
                        ? serverStatus_1.serverStatus.NotFound
                        : serverStatus_1.serverStatus.RequestFail).json(handlerResult);
            }
            else {
                const handlerResult = await userHandler_1.userHandler.listUserHandler(userData);
                res.status(handlerResult.status === serverStatus_1.serverStatus.Success
                    ? serverStatus_1.serverStatus.Success
                    : handlerResult.status === serverStatus_1.serverStatus.NotFound
                        ? serverStatus_1.serverStatus.NotFound
                        : serverStatus_1.serverStatus.RequestFail).json(handlerResult);
            }
        }
        catch (error) {
            console.error(error.stack);
            (0, zodErrorHandling_1.zodErrorHandling)(error, res);
        }
    },
    patchUserController: async (req, res) => {
        try {
            const initialUserData = req.body;
            const userId = Number(req.query.user);
            const userData = userOptionalValidation_1.userOptionalValidation.parse(initialUserData);
            const handlerResult = await userHandler_1.userHandler.patchUserHandler(userData, userId);
            const serverResultStatus = handlerResult.status;
            res.status(serverResultStatus === serverStatus_1.serverStatus.Updated
                ? serverStatus_1.serverStatus.Updated
                : serverStatus_1.serverStatus.RequestFail).json(handlerResult);
        }
        catch (error) {
            console.error(error.stack);
            (0, zodErrorHandling_1.zodErrorHandling)(error, res);
        }
    },
    deleteUserController: async (req, res) => {
        try {
            const id = req.query.user !== undefined ? Number(req.query.user) : undefined;
            const userData = userOptionalValidation_1.userOptionalValidation.parse({ id });
            const handlerResult = await userHandler_1.userHandler.deleteUserHandler(userData);
            const serverResultStatus = handlerResult.status;
            res.status(serverResultStatus === serverStatus_1.serverStatus.Deleted
                ? serverStatus_1.serverStatus.Deleted
                : serverStatus_1.serverStatus.RequestFail).json(handlerResult);
        }
        catch (error) {
            console.error(error.stack);
            (0, zodErrorHandling_1.zodErrorHandling)(error, res);
        }
    },
};
//# sourceMappingURL=userController.js.map