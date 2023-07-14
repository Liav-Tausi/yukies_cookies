import { z } from "zod";
import { reviewTableEnumConfig } from "../../enums/ORMEnums/reviewTableEnum";

export const reviewOptionalValidation = z.object({

  id: z.number().optional(),

  user: z.number().optional(),

  cake: z.number().optional(),

  rating: z.number().min(reviewTableEnumConfig.MinRating).max(reviewTableEnumConfig.MaxRating).optional(),

  comment: z.string().min(reviewTableEnumConfig.MinCommentLength).max(reviewTableEnumConfig.MaxCommentLength).optional()

});
