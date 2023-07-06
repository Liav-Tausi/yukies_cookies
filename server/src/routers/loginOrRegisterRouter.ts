import { Request, Response, Router } from "express";
import { loginOrRegisterController } from '../controllers/userControllers/loginOrRegisterController'

export const loginOrRegisterRouter: Router = Router();

loginOrRegisterRouter.post('/login', (req: Request, res: Response): void => {
  loginOrRegisterController.loginController(req, res);  
});

loginOrRegisterRouter.post('/register', (req: Request, res: Response): void => {
  loginOrRegisterController.registerController(req, res);  
});
