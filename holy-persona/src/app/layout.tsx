import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Holy Persona - 성경 인물과 매칭되는 당신의 성격 유형",
  description: "AI 기반 성격 분석으로 성경 속 인물과 매칭되는 당신의 성격 유형을 알아보세요.",
  keywords: ["성경", "AI", "성격분석", "기독교", "성경인물", "성경캐릭터"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body className={inter.className}>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
