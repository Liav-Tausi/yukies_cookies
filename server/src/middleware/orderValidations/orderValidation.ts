import { z } from "zod";
import { orderItemsTableEnumConfig } from "../../enums/ORMEnums/orderItemTableEnum";

export const orderValidation = z.object({

  user: z.number(),

  totalAmount: z.string().min(orderItemsTableEnumConfig.MinTotalAmount).max(orderItemsTableEnumConfig.MaxTotalAmount),

  orderTime: z.string()
});

  
