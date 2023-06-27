"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginOrRegisterController = void 0;
exports.loginOrRegisterController = {
    login: async (req, res) => {
        const loginData = req.body;
        res.send('login');
        console.log('login');
    },
    register: async (req, res) => {
        const registerData = req.body;
        console.log('register');
        res.send('register');
    },
};
//# sourceMappingURL=loginOrRegisterController.js.map