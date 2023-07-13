import { Request, Response, Router } from "express";
import { userController } from "../../controllers/userControllers/userController";

export const userRouter: Router = Router();

userRouter.get('/get_item', (req: Request, res: Response): void => {
  userController.getUserController(req, res);  
});

userRouter.patch('/patch_item', (req: Request, res: Response): void => {
  userController.patchUserController(req, res);  
});

userRouter.delete('/delete_item', (req: Request, res: Response): void => {
  userController.deleteUserController(req, res);  
});