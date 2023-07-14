import { z } from "zod";
import { orderItemsTableEnumConfig } from "../../enums/ORMEnums/orderItemTableEnum";

export const orderItemsValidation = z.object({

  order: z.number(),

 	quantity: z.number().min(orderItemsTableEnumConfig.MinQuantity).max(orderItemsTableEnumConfig.MinQuantity),
  
  price: z.number().min(orderItemsTableEnumConfig.MinPrice).max(orderItemsTableEnumConfig.MaxPrice),

  totalAmount: z.string().min(orderItemsTableEnumConfig.MinTotalAmount).max(orderItemsTableEnumConfig.MaxTotalAmount),

  orderTime: z.string()
});

  
