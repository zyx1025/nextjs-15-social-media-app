import loginImage from "@/assets/login-image.svg";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import LoginForm from "./LoginForm";

export const metadata: Metadata = {
  title: "Login",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[30rem] w-full max-w-[32rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10">
          <h1 className="text-center text-3xl font-bold">登录</h1>
          <div className="space-y-5">
            <LoginForm />
            <Link href="/signup" className="block text-center hover:underline">
                注册账户
            </Link>
          </div>
        </div>
        {/*<Image*/}
        {/*  src={loginImage}*/}
        {/*  alt=""*/}
        {/*  className="hidden w-1/2 object-cover md:block"*/}
        {/*/>*/}
      </div>
    </main>
  );
}