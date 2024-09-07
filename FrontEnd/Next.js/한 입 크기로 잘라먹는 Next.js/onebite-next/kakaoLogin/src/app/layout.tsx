"use client";

import "./globals.css";
import Link from "next/link";
import style from "./layout.module.css";
import { BookData } from "@/types";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/footer";

export default function RootLayout({
  children,
  session,
}: Readonly<{
  children: React.ReactNode;
  session: any;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionProvider session={session}>
          <div className={style.container}>
            <header>
              <Link href={"/"}>📚 ONEBITE BOOKS</Link>
              <Link href={"/login"}>📚 로그인</Link>
            </header>
            <main>{children}</main>
            <footer>
              <Footer />
            </footer>
          </div>
        </SessionProvider>
      </body>
    </html>
  );
}
