"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogRouter = void 0;
const express_1 = require("express");
const catalogController_1 = require("../controllers/catalogControllers/catalogController");
exports.catalogRouter = (0, express_1.Router)();
exports.catalogRouter.post('/add_item', (req, res) => {
    catalogController_1.catalogController.addItemController(req, res);
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
//# sourceMappingURL=catalogRouter.js.map