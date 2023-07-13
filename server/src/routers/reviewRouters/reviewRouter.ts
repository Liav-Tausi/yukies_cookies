import { Request, Response, Router } from "express";
import { reviewController } from "../../controllers/reviewControllers/reviewController";

export const reviewRouter: Router = Router();

reviewRouter.post('/add_item', (req: Request, res: Response): void => {
  reviewController.addItemController(req, res);  
});

reviewRouter.get('/get_item', (req: Request, res: Response): void => {
  reviewController.getItemController(req, res);  
});

reviewRouter.patch('/patch_item', (req: Request, res: Response): void => {
  reviewController.patchItemController(req, res);  
});

reviewRouter.delete('/delete_item', (req: Request, res: Response): void => {
  reviewController.deleteItemController(req, res);  
});