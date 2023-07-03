"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: true,
    entities: ["dist/entities/**/*{.js,.ts}"],
    migrations: ["dist/migrations/**/*{.js,.ts}"],
    subscribers: ["dist/subscribers/**/*{.js,.ts}"],
    migrationsTableName: "migrations"
});
exports.AppDataSource.initialize().then(async () => {
    console.log('Data Source has been initialized!');
}).catch(error => console.log('Error during Data Source initialization', error));
//# sourceMappingURL=AppDataSource.js.map