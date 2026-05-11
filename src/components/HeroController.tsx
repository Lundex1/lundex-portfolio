"use client";

import { useEffect, useState } from "react";
import Hero from "./Hero";
import IntroOverlay from "./IntroOverlay";

/**
 * 首页 "Intro → Hero" 编排:
 *   1. 默认 introDone = false,Hero 保持 opacity:0 静止态
 *   2. IntroOverlay 播放 ~2.8s 后调用 onComplete
 *   3. setIntroDone(true) → Hero 节点新增 .animate-hero-title,触发 CSS 动画
 *
 * ─── Intro 播放策略 ──────────────────────────────────
 * 触发播放的场景:
 *   · 浏览器首次打开本站(本会话)
 *   · 用户手动刷新首页(F5 / Ctrl+R / 地址栏 Enter)
 * 跳过播放的场景:
 *   · 从 /works/[slug] 点 Back to Works 返回首页(站内导航)
 *
 * 实现:
 *   · sessionStorage("introPlayed" = "true") 用来区分"已经在本会话内播过"
 *     —— 站内 detail page ↔ home 切换不重播
 *   · PerformanceNavigationTiming.type === "reload" 判断当前是不是刷新
 *     —— 是刷新就先把 sessionStorage 标记清掉,允许 Intro 再播一次
 *
 * SSR 安全:sessionStorage / performance 仅在 useEffect 内访问。
 * SSR / 首帧默认渲染 IntroOverlay(因为前 ~140ms opacity:0,实际不可见),
 * 客户端 useEffect 同步判断;若该跳过,setShouldPlayIntro(false) 立刻卸掉。
 *
 * 抽出客户端容器是为了让 page.tsx 仍可保持 Server Component。
 */

const STORAGE_KEY = "introPlayed";

/** 当前页面加载是否为浏览器刷新(F5 / reload)。SSR 安全:server 端永远返回 false。 */
function isPageReload(): boolean {
  if (typeof window === "undefined" || typeof performance === "undefined") {
    return false;
  }
  try {
    // PerformanceNavigationTiming 是现代浏览器(Chrome/Edge/Firefox/Safari 15+)
    // 的标准 API,直接读 type 字段即可。
    const [entry] = performance.getEntriesByType(
      "navigation",
    ) as PerformanceNavigationTiming[];
    return entry?.type === "reload";
  } catch {
    return false;
  }
}

export default function HeroController() {
  // SSR 与首帧:默认渲染 Intro。客户端 useEffect 里若发现已播过,立刻卸掉。
  const [shouldPlayIntro, setShouldPlayIntro] = useState(true);
  const [introDone, setIntroDone] = useState(false);

  useEffect(() => {
    // 1. 刷新页面:清掉历史标记,让 Intro 重新播放
    if (isPageReload()) {
      sessionStorage.removeItem(STORAGE_KEY);
      // 保持 shouldPlayIntro=true,introDone=false,让 IntroOverlay 正常播
      return;
    }

    // 2. 非刷新进入(站内跳转 / 后退):若已播过则跳过
    if (sessionStorage.getItem(STORAGE_KEY) === "true") {
      setShouldPlayIntro(false);
      setIntroDone(true); // 直接放行 Hero 动画
    }
  }, []);

  const handleComplete = () => {
    try {
      sessionStorage.setItem(STORAGE_KEY, "true");
    } catch {
      // 隐私模式 / 配额异常等场景:静默忽略,本会话继续按"已播放"对待
    }
    setIntroDone(true);
  };

  return (
    <>
      <Hero start={introDone} />
      {shouldPlayIntro && <IntroOverlay onComplete={handleComplete} />}
    </>
  );
}
