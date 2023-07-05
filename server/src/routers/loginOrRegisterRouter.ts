import { Request, Response, Router } from "express";
import { loginOrRegisterController } from '../controllers/userControllers/loginOrRegisterController'

export const loginOrRegisterRouter: Router = Router();

loginOrRegisterRouter.post('/login', (req: Request, res: Response) => {
  loginOrRegisterController.loginController(req, res);  
});

loginOrRegisterRouter.post('/register', (req: Request, res: Response) => {
  loginOrRegisterController.registerController(req, res);  
});
