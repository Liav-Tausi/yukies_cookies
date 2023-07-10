"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartController = void 0;
const cartHandler_1 = require("../../handlers/cartHandlers/cartHandler");
const cartValidation_1 = require("../../middleware/cartValidations/cartValidation");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const zodErrorHandling_1 = require("../../middleware/zodErrorHandling");
const cartOptionalValidation_1 = require("../../middleware/cartValidations/cartOptionalValidation");
exports.cartController = {
    addItemController: async (req, res) => {
        try {
            const initialCartData = req.body;
            const cartData = cartValidation_1.cartValidation.parse(initialCartData);
            const handlerResult = await cartHandler_1.cartHandler.addItemHandler(cartData);
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
            const user = Number(req.query.user);
            const cartData = cartOptionalValidation_1.cartOptionalValidation.parse({ user });
            if (listOrGet) {
                const handlerResult = await cartHandler_1.cartHandler.getItemHandler(cartData);
                res.status(handlerResult.status === serverStatus_1.serverStatus.Success
                    ? serverStatus_1.serverStatus.Success
                    : serverStatus_1.serverStatus.RequestFail).json(handlerResult);
            }
            else {
                const handlerResult = await cartHandler_1.cartHandler.listItemHandler(cartData);
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
            const initialCartData = req.body;
            const cartId = Number(req.query.cart);
            const cartData = cartOptionalValidation_1.cartOptionalValidation.parse(initialCartData);
            const handlerResult = await cartHandler_1.cartHandler.patchItemHandler(cartData, cartId);
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
            const user = Number(req.query.user);
            const cartData = cartOptionalValidation_1.cartOptionalValidation.parse({ user });
            const handlerResult = await cartHandler_1.cartHandler.deleteItemHandler(cartData);
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
//# sourceMappingURL=cartController.js.map