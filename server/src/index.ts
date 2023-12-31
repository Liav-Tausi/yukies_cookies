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
import { cartItemsRouter } from "./routers/cartRouters/cartItemsRouter";
import { favoriteRouter } from "./routers/favoriteRouters/favoriteRouter";
import { reviewRouter } from "./routers/reviewRouters/reviewRouter";
import { orderRouter } from "./routers/orderRouters/orderRouter";

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
  app.use(baseRoute + "favorite/", favoriteRouter);
  app.use(baseRoute + "review/", reviewRouter);
  app.use(baseRoute + "catalog/", catalogRouter);
  app.use(baseRoute + "order/", orderRouter)
  app.use(baseRoute + "order_items/", orderItemsRouter)
  app.use(baseRoute + "cart/", cartRouter);
  app.use(baseRoute + "cart_items/", cartItemsRouter);

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
