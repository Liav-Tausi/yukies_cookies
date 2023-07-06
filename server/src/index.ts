import "reflect-metadata";
import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { main } from "./AppDataSource";
import { loginOrRegisterRouter } from "./routers/userRouters/loginOrRegisterRouter";
import { catalogRouter } from "./routers/catalogRouter";

dotenv.config();

const startServer = () => {
  const app: Express = express();
  const port = process.env.PORT;

  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use("/api/v1/shop/auth/", loginOrRegisterRouter);
  app.use("/api/v1/shop/catalog/", catalogRouter);

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
  });
};

(async () => {
  try {
    main();
    startServer();
  } catch (error) {
    console.error("Error during application initialization:", error);
  }
})();
