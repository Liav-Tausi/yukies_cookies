"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewDAL = void 0;
const serverMSG_1 = require("../../enums/serverStatusesEnums/serverMSG");
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const Review_1 = require("../../entities/Review");
const AppDataSource_1 = require("../../AppDataSource");
const IReview_1 = require("../../interfaces/reviewInterfaces/IReview");
exports.reviewDAL = {
    addItemDAL: async (addItemData) => {
        const { user, cake, rating, comment } = addItemData;
        try {
            const newReview = AppDataSource_1.AppDataSource.manager.create(Review_1.Review, {
                user,
                cake,
                rating,
                comment
            });
            try {
                await newReview.save();
                return {
                    status: serverStatus_1.serverStatus.Created,
                    data: newReview,
                    msg: serverMSG_1.serverMSG.Created,
                };
            }
            catch (error) {
                return {
                    status: serverStatus_1.serverStatus.RequestFail,
                    data: error.detail,
                    msg: serverMSG_1.serverMSG.RequestFail,
                };
            }
        }
        catch (error) {
            console.error(error.message, {
                functionName: exports.reviewDAL.addItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail,
            };
        }
    },
    getItemDAL: async (getItemData) => {
        try {
            const review = await AppDataSource_1.AppDataSource.manager.findOneBy(Review_1.Review, getItemData);
            if (review) {
                return {
                    status: serverStatus_1.serverStatus.Success,
                    data: { review: review },
                    msg: serverMSG_1.serverMSG.Success,
                };
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: {},
                    msg: serverMSG_1.serverMSG.NotFound,
                };
            }
        }
        catch (error) {
            console.error(error.message, {
                functionName: exports.reviewDAL.getItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail,
            };
        }
    },
    listItemDAL: async (getItemData) => {
        try {
            const reviews = await AppDataSource_1.AppDataSource.manager.findBy(Review_1.Review, getItemData);
            if (reviews.some((review) => (0, IReview_1.isIReview)(review))) {
                return {
                    status: serverStatus_1.serverStatus.Success,
                    data: { reviews: reviews },
                    msg: serverMSG_1.serverMSG.Success,
                };
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: {},
                    msg: serverMSG_1.serverMSG.NotFound,
                };
            }
        }
        catch (error) {
            console.error(error.message, {
                functionName: exports.reviewDAL.listItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail,
            };
        }
    },
    patchItemDAL: async (patchItemData, reviewId) => {
        try {
            const review = await AppDataSource_1.AppDataSource.manager.update(Review_1.Review, reviewId, patchItemData);
            if (review.affected >= 1) {
                return {
                    status: serverStatus_1.serverStatus.Updated,
                    data: { review: review },
                    msg: serverMSG_1.serverMSG.Updated,
                };
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: {},
                    msg: serverMSG_1.serverMSG.NotFound,
                };
            }
        }
        catch (error) {
            console.error(error.message, {
                functionName: exports.reviewDAL.listItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail,
            };
        }
    },
    deleteItemDAL: async (deleteItemData) => {
        try {
            const review = await AppDataSource_1.AppDataSource.manager.delete(Review_1.Review, deleteItemData);
            if (review.affected >= 1) {
                return {
                    status: serverStatus_1.serverStatus.Deleted,
                    data: { review: review },
                    msg: serverMSG_1.serverMSG.Deleted,
                };
            }
            else {
                return {
                    status: serverStatus_1.serverStatus.NotFound,
                    data: {},
                    msg: serverMSG_1.serverMSG.NotFound,
                };
            }
        }
        catch (error) {
            console.error(error.message, {
                functionName: exports.reviewDAL.deleteItemDAL.name,
            });
            return {
                status: serverStatus_1.serverStatus.RequestFail,
                data: error.message,
                msg: serverMSG_1.serverMSG.RequestFail
            };
        }
    }
};
//# sourceMappingURL=reviewDAL.js.map