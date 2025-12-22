import { z } from "zod";

//长度小于1则报错Required
const requiredString = z.string().trim().min(1, "必填");

export const signUpSchema = z.object({
  userId: requiredString.regex(
    /^[0-9_-]+$/,
    "学号只能为多位数字",
  ),
  password: requiredString.min(8, "密码至少8位"),
});

export type SignUpValues = z.infer<typeof signUpSchema>;

export const loginSchema = z.object({
  userId: requiredString,
  password: requiredString,
});

export type LoginValues = z.infer<typeof loginSchema>;