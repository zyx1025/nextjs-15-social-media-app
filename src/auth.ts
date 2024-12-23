import { PrismaAdapter } from "@lucia-auth/adapter-prisma";
import prisma from "@/lib/prisma";
import { Lucia, Session, User } from "lucia";
import { cache } from "react";
import { cookies } from "next/headers";

//与prisma进行交互的适配器
const adapter = new PrismaAdapter(prisma.session, prisma.user)

export const lucia = new Lucia(
  adapter , {
  sessionCookie: {
      expires: false,     //不设置过期时间，浏览器关闭才生效
      attributes: {
         secure: process.env.NODE_ENV === 'production'
      }
  },
  getUserAttributes(databaseUserAttributes){
    //将数据库中的用户字段映射为 Lucia 使用的用户属性
    return{
        id: databaseUserAttributes.id,
        userId: databaseUserAttributes.userID,
        avatarUrl: databaseUserAttributes.avatarUrl,
    }
  }
})

declare module "lucia" {
   interface Register {
     Lucia: typeof lucia,
     DatabaseUserAttributes: DatabaseUserAttributes
   }
}

//与prisma模型保持一致的数据库表用户字段结构
interface DatabaseUserAttributes {
  id: string,
  userID: string,
  avatarUrl: string | null,
}

export const validateRequest = cache(
  async (): Promise<
    { user: User; session: Session } | { user: null; session: null }
  > => {
    const sessionId = cookies().get(lucia.sessionCookieName)?.value ?? null;

    if (!sessionId) {
      return {
        user: null,
        session: null,
      };
    }

    const result = await lucia.validateSession(sessionId);

    try {
      if (result.session && result.session.fresh) {
        //新会话，重新生成一个会话 cookie
        const sessionCookie = lucia.createSessionCookie(result.session.id);
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
      if (!result.session) {
        //无效会话，创建一个新cookie覆盖
        const sessionCookie = lucia.createBlankSessionCookie();
        cookies().set(
          sessionCookie.name,
          sessionCookie.value,
          sessionCookie.attributes,
        );
      }
    } catch {}

    return result;
  },
);