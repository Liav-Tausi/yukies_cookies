import { z } from "zod";
import { cakeTableEnumConfig } from "../../enums/ORMEnums/cakeTableEnum";

export const catalogValidation = z.object({

  name: z.string().min(cakeTableEnumConfig.MinLengthName).max(cakeTableEnumConfig.MaxLengthName),

  shortDescription: z.string().min(cakeTableEnumConfig.MinLengthShortDescription).max(cakeTableEnumConfig.MaxLengthShortDescription),

  longDescription: z.string().min(cakeTableEnumConfig.MinLengthLongDescription).max(cakeTableEnumConfig.MaxLengthLongDescription),

  price: z.number().min(cakeTableEnumConfig.MinPrice).max(cakeTableEnumConfig.MaxPrice),

  imageUrl: z.string().url("invalid url string")

});

  
