import { z } from "zod";

export const favoriteValidation = z.object({

  user: z.number(),

  cake: z.number()
});

  
