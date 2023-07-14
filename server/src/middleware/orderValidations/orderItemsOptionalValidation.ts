import { z } from "zod";
import { orderItemsTableEnumConfig } from "../../enums/ORMEnums/orderItemTableEnum";

export const orderItemsOptionalValidation = z.object({

  order: z.number().optional(),

 	quantity: z.number().min(orderItemsTableEnumConfig.MinQuantity).max(orderItemsTableEnumConfig.MinQuantity).optional(),
  
  price: z.number().min(orderItemsTableEnumConfig.MinPrice).max(orderItemsTableEnumConfig.MaxPrice).optional(),

  totalAmount: z.string().min(orderItemsTableEnumConfig.MinTotalAmount).max(orderItemsTableEnumConfig.MaxTotalAmount).optional(),

  orderTime: z.string().optional()
});

  
