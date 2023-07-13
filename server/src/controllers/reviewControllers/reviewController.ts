import { Request, Response } from "express";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { zodErrorHandling } from "../../middleware/zodErrorHandling";
import { reviewHandler } from "../../handlers/reviewHandlers/reviewHandler";
import { Review } from "../../entities/Review";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { reviewValidation } from "../../middleware/reviewValidations/reviewValidation";
import { reviewOptionalValidation } from "../../middleware/reviewValidations/reviewOptionalValidation";

export const reviewController = {
  addItemController: async (req: Request, res: Response): Promise<void> => {
    try {
      const initialReviewData: Review = req.body;
      const reviewData: any = reviewValidation.parse(initialReviewData);
      const handlerResult = await reviewHandler.addReviewHandler(reviewData);
      const serverResultStatus: number = handlerResult.status;

      res.status(
        serverResultStatus === serverStatus.Created
        ? serverStatus.Created 
        : serverStatus.RequestFail
      ).json(handlerResult);
    } catch (error: any) {
      console.error(error.stack);
      zodErrorHandling(error, res);
    }
  },
  getItemController: async (req: Request, res: Response): Promise<void> => {
    try {
      const listOrGet = req.query.first;
      const user = req.query.user !== undefined ? Number(req.query.user) : undefined;
      const rating = req.query.rating !== undefined ? Number(req.query.rating) : undefined;
      const cake = req.query.cake !== undefined ? Number(req.query.cake) : undefined;
      const reviewData: any = reviewOptionalValidation.parse({ user, rating, cake });

      if (listOrGet) {
        const handlerResult: IServer = await reviewHandler.getReviewHandler(reviewData);
        res.status(
          handlerResult.status === serverStatus.Success
          ? serverStatus.Success 
          : handlerResult.status === serverStatus.NotFound
          ? serverStatus.NotFound 
          : serverStatus.RequestFail
        ).json(handlerResult);
      } else {
        const handlerResult: IServer = await reviewHandler.listReviewHandler(reviewData);
        res.status(
          handlerResult.status === serverStatus.Success
          ? serverStatus.Success 
          : handlerResult.status === serverStatus.NotFound
          ? serverStatus.NotFound 
          : serverStatus.RequestFail
        ).json(handlerResult);
      }
    } catch (error: any) {
      console.error(error.stack);
      zodErrorHandling(error, res);
    }
  },
  patchItemController: async (req: Request, res: Response): Promise<void> => {
    try {
      const initialReviewData: Review = req.body;
      const reviewId: number = Number(req.query.review);
      const reviewData: any = reviewOptionalValidation.parse(initialReviewData);
      const handlerResult = await reviewHandler.updateReviewHandler(reviewData, reviewId);
      const serverResultStatus: number = handlerResult.status;

      res.status(
        serverResultStatus === serverStatus.Updated
        ? serverStatus.Updated 
        : serverStatus.RequestFail
      ).json(handlerResult);
    } catch (error: any) {
      console.error(error.stack);
      zodErrorHandling(error, res);
    }
  },
  deleteItemController: async (req: Request, res: Response): Promise<void> => {
    try {
      const user = req.query.user !== undefined ? Number(req.query.user) : undefined;
      const reviewData: any = reviewOptionalValidation.parse({ user });
      const handlerResult = await reviewHandler.deleteReviewHandler(reviewData);
      const serverResultStatus: number = handlerResult.status;

      res.status(
        serverResultStatus === serverStatus.Deleted
        ? serverStatus.Deleted 
        : serverStatus.RequestFail
      ).json(handlerResult);
    } catch (error: any) {
      console.error(error.stack);
      zodErrorHandling(error, res);
    }
  },
};
