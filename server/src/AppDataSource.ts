import "reflect-metadata";
import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { User } from "./entities/User";
import { Cake } from "./entities/Cake";
import { Cart } from "./entities/Cart";
import { CartItems } from "./entities/CartItems";
import { Favorite } from "./entities/Favorite";
import { Order } from "./entities/Order";
import { OrderItems } from "./entities/OrderItems";
import { Review } from "./entities/Review";


dotenv.config();


export const AppDataSource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT),
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [User, Cake, Cart, Favorite, Order, Review ,CartItems, OrderItems],
  migrations: ["./dist/migrations/**/*{.js,.ts}"],
  subscribers: [".dist/subscribers/**/*{.js,.ts}"],
  migrationsTableName: "migrations",
  cache: true
});

export const main = async () => {
  try {
    await AppDataSource.initialize();
    console.log("Data Source has been initialized!");
  } catch (error) {
    console.error("Error during application initialization:", error);
    main();
  }
};