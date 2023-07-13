"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoriteRouter = void 0;
const express_1 = require("express");
const favoriteController_1 = require("../../controllers/favoriteControllers/favoriteController");
exports.favoriteRouter = (0, express_1.Router)();
exports.favoriteRouter.post('/add_item', (req, res) => {
    favoriteController_1.favoriteController.addItemController(req, res);
});
exports.favoriteRouter.get('/get_item', (req, res) => {
    favoriteController_1.favoriteController.getItemController(req, res);
});
exports.favoriteRouter.patch('/patch_item', (req, res) => {
    favoriteController_1.favoriteController.patchItemController(req, res);
});
exports.favoriteRouter.delete('/delete_item', (req, res) => {
    favoriteController_1.favoriteController.deleteItemController(req, res);
});
//# sourceMappingURL=favoriteRouter.js.map