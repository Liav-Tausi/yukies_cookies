import { Request, Response, Router } from "express";
import { cartItemsController } from "../../controllers/cartControllers/cartItemsController";

export const cartItemsRouter: Router = Router();

cartItemsRouter.post('/add_item', (req: Request, res: Response): void => {
  cartItemsController.addItemController(req, res);  
});

cartItemsRouter.get('/get_item', (req: Request, res: Response): void => {
  cartItemsController.getItemController(req, res);  
});

cartItemsRouter.patch('/patch_item', (req: Request, res: Response): void => {
  cartItemsController.patchItemController(req, res);  
});

cartItemsRouter.delete('/delete_item', (req: Request, res: Response): void => {
  cartItemsController.deleteItemController(req, res);  
});