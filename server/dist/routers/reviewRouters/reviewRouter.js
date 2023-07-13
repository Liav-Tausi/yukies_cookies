"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewRouter = void 0;
const express_1 = require("express");
const reviewController_1 = require("../../controllers/reviewControllers/reviewController");
exports.reviewRouter = (0, express_1.Router)();
exports.reviewRouter.post('/add_item', (req, res) => {
    reviewController_1.reviewController.addItemController(req, res);
});
exports.reviewRouter.get('/get_item', (req, res) => {
    reviewController_1.reviewController.getItemController(req, res);
});
exports.reviewRouter.patch('/patch_item', (req, res) => {
    reviewController_1.reviewController.patchItemController(req, res);
});
exports.reviewRouter.delete('/delete_item', (req, res) => {
    reviewController_1.reviewController.deleteItemController(req, res);
});
//# sourceMappingURL=reviewRouter.js.map