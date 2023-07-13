import { Request, Response, Router } from "express";
import { favoriteController } from "../../controllers/favoriteControllers/favoriteController";

export const favoriteRouter: Router = Router();

favoriteRouter.post('/add_item', (req: Request, res: Response): void => {
  favoriteController.addItemController(req, res);  
});

favoriteRouter.get('/get_item', (req: Request, res: Response): void => {
  favoriteController.getItemController(req, res);  
});

favoriteRouter.patch('/patch_item', (req: Request, res: Response): void => {
  favoriteController.patchItemController(req, res);  
});

favoriteRouter.delete('/delete_item', (req: Request, res: Response): void => {
  favoriteController.deleteItemController(req, res);  
});