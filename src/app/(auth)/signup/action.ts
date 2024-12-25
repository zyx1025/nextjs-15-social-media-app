"use server";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient()
import { lucia } from "@/auth";
import { signUpSchema, SignUpValues } from "@/lib/validation";
import { hash } from "@node-rs/argon2";
import { isRedirectError } from "next/dist/client/components/redirect";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export async function signUp(
  credentials: SignUpValues,
): Promise<{ error: string }> {
  try {
    const { userId, password } = signUpSchema.parse(credentials);

    const passwordHash = await hash(password, {
      memoryCost: 19456,
      timeCost: 2,
      outputLen: 32,
     parallelism: 1,
    });

    //检查用户名是否存在
    const existingUser = await prisma.user.findUnique({
      where: {
        userID: userId,
      },
    });

    if (existingUser) {
      return {
        error: "Username already taken",
      };
    }

    // 创建用户及其初始成绩记录（可选）
    await prisma.$transaction(async (tx) => {
      // 创建用户
      await tx.user.create({
        data: {
          id: userId,
          userID: userId,
          passwordHash,
        },
      });
    });

    //注册成功，进入主页
    const session = await lucia.createSession(userId, {});
    const sessionCookie = lucia.createSessionCookie(session.id);
    cookies().set(
      sessionCookie.name,
      sessionCookie.value,
      sessionCookie.attributes,
    );

    return redirect("/");
  } catch (error) {
    if (isRedirectError(error)){
        throw error;
    }
    console.error(error);
    return {
      error: "Something went wrong. Please try again.",
    };
  }
}
