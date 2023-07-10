"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRouter = void 0;
const express_1 = require("express");
const userController_1 = require("../../controllers/userControllers/userController");
exports.userRouter = (0, express_1.Router)();
exports.userRouter.get('/get_user', (req, res) => {
    userController_1.userController.getUserController(req, res);
});
exports.userRouter.patch('/patch_user', (req, res) => {
    userController_1.userController.patchUserController(req, res);
});
exports.userRouter.delete('/delete_user', (req, res) => {
    userController_1.userController.deleteUserController(req, res);
});
//# sourceMappingURL=userRouter.js.map