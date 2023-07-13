import { z } from "zod";

export const favoriteOptionalValidation = z.object({

  user: z.number().optional(),

  cake: z.number().optional()
});

  
