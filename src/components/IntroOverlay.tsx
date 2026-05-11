"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 首页进场动画 —— 黑底红字,字距扩散后整体淡出。
 *
 * 视觉由 globals.css 的 .intro-overlay / .intro-title / .intro-sub 驱动。
 *
 * ─── Intro 与 Hero 的无缝衔接 ─────────────────────────────
 * 不用 setTimeout 估算 CSS 动画结束时间(setTimeout 与视觉帧之间会有
 * 16~100ms 漂移,造成 "Intro 淡完后等一下 Hero 才动"的视觉空档)。
 * 改用 `animationend` 事件:浏览器在 CSS 动画到达 100% 关键帧那一帧
 * 触发该事件,与视觉淡出结束严格同时。onComplete 在该回调里同步触发,
 * Hero 在同一个 React render cycle 拿到 start=true,zero gap。
 *
 * ─── 调参速查 ────────────────────────────────────────────
 *  · 总时长       : globals.css 中 .intro-overlay 的 --intro-duration
 *  · 字距扩散幅度 : globals.css 中 .intro-title 的 --intro-spread-max
 *  · 颜色         : 沿用全站 --color-brand
 */

// reduced-motion 模式下的快速淡出时长
const REDUCED_MS = 500;
// 兜底定时器:标签页切到后台等极端情况下 animationend 可能不触发,
// 此值必须比 globals.css 中 --intro-duration 大一些
const FALLBACK_MS = 3500;

export default function IntroOverlay({
  onComplete,
}: {
  /** Intro 视觉结束(animationend)的同一帧立即触发,父组件用它启动 Hero 动画 */
  onComplete?: () => void;
}) {
  const [done, setDone] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  // 用 ref 保存 onComplete,避免父组件重渲染时回调引用变化
  const onCompleteRef = useRef(onComplete);
  // 同步最新引用在独立 effect 里执行(render 期写 ref 会被 react-hooks lint 拦截)
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    const reduced =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const finish = () => {
      setDone(true);
      onCompleteRef.current?.();
    };

    // reduced-motion:无 CSS 字距动画,直接定时关闭
    if (reduced) {
      const t = setTimeout(finish, REDUCED_MS);
      return () => clearTimeout(t);
    }

    const overlay = overlayRef.current;
    if (!overlay) return;

    // 子元素(.intro-title / .intro-sub)的 animationend 也会冒泡上来,
    // 用 animationName 过滤,只响应 overlay 自己的淡出动画
    const handleAnimEnd = (e: AnimationEvent) => {
      if (e.animationName === "intro-overlay-fade") finish();
    };
    overlay.addEventListener("animationend", handleAnimEnd);

    // 兜底:event 因任何原因没触发时不至于卡死
    const fallback = setTimeout(finish, FALLBACK_MS);

    return () => {
      overlay.removeEventListener("animationend", handleAnimEnd);
      clearTimeout(fallback);
    };
  }, []);

  if (done) return null;

  return (
    <div
      ref={overlayRef}
      className="intro-overlay fixed inset-0 z-[9999] flex flex-col items-center justify-center overflow-hidden bg-[#050505]"
      aria-hidden
    >
      <h1 className="intro-title">LUNDEX</h1>
      <p className="intro-sub">ENVIRONMENT CONCEPT ART</p>
    </div>
  );
}
