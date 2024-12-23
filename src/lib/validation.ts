import { z } from "zod";

//长度小于1则报错Required
const requiredString = z.string().trim().min(1, "Required");

export const signUpSchema = z.object({
  userId: requiredString.regex(
    /^[0-9_-]+$/,
    "Only numbers allowed",
  ),
  password: requiredString.min(8, "Must be at least 8 characters"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  userId: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;