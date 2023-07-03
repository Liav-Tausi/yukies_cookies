import { Request, Response, Router } from "express";
import { accessOrRefreshController } from '../controllers/userControllers/accessOrRefreshController'

export const accessOrRefreshRouter: Router = Router();

accessOrRefreshRouter.post('/access', (req: Request, res: Response) => {
  accessOrRefreshController.loginController(req, res);  
});

accessOrRefreshRouter.post('/refresh', (req: Request, res: Response) => {
  accessOrRefreshController.registerController(req, res);  
});
