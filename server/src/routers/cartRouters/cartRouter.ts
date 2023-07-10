import { Request, Response, Router } from "express";
import { cartController } from "../../controllers/cartControllers/cartController";

export const cartRouter: Router = Router();

cartRouter.post('/add_item', (req: Request, res: Response): void => {
  cartController.addItemController(req, res);  
});

cartRouter.get('/get_item', (req: Request, res: Response): void => {
  cartController.getItemController(req, res);  
});

cartRouter.patch('/patch_item', (req: Request, res: Response): void => {
  cartController.patchItemController(req, res);  
});

cartRouter.delete('/delete_item', (req: Request, res: Response): void => {
  cartController.deleteItemController(req, res);  
});