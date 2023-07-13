"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewController = void 0;
const serverStatus_1 = require("../../enums/serverStatusesEnums/serverStatus");
const zodErrorHandling_1 = require("../../middleware/zodErrorHandling");
const reviewHandler_1 = require("../../handlers/reviewHandlers/reviewHandler");
const reviewValidation_1 = require("../../middleware/reviewValidations/reviewValidation");
const reviewOptionalValidation_1 = require("../../middleware/reviewValidations/reviewOptionalValidation");
exports.reviewController = {
    addItemController: async (req, res) => {
        try {
            const initialReviewData = req.body;
            const reviewData = reviewValidation_1.reviewValidation.parse(initialReviewData);
            const handlerResult = await reviewHandler_1.reviewHandler.addReviewHandler(reviewData);
            const serverResultStatus = handlerResult.status;
            res.status(serverResultStatus === serverStatus_1.serverStatus.Created
                ? serverStatus_1.serverStatus.Created
                : serverStatus_1.serverStatus.RequestFail).json(handlerResult);
        }
        catch (error) {
            console.error(error.stack);
            (0, zodErrorHandling_1.zodErrorHandling)(error, res);
        }
    },
    getItemController: async (req, res) => {
        try {
            const listOrGet = req.query.first;
            const user = req.query.user !== undefined ? Number(req.query.user) : undefined;
            const rating = req.query.rating !== undefined ? Number(req.query.rating) : undefined;
            const cake = req.query.cake !== undefined ? Number(req.query.cake) : undefined;
            const reviewData = reviewOptionalValidation_1.reviewOptionalValidation.parse({ user, rating, cake });
            if (listOrGet) {
                const handlerResult = await reviewHandler_1.reviewHandler.getReviewHandler(reviewData);
                res.status(handlerResult.status === serverStatus_1.serverStatus.Success
                    ? serverStatus_1.serverStatus.Success
                    : handlerResult.status === serverStatus_1.serverStatus.NotFound
                        ? serverStatus_1.serverStatus.NotFound
                        : serverStatus_1.serverStatus.RequestFail).json(handlerResult);
            }
            else {
                const handlerResult = await reviewHandler_1.reviewHandler.listReviewHandler(reviewData);
                res.status(handlerResult.status === serverStatus_1.serverStatus.Success
                    ? serverStatus_1.serverStatus.Success
                    : handlerResult.status === serverStatus_1.serverStatus.NotFound
                        ? serverStatus_1.serverStatus.NotFound
                        : serverStatus_1.serverStatus.RequestFail).json(handlerResult);
            }
        }
        catch (error) {
            console.error(error.stack);
            (0, zodErrorHandling_1.zodErrorHandling)(error, res);
        }
    },
    patchItemController: async (req, res) => {
        try {
            const initialReviewData = req.body;
            const reviewId = Number(req.query.review);
            const reviewData = reviewOptionalValidation_1.reviewOptionalValidation.parse(initialReviewData);
            const handlerResult = await reviewHandler_1.reviewHandler.updateReviewHandler(reviewData, reviewId);
            const serverResultStatus = handlerResult.status;
            res.status(serverResultStatus === serverStatus_1.serverStatus.Updated
                ? serverStatus_1.serverStatus.Updated
                : serverStatus_1.serverStatus.RequestFail).json(handlerResult);
        }
        catch (error) {
            console.error(error.stack);
            (0, zodErrorHandling_1.zodErrorHandling)(error, res);
        }
    },
    deleteItemController: async (req, res) => {
        try {
            const user = req.query.user !== undefined ? Number(req.query.user) : undefined;
            const reviewData = reviewOptionalValidation_1.reviewOptionalValidation.parse({ user });
            const handlerResult = await reviewHandler_1.reviewHandler.deleteReviewHandler(reviewData);
            const serverResultStatus = handlerResult.status;
            res.status(serverResultStatus === serverStatus_1.serverStatus.Deleted
                ? serverStatus_1.serverStatus.Deleted
                : serverStatus_1.serverStatus.RequestFail).json(handlerResult);
        }
        catch (error) {
            console.error(error.stack);
            (0, zodErrorHandling_1.zodErrorHandling)(error, res);
        }
    },
};
//# sourceMappingURL=reviewController.js.map