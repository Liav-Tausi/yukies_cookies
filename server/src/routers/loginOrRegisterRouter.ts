import { NextFunction, Request, Response, Router } from "express";
import { loginOrRegisterController } from '../controllers/userControllers/loginOrRegisterController'

export const loginOrRegisterRouter: Router = Router();

loginOrRegisterRouter.use((req: Request, res: Response, next: NextFunction) => {
  const loginOrRegister = req.query.loginOrRegister;

  if (loginOrRegister) {
    if (loginOrRegister === "1") {
      loginOrRegisterController.loginController(req, res);
    } else if (loginOrRegister === "2") {
      loginOrRegisterController.registerController(req, res);
    } else {
      loginOrRegisterController.loginController(req, res);   
    }
  } else {
    next()
  }
});