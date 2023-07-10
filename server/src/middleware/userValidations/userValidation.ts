import validator from "validator";
import { z } from "zod";

export const userValidation = z.object({

  fullName: z.string().regex(/^[A-Za-z]+\s[A-Za-z]+$/),

  email: z.string().email(),

  phoneNumber: z.string().refine((value) => validator.isMobilePhone(value, "he-IL"))

});
