import { z } from "zod";

export const favoriteOptionalValidation = z.object({
  
  id: z.number().optional(),

  user: z.number().optional(),

  cake: z.number().optional()
});

  
