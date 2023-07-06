import { Request, Response, Router } from "express";
import { catalogController } from "../controllers/catalogControllers/catalogController";

export const catalogRouter: Router = Router();

catalogRouter.post('/add_item', (req: Request, res: Response): void => {
  catalogController.addItemController(req, res);  
});

// catalogRouter.get('/get_item', (req: Request, res: Response): void => {
//   catalogController.getItemController(req, res);  
// });

// catalogRouter.patch('/patch_item', (req: Request, res: Response): void => {
//   catalogController.patchItemController(req, res);  
// });

// catalogRouter.delete('/delete_item', (req: Request, res: Response): void => {
//   catalogController.deleteItemController(req, res);  
// });



