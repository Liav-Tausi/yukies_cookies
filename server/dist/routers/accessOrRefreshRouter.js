"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessOrRefreshRouter = void 0;
const express_1 = require("express");
const accessOrRefreshController_1 = require("../controllers/userControllers/accessOrRefreshController");
exports.accessOrRefreshRouter = (0, express_1.Router)();
exports.accessOrRefreshRouter.post('/access', (req, res) => {
    accessOrRefreshController_1.accessOrRefreshController.loginController(req, res);
});
exports.accessOrRefreshRouter.post('/refresh', (req, res) => {
    accessOrRefreshController_1.accessOrRefreshController.registerController(req, res);
});
//# sourceMappingURL=accessOrRefreshRouter.js.map