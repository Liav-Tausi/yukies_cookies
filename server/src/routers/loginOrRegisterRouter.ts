import { NextFunction, Request, Response, Router } from "express";
import { loginOrRegisterController } from '../controllers/loginOrRegisterController'

export const loginOrRegisterRouter: Router = Router();

loginOrRegisterRouter.use((req: Request, res: Response, next: NextFunction) => {
  const loginOrRegister = req.query.loginOrRegister;

  if (loginOrRegister) {
    if (loginOrRegister === "1") {
      loginOrRegisterController.login(req, res);
    } else if (loginOrRegister === "2") {
      loginOrRegisterController.register(req, res);
    } else {
      loginOrRegisterController.login(req, res);   
    }
  } else {
    next()
  }
});