"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.catalogController = void 0;
const catalogHandler_1 = require("../../handlers/catalogHandlers/catalogHandler");
const catalogValidation_1 = require("../../middleware/catalogValidation");
const zodErrorHandling_1 = require("../../middleware/zodErrorHandling");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
exports.catalogController = {
    addItemController: async (req, res) => {
        try {
            const initialCakeData = req.body;
            const catalogData = catalogValidation_1.catalogValidation.parse(initialCakeData);
            const handlerResult = await catalogHandler_1.catalogHandler.addItemHandler(catalogData);
            const serverResultData = handlerResult.data;
            const serverResultStatus = handlerResult.status;
            res.status(serverResultStatus === serverStatus_1.serverStatus.Created
                ? serverStatus_1.serverStatus.Created
                : serverStatus_1.serverStatus.RequestFail).json({
                status: serverResultStatus ? serverResultStatus : serverStatus_1.serverStatus.RequestFail,
                data: serverResultData.refreshToken && serverResultData.accessToken ?
                    serverResultData : serverResultData.data ? serverMSG_1.serverErrorMSG.InvalidFields + serverResultData.data : serverResultData,
                msg: handlerResult.msg
            });
        }
        catch (error) {
            console.error(error.stack);
            (0, zodErrorHandling_1.zodErrorHandling)(error, res);
        }
    }
    // getItemController: async (req: Request, res: Response): Promise<void> => {
    //   try {
    //   const handlerResult = await catalogHandler.getItemHandler();
    //   } catch (error: any) {
    //     console.error(error.stack);
    //     zodErrorHandling(error, res)
    //   }
    // },
    // patchItemController: async (req: Request, res: Response): Promise<void> => {
    //   try {
    //   const handlerResult = await catalogHandler.patchItemHandler();
    //   } catch (error: any) {
    //     console.error(error.stack);
    //     zodErrorHandling(error, res)
    //   }
    // },
    // deleteItemController: async (req: Request, res: Response): Promise<void> => {
    //   try {
    //   const handlerResult = await catalogHandler.deleteItemHandler();
    //   } catch (error: any) {
    //     console.error(error.stack);
    //     zodErrorHandling(error, res)
    //   }
    // },
};
//# sourceMappingURL=catalogController.js.map