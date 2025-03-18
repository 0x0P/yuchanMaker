import "./globals.css";

import type { Metadata } from "next";
import localFont from "next/font/local";

export const metadata: Metadata = {
  title: "별명찬",
  description: "나만의 유찬을 만들어보세요!",
};

const font = localFont({ src: "../fonts/PretendardVariable.woff2" });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html className={font.className}>
      <body>{children}</body>
    </html>
  );
}
