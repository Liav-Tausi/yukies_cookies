"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogController = void 0;
const catalogHandler_1 = require("../../handlers/catalogHandlers/catalogHandler");
const catalogValidation_1 = require("../../middleware/catalogVaidations/catalogValidation");
const zodErrorHandling_1 = require("../../middleware/zodErrorHandling");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const catalogOptionalValidation_1 = require("../../middleware/catalogVaidations/catalogOptionalValidation");
exports.catalogController = {
    addItemController: async (req, res) => {
        try {
            const initialCakeData = req.body;
            const catalogData = catalogValidation_1.catalogValidation.parse(initialCakeData);
            const handlerResult = await catalogHandler_1.catalogHandler.addItemHandler(catalogData);
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
            const { name, shortDescription, longDescription, imageUrl } = req.query;
            const price = req.query.price !== undefined ? Number(req.query.price) : undefined;
            const catalogData = catalogOptionalValidation_1.catalogOptionalValidation.parse({
                name, shortDescription, longDescription, price, imageUrl
            });
            if (listOrGet) {
                const handlerResult = await catalogHandler_1.catalogHandler.getItemHandler(catalogData);
                res.status(handlerResult.status === serverStatus_1.serverStatus.Success
                    ? serverStatus_1.serverStatus.Success
                    : serverStatus_1.serverStatus.RequestFail).json(handlerResult);
            }
            else {
                const handlerResult = await catalogHandler_1.catalogHandler.listItemHandler(catalogData);
                res.status(handlerResult.status === serverStatus_1.serverStatus.Success
                    ? serverStatus_1.serverStatus.Success
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
            const initialCakeData = req.body;
            const cakeId = Number(req.query.cake);
            const catalogData = catalogOptionalValidation_1.catalogOptionalValidation.parse(initialCakeData);
            const handlerResult = await catalogHandler_1.catalogHandler.patchItemHandler(catalogData, cakeId);
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
            const { name, shortDescription, longDescription, imageUrl } = req.query;
            const price = req.query.price !== undefined ? Number(req.query.price) : undefined;
            const catalogData = catalogOptionalValidation_1.catalogOptionalValidation.parse({
                name, shortDescription, longDescription, price, imageUrl
            });
            const handlerResult = await catalogHandler_1.catalogHandler.deleteItemHandler(catalogData);
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
//# sourceMappingURL=catalogController.js.map