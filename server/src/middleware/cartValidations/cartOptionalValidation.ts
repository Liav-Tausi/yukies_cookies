import { z } from "zod";

export const cartOptionalValidation = z.object({
  
  id: z.number().optional(),

  user: z.number().optional()

});

  
