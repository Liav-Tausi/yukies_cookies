"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const loginOrRegisterRouter_1 = require("./routers/loginOrRegisterRouter");
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const test_1 = require("./routers/test");
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT;
app.use((0, cors_1.default)());
app.use((0, helmet_1.default)());
app.use((0, compression_1.default)());
app.use(express_1.default.json());
app.use(loginOrRegisterRouter_1.loginOrRegisterRouter);
app.use('/test', test_1.test);
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`);
});
//# sourceMappingURL=index.js.map