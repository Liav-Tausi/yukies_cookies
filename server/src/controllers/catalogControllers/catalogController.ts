import { Request, Response } from "express";
import { catalogHandler } from "../../handlers/catalogHandlers/catalogHandler";
import { catalogValidation } from "../../middleware/catalogValidation";
import { zodErrorHandling } from "../../middleware/zodErrorHandling";
import { ICake } from "../../interfaces/cakeInterfaces/ICake";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { serverErrorMSG } from "../../enums/serverStatusesEnums/serverMSG";

export const catalogController = {

  addItemController: async (req: Request, res: Response): Promise<void> => {
    try {
      const initialCakeData: ICake = req.body
      const catalogData: any = catalogValidation.parse(initialCakeData);
      const handlerResult = await catalogHandler.addItemHandler(catalogData);
      const serverResultData: any = handlerResult.data;
      const serverResultStatus: number = handlerResult.status;

      res.status(
        serverResultStatus === serverStatus.Created
        ? serverStatus.Created 
        : serverStatus.RequestFail
      ).json({
        status: serverResultStatus ? serverResultStatus : serverStatus.RequestFail,
        data: serverResultData.refreshToken && serverResultData.accessToken ?
        serverResultData : serverResultData.data ? serverErrorMSG.InvalidFields + serverResultData.data : serverResultData,
        msg: handlerResult.msg
      });
    } catch (error: any) {
      console.error(error.stack);
      zodErrorHandling(error, res)
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

}