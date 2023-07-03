"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOrRegisterHandler = void 0;
const loginOrRegisterDAL_1 = require("../../DAL/userDAL/loginOrRegisterDAL");
exports.loginOrRegisterHandler = {
    loginHandler: async (loginData) => {
        loginOrRegisterDAL_1.loginOrRegisterDAL.loginDAL(loginData);
    },
    registerHandler: async (registerData) => {
        loginOrRegisterDAL_1.loginOrRegisterDAL.registerDAL(registerData);
    },
};
//# sourceMappingURL=loginOrRegisterHandler.js.map