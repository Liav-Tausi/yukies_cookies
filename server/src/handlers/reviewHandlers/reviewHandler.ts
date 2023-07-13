import { AppDataSource } from "../../AppDataSource";
import { reviewDAL } from "../../DAL/reviewDAL/reviewDAL";
import { Review } from "../../entities/Review";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { IReview, isIReview } from "../../interfaces/reviewInterfaces/IReview";
import { ISpecReview, isISpecReview } from "../../interfaces/reviewInterfaces/ISpecReview";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { validationDAL } from "../../middleware/validateDAL";

export const reviewHandler = {
  addReviewHandler: async (addReviewData: IReview): Promise<IServer> => {
    const { user, cake, comment, rating} = addReviewData;
    const validateReview = AppDataSource.manager.create(Review, { user, cake, comment, rating });
    const validationResult = await validationDAL(validateReview);

    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await reviewDAL.addItemDAL(addReviewData);
      if (dalResult.status === serverStatus.Created && isIReview(dalResult.data)) {
        return {
          status: serverStatus.Created,
          data: dalResult.data,
          msg: dalResult.msg
        };
      } else {
        return {
          status: serverStatus.RequestFail,
          data: dalResult.data,
          msg: serverMSG.RequestFail
        };
      }
    } else {
      return validationResult;
    }
  },
  getReviewHandler: async (getReviewData: ISpecReview): Promise<IServer> => {
    const validationResult = await validationDAL(getReviewData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await reviewDAL.getItemDAL(getReviewData);
      if (dalResult.status === serverStatus.Success && isISpecReview(dalResult.data["review"])) {
        return dalResult;
      } else {
        return {
          status: serverStatus.NotFound,
          data: dalResult.data,
          msg: serverMSG.NotFound
        };
      }
    } else {
      return validationResult;
    }
  },
  listReviewHandler: async (listReviewData: ISpecReview): Promise<IServer> => {
    const validationResult = await validationDAL(listReviewData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await reviewDAL.listItemDAL(listReviewData);
      if (dalResult.status === serverStatus.Success) {
        const reviews = dalResult.data["reviews"];
        if (Array.isArray(reviews)) {
          return {
            status: serverStatus.Success,
            data: { reviews: reviews },
            msg: serverMSG.Success
          };
        } else {
          return {
            status: serverStatus.NotFound,
            data: dalResult.data,
            msg: serverMSG.NotFound
          };
        }
      } else {
        return {
          status: serverStatus.NotFound,
          data: dalResult.data,
          msg: serverMSG.NotFound
        };
      }
    } else {
      return validationResult;
    }
  },
  updateReviewHandler: async (updateReviewData: ISpecReview, reviewId: number): Promise<IServer> => {
    const validationResult = await validationDAL(updateReviewData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await reviewDAL.patchItemDAL(updateReviewData, reviewId);
      if (dalResult.status === serverStatus.Updated) {
        return dalResult;
      } else {
        return {
          status: serverStatus.NotFound,
          data: dalResult.data,
          msg: serverMSG.NotFound
        };
      }
    } else {
      return validationResult;
    }
  },
  deleteReviewHandler: async (deleteReviewData: ISpecReview): Promise<IServer> => {
    const validationResult = await validationDAL(deleteReviewData);
    if (validationResult.status === serverStatus.Success) {
      const dalResult: IServer = await reviewDAL.deleteItemDAL(deleteReviewData);
      if (dalResult.status === serverStatus.Deleted) {
        return dalResult;
      } else {
        return {
          status: serverStatus.NotFound,
          data: dalResult.data,
          msg: serverMSG.NotFound
        };
      }
    } else {
      return validationResult;
    }
  }
};
