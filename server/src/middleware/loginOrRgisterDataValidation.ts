import { z } from "zod";
import validator from "validator";

export const registerValidation = z.object({
  email: z.string().email().refine(Boolean, { message: "Email is required" }),

  fullName: z.string().regex(/^[A-Za-z]+\s[A-Za-z]+$/, {
    message: "Invalid full name format"
  }).refine(Boolean, { message: "Full name is required" }),

  phoneNumber: z.string().refine((value) => validator.isMobilePhone(value, "he-IL"), {
    message: "Invalid israeli phone number"
  }).refine(Boolean, { message: "Israeli phone number is required" }),

  address: z.string(),

  password: z.string().regex(/^(?=.*\d.*\d)(?=.*[A-Z]).{8,}$/ , {
    message: "Invalid password format!, must have at list 8 characters, 1 uppercase, 2 digits"
  }).refine(Boolean, { message: "Password is required" }),
});

export const loginValidation = z.object({
  email: z.string().email().optional(),

  phoneNumber: z
    .string()
    .refine((value) => validator.isMobilePhone(value, "he-IL"), { message: "Invalid Israeli phone number" })
    .optional(),

  password: z.string().regex(/^(?=.*\d.*\d)(?=.*[A-Z]).{8,}$/, {
    message: "Invalid password format!, must have at list 8 characters, 1 uppercase, 2 digits"
  }).refine(Boolean, { message: "Password is required" }),
})