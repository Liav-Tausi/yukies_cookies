"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cartRouter = void 0;
const express_1 = require("express");
const cartController_1 = require("../../controllers/cartControllers/cartController");
exports.cartRouter = (0, express_1.Router)();
exports.cartRouter.post('/add_item', (req, res) => {
    cartController_1.cartController.addItemController(req, res);
});
exports.cartRouter.get('/get_item', (req, res) => {
    cartController_1.cartController.getItemController(req, res);
});
exports.cartRouter.patch('/patch_item', (req, res) => {
    cartController_1.cartController.patchItemController(req, res);
});
exports.cartRouter.delete('/delete_item', (req, res) => {
    cartController_1.cartController.deleteItemController(req, res);
});
//# sourceMappingURL=cartRouter.js.map