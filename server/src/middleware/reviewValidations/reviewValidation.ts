import { z } from "zod";
import { reviewTableEnumConfig } from "../../enums/ORMEnums/reviewTableEnum";

export const reviewValidation = z.object({

  user: z.number(),

  cake: z.number(),

  rating: z.number().min(reviewTableEnumConfig.MinRating).max(reviewTableEnumConfig.MaxRating),

  comment: z.string().min(reviewTableEnumConfig.MinCommentLength).max(reviewTableEnumConfig.MaxCommentLength)

});

  
