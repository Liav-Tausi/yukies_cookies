import { z } from "zod";

export const cartOptionalValidation = z.object({

  user: z.number().optional()

});

  
