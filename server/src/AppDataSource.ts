import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv";

dotenv.config();

export const AppDataSource = new DataSource({
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



AppDataSource.initialize().then(async () => {
  console.log('Data Source has been initialized!');
}).catch(error => console.log('Error during Data Source initialization', error))