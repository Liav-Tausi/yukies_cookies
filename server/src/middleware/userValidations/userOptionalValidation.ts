import validator from "validator";
import { z } from "zod";

export const userOptionalValidation = z.object({
  id: z.number().optional(),

  fullName: z.string().regex(/^[A-Za-z]+\s[A-Za-z]+$/).optional(),

  email: z.string().email().optional(),

  phoneNumber: z.string().refine((value) => validator.isMobilePhone(value, "he-IL")).optional()

});