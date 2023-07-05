"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOrRegisterRouter = void 0;
const express_1 = require("express");
const loginOrRegisterController_1 = require("../controllers/userControllers/loginOrRegisterController");
exports.loginOrRegisterRouter = (0, express_1.Router)();
exports.loginOrRegisterRouter.post('/login', (req, res) => {
    loginOrRegisterController_1.loginOrRegisterController.loginController(req, res);
});
exports.loginOrRegisterRouter.post('/register', (req, res) => {
    loginOrRegisterController_1.loginOrRegisterController.registerController(req, res);
});
//# sourceMappingURL=loginOrRegisterRouter.js.map