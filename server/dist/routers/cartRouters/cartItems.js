"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartItemsRouter = void 0;
const express_1 = require("express");
const cartItemsController_1 = require("../../controllers/cartControllers/cartItemsController");
exports.cartItemsRouter = (0, express_1.Router)();
exports.cartItemsRouter.post('/add_cart', (req, res) => {
    cartItemsController_1.cartItemsController.addCartController(req, res);
});
exports.cartItemsRouter.get('/get_cart', (req, res) => {
    cartItemsController_1.cartItemsController.getCartController(req, res);
});
exports.cartItemsRouter.patch('/patch_cart', (req, res) => {
    cartItemsController_1.cartItemsController.patchCartController(req, res);
});
exports.cartItemsRouter.delete('/delete_cart', (req, res) => {
    cartItemsController_1.cartItemsController.deleteCartController(req, res);
});
//# sourceMappingURL=cartItems.js.map