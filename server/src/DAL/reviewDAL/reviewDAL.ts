import { DeleteResult, UpdateResult } from "typeorm";
import { serverMSG } from "../../enums/serverStatusesEnums/serverMSG";
import { serverStatus } from "../../enums/serverStatusesEnums/serverStatus";
import { Review } from "../../entities/Review";
import { AppDataSource } from "../../AppDataSource";
import { IServer } from "../../interfaces/serverInterfaces/IServer";
import { ISpecReview } from "../../interfaces/reviewInterfaces/ISpecReview";
import { IReview, isIReview } from "../../interfaces/reviewInterfaces/IReview";

export const reviewDAL = {
  addItemDAL: async (addItemData: IReview): Promise<IServer> => {
    const { user, cake, rating, comment } = addItemData;
    try {
      const newReview: Review = AppDataSource.manager.create(Review, {
        user,
        cake,
        rating,
        comment
      });
      try {
        await newReview.save();
        return {
          status: serverStatus.Created,
          data: newReview,
          msg: serverMSG.Created,
        };
      } catch (error: any) {
        return {
          status: serverStatus.RequestFail,
          data: error.detail,
          msg: serverMSG.RequestFail,
        };
      }
    } catch (error: any) {
      console.error(error.message, {
        functionName: reviewDAL.addItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail,
      };
    }
  },
  getItemDAL: async (getItemData: ISpecReview): Promise<IServer> => {
    try {
      const review: Review = await AppDataSource.manager.findOneBy(
        Review,
        getItemData
      );
      if (review) {
        return {
          status: serverStatus.Success,
          data: { review: review },
          msg: serverMSG.Success,
        };
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound,
        };
      }
    } catch (error: any) {
      console.error(error.message, {
        functionName: reviewDAL.getItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail,
      };
    }
  },
  listItemDAL: async (getItemData: ISpecReview): Promise<IServer> => {
    try {
      const reviews: Review[] = await AppDataSource.manager.findBy(
        Review,
        getItemData
      );
      if (reviews.some((review) => isIReview(review))) {
        return {
          status: serverStatus.Success,
          data: { reviews: reviews },
          msg: serverMSG.Success,
        };
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound,
        };
      }
    } catch (error: any) {
      console.error(error.message, {
        functionName: reviewDAL.listItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail,
      };
    }
  },
  patchItemDAL: async ( patchItemData: ISpecReview, reviewId: number): Promise<IServer> => {
    try {
      const review: UpdateResult = await AppDataSource.manager.update(
        Review,
        reviewId,
        patchItemData
      );
      if (review.affected >= 1) {
        return {
          status: serverStatus.Updated,
          data: { review: review },
          msg: serverMSG.Updated,
        };
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound,
        };
      }
    } catch (error: any) {
      console.error(error.message, {
        functionName: reviewDAL.listItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail,
      };
    }
  },
  deleteItemDAL: async (deleteItemData: ISpecReview): Promise<IServer> => {
    try {
      const review: DeleteResult = await AppDataSource.manager.delete(
        Review,
        deleteItemData
      );
      if (review.affected >= 1) {
        return {
          status: serverStatus.Deleted,
          data: { review: review },
          msg: serverMSG.Deleted,
        };
      } else {
        return {
          status: serverStatus.NotFound,
          data: {},
          msg: serverMSG.NotFound,
        };
      }
    } catch (error: any) {
      console.error(error.message, {
        functionName: reviewDAL.deleteItemDAL.name,
      });
      return {
        status: serverStatus.RequestFail,
        data: error.message,
        msg: serverMSG.RequestFail
      }
    }
  }
}
