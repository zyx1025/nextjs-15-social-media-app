import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThemeProvider } from "next-themes";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export const metadata: Metadata = {
  title: {
    template: "%s | 智慧学工就业推荐系统",
    default: "智慧学工就业推荐系统",
  },
  description: "为北京理工大学计算机学院学生提供就业推荐和就业指导",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ThemeProvider
          attribute={"class"}
          defaultTheme={"system"}
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>

      </body>
    </html>
  );
}
