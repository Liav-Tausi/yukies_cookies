"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const compression_1 = __importDefault(require("compression"));
const AppDataSource_1 = require("./AppDataSource");
const loginOrRegisterRouter_1 = require("./routers/userRouters/loginOrRegisterRouter");
const catalogRouter_1 = require("./routers/catalogRouter");
dotenv_1.default.config();
const startServer = () => {
    const app = (0, express_1.default)();
    const port = process.env.PORT;
    app.use((0, cors_1.default)());
    app.use((0, helmet_1.default)());
    app.use((0, compression_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: true }));
    app.use("/api/v1/shop/auth/", loginOrRegisterRouter_1.loginOrRegisterRouter);
    app.use("/api/v1/shop/catalog/", catalogRouter_1.catalogRouter);
    app.listen(port, () => {
        console.log(`[server]: Server is running at http://localhost:${port}`);
    });
};
(async () => {
    try {
        (0, AppDataSource_1.main)();
        startServer();
    }
    catch (error) {
        console.error("Error during application initialization:", error);
    }
})();
//# sourceMappingURL=index.js.map