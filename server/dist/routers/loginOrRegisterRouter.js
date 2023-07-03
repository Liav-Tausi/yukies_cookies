"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOrRegisterRouter = void 0;
const express_1 = require("express");
const loginOrRegisterController_1 = require("../controllers/userControllers/loginOrRegisterController");
exports.loginOrRegisterRouter = (0, express_1.Router)();
exports.loginOrRegisterRouter.use((req, res, next) => {
    const loginOrRegister = req.query.loginOrRegister;
    if (loginOrRegister) {
        if (loginOrRegister === "1") {
            loginOrRegisterController_1.loginOrRegisterController.loginController(req, res);
        }
        else if (loginOrRegister === "2") {
            loginOrRegisterController_1.loginOrRegisterController.registerController(req, res);
        }
        else {
            loginOrRegisterController_1.loginOrRegisterController.loginController(req, res);
        }
    }
    else {
        next();
    }
});
//# sourceMappingURL=loginOrRegisterRouter.js.map