"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.test = void 0;
const express_1 = require("express");
exports.test = (0, express_1.Router)();
exports.test.get('/', (req, res) => {
    console.log('hello');
});
//# sourceMappingURL=test.js.map