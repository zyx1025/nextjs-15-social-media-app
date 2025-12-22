import signupImage from "@/assets/signup-image.jpg";
import { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import SignUpForm from "./SignUpForm";

export const metadata: Metadata = {
  title: "Sign Up",
};

export default function Page() {
  return (
    <main className="flex h-screen items-center justify-center p-5">
      <div className="flex h-full max-h-[30rem] w-full max-w-[32rem] overflow-hidden rounded-2xl bg-card shadow-2xl">
        <div className="w-full space-y-10 overflow-y-auto p-10 ">
          <div className="space-y-1 text-center">
            <h1 className="text-3xl font-bold">注册</h1>

          </div>
          <div className="space-y-5">
            <SignUpForm />

            {/*回到登录界面*/}
            <Link href="/login" className="block text-center hover:underline">
              返回登录界面
            </Link>

          </div>
        </div>
        {/*<Image*/}
        {/*  src={signupImage}*/}
        {/*  alt=""*/}
        {/*  className="hidden w-1/2 object-cover md:block"*/}
        {/*/>*/}
      </div>
    </main>
  );
}