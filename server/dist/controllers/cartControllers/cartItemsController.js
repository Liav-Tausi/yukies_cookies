"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemsController = void 0;
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const zodErrorHandling_1 = require("../../middleware/zodErrorHandling");
const cartItemsValidation_1 = require("../../middleware/cartValidations/cartItemsValidation");
const cartItemsOptionalValidation_1 = require("../../middleware/cartValidations/cartItemsOptionalValidation");
const cartItemsHandler_1 = require("../../handlers/cartHandlers/cartItemsHandler");
exports.cartItemsController = {
    addCartController: async (req, res) => {
        try {
            const initialCartItemsData = req.body;
            const cartData = cartItemsValidation_1.cartItemsValidation.parse(initialCartItemsData);
            const handlerResult = await cartItemsHandler_1.cartItemsHandler.addCartHandler(cartData);
            const serverResultStatus = handlerResult.status;
            res.status(handlerResult.status === serverStatus_1.serverStatus.Success
                ? serverStatus_1.serverStatus.Success
                : handlerResult.status === serverStatus_1.serverStatus.NotFound
                    ? serverStatus_1.serverStatus.NotFound
                    : serverStatus_1.serverStatus.RequestFail).json(handlerResult);
        }
        catch (error) {
            console.error(error.stack);
            (0, zodErrorHandling_1.zodErrorHandling)(error, res);
        }
    },
    getCartController: async (req, res) => {
        try {
            const listOrGet = req.query.first;
            const user = req.query.user !== undefined ? Number(req.query.user) : undefined;
            const cart = req.query.cart !== undefined ? Number(req.query.cart) : undefined;
            const cake = req.query.cake !== undefined ? Number(req.query.cake) : undefined;
            const quantity = req.query.quantity !== undefined ? Number(req.query.quantity) : undefined;
            const cartData = cartItemsOptionalValidation_1.cartItemsOptionalValidation.parse({ user, cart, cake, quantity });
            if (listOrGet) {
                const handlerResult = await cartItemsHandler_1.cartItemsHandler.getCartHandler(cartData);
                res.status(handlerResult.status === serverStatus_1.serverStatus.Success
                    ? serverStatus_1.serverStatus.Success
                    : handlerResult.status === serverStatus_1.serverStatus.NotFound
                        ? serverStatus_1.serverStatus.NotFound
                        : serverStatus_1.serverStatus.RequestFail).json(handlerResult);
            }
            else {
                const handlerResult = await cartItemsHandler_1.cartItemsHandler.listCartHandler(cartData);
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
    patchCartController: async (req, res) => {
        try {
            const initialCartItemsData = req.body;
            const cartId = Number(req.query.cart);
            const cartData = cartItemsOptionalValidation_1.cartItemsOptionalValidation.parse(initialCartItemsData);
            const handlerResult = await cartItemsHandler_1.cartItemsHandler.patchCartHandler(cartData, cartId);
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
    deleteCartController: async (req, res) => {
        try {
            const user = req.query.user !== undefined ? Number(req.query.user) : undefined;
            const cartData = cartItemsOptionalValidation_1.cartItemsOptionalValidation.parse({ user });
            const handlerResult = await cartItemsHandler_1.cartItemsHandler.deleteCartHandler(cartData);
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
//# sourceMappingURL=cartItemsController.js.map