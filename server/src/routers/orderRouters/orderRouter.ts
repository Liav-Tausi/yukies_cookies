import { Request, Response, Router } from "express";
import { orderController } from "../../controllers/orderControllers/orderController";

export const orderRouter: Router = Router();

orderRouter.post('/add_item', (req: Request, res: Response): void => {
  orderController.addItemController(req, res);  
});

orderRouter.get('/get_item', (req: Request, res: Response): void => {
  orderController.getItemController(req, res);  
});

orderRouter.patch('/patch_item', (req: Request, res: Response): void => {
  orderController.patchItemController(req, res);  
});

orderRouter.delete('/delete_item', (req: Request, res: Response): void => {
  orderController.deleteItemController(req, res);  
});