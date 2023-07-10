import "reflect-metadata";
import dotenv from "dotenv";
import express, { Express } from "express";
import cors from "cors";
import helmet from "helmet";
import compression from "compression";
import { main } from "./AppDataSource";
import { loginOrRegisterRouter } from "./routers/userRouters/loginOrRegisterRouter";
import { catalogRouter } from "./routers/catalogRouters/catalogRouter";
import { cartRouter } from "./routers/cartRouters/cartRouter";
import { userRouter } from "./routers/userRouters/userRouter";

dotenv.config();

const startServer = () => {
  const app: Express = express();
  const port = process.env.PORT;
  const baseRoute = process.env.BASE_ROUTE

  app.use(cors());
  app.use(helmet());
  app.use(compression());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use(baseRoute + "auth/", loginOrRegisterRouter);
  app.use(baseRoute + "user/", userRouter);
  app.use(baseRoute + "catalog/", catalogRouter);
  app.use(baseRoute + "cart/", cartRouter);

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
