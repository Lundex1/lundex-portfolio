import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AudioController from "@/components/AudioController";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "LUNDEX — Environment Concept Designer",
  description:
    "Environment concept design for game spaces, cinematic mood, and 3D-assisted design workflows.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans">
        {children}
        {/*
          背景音乐挂在 RootLayout:App Router 下 layout 跨子路由复用,
          首页 ↔ /works/[slug] 切换时该 <audio> 节点不会被卸载,
          播放进度、muted 状态都自然保留。
        */}
        <AudioController />
      </body>
    </html>
  );
}
