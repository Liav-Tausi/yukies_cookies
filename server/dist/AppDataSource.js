"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.main = exports.AppDataSource = void 0;
require("reflect-metadata");
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const User_1 = require("./entities/User");
const Cake_1 = require("./entities/Cake");
const Cart_1 = require("./entities/Cart");
const CartItems_1 = require("./entities/CartItems");
const Favorite_1 = require("./entities/Favorite");
const Order_1 = require("./entities/Order");
const OrderItems_1 = require("./entities/OrderItems");
const Review_1 = require("./entities/Review");
dotenv_1.default.config();
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT),
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [User_1.User, Cake_1.Cake, Cart_1.Cart, Favorite_1.Favorite, Order_1.Order, Review_1.Review, CartItems_1.CartItems, OrderItems_1.OrderItems],
    migrations: ["./dist/migrations/**/*{.js,.ts}"],
    subscribers: [".dist/subscribers/**/*{.js,.ts}"],
    migrationsTableName: "migrations",
    cache: true
});
const main = async () => {
    try {
        await exports.AppDataSource.initialize();
        console.log("Data Source has been initialized!");
    }
    catch (error) {
        console.error("Error during application initialization:", error);
        (0, exports.main)();
    }
};
exports.main = main;
//# sourceMappingURL=AppDataSource.js.map