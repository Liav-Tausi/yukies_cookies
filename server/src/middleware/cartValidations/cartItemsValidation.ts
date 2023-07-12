import { z } from "zod";
import { cartItemsTableEnumConfig } from "../../enums/ORMEnums/cartItemsTableEnum";

export const cartItemsValidation = z.object({
  user: z.number().optional(),

  cart: z.number().optional(),

  cake: z.number(),

  quantity: z.number().min(cartItemsTableEnumConfig.MinQuantity).max(cartItemsTableEnumConfig.MaxQuantity)

});

  
