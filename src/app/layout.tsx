import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import AudioController from "@/components/AudioController";
import LangProvider from "@/components/LangProvider";

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
        {/*
          LangProvider 在全站根挂一次:Header 的 EN/JP 按钮 setLang 后,
          所有读取 useLang() 的组件同时重渲染,无需刷新页面。
          首屏 SSR 固定渲染 en → 客户端挂载后才读 localStorage 切到 jp,
          避免 hydration mismatch。
        */}
        <LangProvider>
          {children}
          {/*
            背景音乐挂在 RootLayout:App Router 下 layout 跨子路由复用,
            首页 ↔ /works/[slug] 切换时该 <audio> 节点不会被卸载,
            播放进度、muted 状态都自然保留。
          */}
          <AudioController />
        </LangProvider>
        {/*
          Vercel Web Analytics —— 自动捕获页面浏览量、来源、设备、地区。
          - 仅在 production 注入脚本,本地开发不影响
          - 零 cookie / GDPR 合规
          - 数据看板:Vercel 项目页 → Analytics 标签
        */}
        <Analytics />
      </body>
    </html>
  );
}
