import { Request, Response, Router } from "express";
import { orderController } from "../../controllers/orderControllers/orderController";

export const orderItemsRouter: Router = Router();

orderItemsRouter.post('/add_item', (req: Request, res: Response): void => {
  orderController.addItemController(req, res);  
});

orderItemsRouter.get('/get_item', (req: Request, res: Response): void => {
  orderController.getItemController(req, res);  
});

orderItemsRouter.patch('/patch_item', (req: Request, res: Response): void => {
  orderController.patchItemController(req, res);  
});

orderItemsRouter.delete('/delete_item', (req: Request, res: Response): void => {
  orderController.deleteItemController(req, res);  
});