import type { Metadata } from "next";
import { Geist, Geist_Mono, DM_Sans, Quicksand } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["500", "700"],
});
const quicksand = Quicksand({
  variable: "--font-quicksand",
  subsets: ["latin"],
  weight: ["500", "700"],
});

export const metadata: Metadata = {
  title: "IQLAB — 김동순 교수 연구실 | 세종대학교 반도체시스템공학과",
  description:
    "세종대학교 반도체시스템공학과 김동순 교수 연구실. 엣지 AI 가속기, NPU 가상화, Transformer accelerator, 뉴로모픽 SNN, NoC 기반 에지 프로세서, 초음파 ToF 신호처리 및 비선형 센서 보정 연구.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko" className={`${geistSans.variable} ${geistMono.variable} ${dmSans.variable} ${quicksand.variable}`}>
      <body className="bg-black text-white antialiased">{children}</body>
    </html>
  );
}
