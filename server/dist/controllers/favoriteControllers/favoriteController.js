"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteController = void 0;
const favoriteHandler_1 = require("../../handlers/favoriteHandlers/favoriteHandler");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const zodErrorHandling_1 = require("../../middleware/zodErrorHandling");
const favoriteOptionalValidation_1 = require("../../middleware/favoriteValidations/favoriteOptionalValidation");
const favoriteValidation_1 = require("../../middleware/favoriteValidations/favoriteValidation");
exports.favoriteController = {
    addItemController: async (req, res) => {
        try {
            const initialFavoriteData = req.body;
            const favoriteData = favoriteValidation_1.favoriteValidation.parse(initialFavoriteData);
            const handlerResult = await favoriteHandler_1.favoriteHandler.addItemHandler(favoriteData);
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
    getItemController: async (req, res) => {
        try {
            const listOrGet = req.query.first;
            const user = req.query.user !== undefined ? Number(req.query.user) : undefined;
            const favoriteData = favoriteOptionalValidation_1.favoriteOptionalValidation.parse({ user });
            if (listOrGet) {
                const handlerResult = await favoriteHandler_1.favoriteHandler.getItemHandler(favoriteData);
                res.status(handlerResult.status === serverStatus_1.serverStatus.Success
                    ? serverStatus_1.serverStatus.Success
                    : handlerResult.status === serverStatus_1.serverStatus.NotFound
                        ? serverStatus_1.serverStatus.NotFound
                        : serverStatus_1.serverStatus.RequestFail).json(handlerResult);
            }
            else {
                const handlerResult = await favoriteHandler_1.favoriteHandler.listItemHandler(favoriteData);
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
    patchItemController: async (req, res) => {
        try {
            const initialFavoriteData = req.body;
            const favoriteId = Number(req.query.favorite);
            const favoriteData = favoriteOptionalValidation_1.favoriteOptionalValidation.parse(initialFavoriteData);
            const handlerResult = await favoriteHandler_1.favoriteHandler.patchItemHandler(favoriteData, favoriteId);
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
    deleteItemController: async (req, res) => {
        try {
            const user = req.query.user !== undefined ? Number(req.query.user) : undefined;
            const favoriteData = favoriteOptionalValidation_1.favoriteOptionalValidation.parse({ user });
            const handlerResult = await favoriteHandler_1.favoriteHandler.deleteItemHandler(favoriteData);
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
//# sourceMappingURL=favoriteController.js.map