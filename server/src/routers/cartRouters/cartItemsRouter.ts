import { Request, Response, Router } from "express";
import { cartItemsController } from "../../controllers/cartControllers/cartItemsController";

export const cartItemsRouter: Router = Router();

cartItemsRouter.post('/add_item', (req: Request, res: Response): void => {
  cartItemsController.addCartController(req, res);  
});

cartItemsRouter.get('/get_item', (req: Request, res: Response): void => {
  cartItemsController.getCartController(req, res);  
});

cartItemsRouter.patch('/patch_item', (req: Request, res: Response): void => {
  cartItemsController.patchCartController(req, res);  
});

cartItemsRouter.delete('/delete_item', (req: Request, res: Response): void => {
  cartItemsController.deleteCartController(req, res);  
});