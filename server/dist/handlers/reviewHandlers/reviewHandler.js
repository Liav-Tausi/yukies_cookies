"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewHandler = void 0;
const AppDataSource_1 = require("../../AppDataSource");
const reviewDAL_1 = require("../../DAL/reviewDAL/reviewDAL");
const Review_1 = require("../../entities/Review");
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const IReview_1 = require("../../interfaces/reviewInterfaces/IReview");
const ISpecReview_1 = require("../../interfaces/reviewInterfaces/ISpecReview");
const validateDAL_1 = require("../../middleware/validateDAL");
exports.reviewHandler = {
    addReviewHandler: async (addReviewData) => {
        const { user, cake, comment, rating } = addReviewData;
        const validateReview = AppDataSource_1.AppDataSource.manager.create(Review_1.Review, { user, cake, comment, rating });
        const validationResult = await (0, validateDAL_1.validationDAL)(validateReview);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await reviewDAL_1.reviewDAL.addItemDAL(addReviewData);
            if (dalResult.status === serverStatus_1.serverStatus.Created && (0, IReview_1.isIReview)(dalResult.data)) {
                return {
                    status: serverStatus_1.serverStatus.Created,
                    data: dalResult.data,
                    msg: dalResult.msg
                };
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.RequestFail,
                    data: dalResult.data,
                    msg: serverMSG_1.serverMSG.RequestFail
                };
            }
        }
        else {
            return validationResult;
        }
    },
    getReviewHandler: async (getReviewData) => {
        const validationResult = await (0, validateDAL_1.validationDAL)(getReviewData);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await reviewDAL_1.reviewDAL.getItemDAL(getReviewData);
            if (dalResult.status === serverStatus_1.serverStatus.Success && (0, ISpecReview_1.isISpecReview)(dalResult.data["review"])) {
                return dalResult;
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: dalResult.data,
                    msg: serverMSG_1.serverMSG.NotFound
                };
            }
        }
        else {
            return validationResult;
        }
    },
    listReviewHandler: async (listReviewData) => {
        const validationResult = await (0, validateDAL_1.validationDAL)(listReviewData);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await reviewDAL_1.reviewDAL.listItemDAL(listReviewData);
            if (dalResult.status === serverStatus_1.serverStatus.Success) {
                const reviews = dalResult.data["reviews"];
                if (Array.isArray(reviews)) {
                    return {
                        status: serverStatus_1.serverStatus.Success,
                        data: { reviews: reviews },
                        msg: serverMSG_1.serverMSG.Success
                    };
                }
                else {
                    return {
                        status: serverStatus_1.serverStatus.NotFound,
                        data: dalResult.data,
                        msg: serverMSG_1.serverMSG.NotFound
                    };
                }
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: dalResult.data,
                    msg: serverMSG_1.serverMSG.NotFound
                };
            }
        }
        else {
            return validationResult;
        }
    },
    updateReviewHandler: async (updateReviewData, reviewId) => {
        const validationResult = await (0, validateDAL_1.validationDAL)(updateReviewData);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await reviewDAL_1.reviewDAL.patchItemDAL(updateReviewData, reviewId);
            if (dalResult.status === serverStatus_1.serverStatus.Updated) {
                return dalResult;
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: dalResult.data,
                    msg: serverMSG_1.serverMSG.NotFound
                };
            }
        }
        else {
            return validationResult;
        }
    },
    deleteReviewHandler: async (deleteReviewData) => {
        const validationResult = await (0, validateDAL_1.validationDAL)(deleteReviewData);
        if (validationResult.status === serverStatus_1.serverStatus.Success) {
            const dalResult = await reviewDAL_1.reviewDAL.deleteItemDAL(deleteReviewData);
            if (dalResult.status === serverStatus_1.serverStatus.Deleted) {
                return dalResult;
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: dalResult.data,
                    msg: serverMSG_1.serverMSG.NotFound
                };
            }
        }
        else {
            return validationResult;
        }
    }
};
//# sourceMappingURL=reviewHandler.js.map