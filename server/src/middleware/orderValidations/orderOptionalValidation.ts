import { z } from "zod";
import { orderItemsTableEnumConfig } from "../../enums/ORMEnums/orderItemTableEnum";

export const orderOptionalValidation = z.object({
  
  id: z.number().optional(),

  user: z.number().optional(),

  totalAmount: z.string().min(orderItemsTableEnumConfig.MinTotalAmount).max(orderItemsTableEnumConfig.MaxTotalAmount).optional(),

  orderTime: z.string().optional()
});
