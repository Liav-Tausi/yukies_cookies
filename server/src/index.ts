import express, {Express} from "express";
import { loginOrRegisterRouter } from "./routers/loginOrRegisterRouter"
import dotenv from "dotenv";
import cors from "cors"
import helmet from 'helmet';
import compression from "compression"
import { test } from "./routers/test";
import { AppDataSource } from "./AppDataSource"

dotenv.config();


  const app: Express = express();
  const port = process.env.PORT ;

  app.use(cors())
  app.use(helmet())
  app.use(compression())
  app.use(express.json())

  app.use(loginOrRegisterRouter)
  app.use('/test', test)

  app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${process.env.PORT}`);
  });

