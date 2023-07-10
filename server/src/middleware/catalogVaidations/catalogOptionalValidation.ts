import { z } from "zod";
import { cakeTableEnumConfig } from "../../enums/ORMEnums/cakeTableEnum";


export const catalogOptionalValidation = z.object({

  name: z.string().min(cakeTableEnumConfig.MinLengthName).max(cakeTableEnumConfig.MaxLengthName).optional(),

  shortDescription: z.string().min(cakeTableEnumConfig.MinLengthShortDescription).max(cakeTableEnumConfig.MaxLengthShortDescription).optional(),

  longDescription: z.string().min(cakeTableEnumConfig.MinLengthLongDescription).max(cakeTableEnumConfig.MaxLengthLongDescription).optional(),

  price: z.number().min(cakeTableEnumConfig.MinPrice).max(cakeTableEnumConfig.MaxPrice).optional(),

  imageUrl: z.string().url("invalid url string").optional(),

});