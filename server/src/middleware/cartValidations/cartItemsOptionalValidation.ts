import { z } from "zod";
import { cartItemsTableEnumConfig } from "../../enums/ORMEnums/cartItemsTableEnum";

export const cartItemsOptionalValidation = z.object({

  user: z.number().optional(),

  cart: z.number().optional(),

  cake: z.number().optional(),

  quantity: z.number().min(cartItemsTableEnumConfig.MinQuantity).max(cartItemsTableEnumConfig.MaxQuantity).optional()

});

  
