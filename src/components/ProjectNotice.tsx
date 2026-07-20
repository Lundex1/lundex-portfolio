"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LangProvider";

/**
 * 进入项目详情页时浮现的「公司通告」弹窗。
 *
 * 世界观内的道具:MERIDIAN CONSOLIDATED 提醒访客本页并非毕业作品全部内容。
 * 目前只挂在 CULMINATION 详情页(由 page.tsx 按 slug 决定是否渲染)。
 *
 * 行为:
 *   · 挂载后延迟 ~450ms 浮现(等页面 page-in 淡入结束,不打架)
 *   · 关闭方式:按钮 / 点击遮罩 / Esc
 *   · 打开期间锁滚动,并把焦点移到确认按钮(键盘可直接回车关闭)
 *   · 文案走 i18n,三语随语言切换
 */
export default function ProjectNotice() {
  const { t } = useLang();
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);
  const btnRef = useRef<HTMLButtonElement>(null);

  // 延迟浮现,避开详情页自身的 page-in 淡入
  useEffect(() => {
    const id = window.setTimeout(() => setMounted(true), 450);
    return () => window.clearTimeout(id);
  }, []);

  // 打开时锁滚动 + 聚焦确认按钮 + 监听 Esc
  useEffect(() => {
    if (!mounted || closing) return;

    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    btnRef.current?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        setClosing(true);
      }
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [mounted, closing]);

  if (!mounted || closing) return null;

  const close = () => setClosing(true);

  return (
    <div
      className="notice-overlay fixed inset-0 z-[70] flex items-center justify-center px-5"
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-notice-title"
      aria-describedby="project-notice-body"
    >
      {/* 遮罩 —— 点击关闭。无卡片衬底,所以压得更暗以保证白字对比度 */}
      <button
        type="button"
        aria-label={t.projectNotice.dismiss}
        onClick={close}
        className="absolute inset-0 h-full w-full cursor-default bg-black/88 backdrop-blur-sm"
        tabIndex={-1}
      />

      {/* 内容直接浮在遮罩上 —— 无底板,标志 + 白字 */}
      <div className="notice-card relative w-full max-w-[420px] text-center">
        {/* 公司标志(深底反白版:橙色圆盘保留,字改米白) */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/works/project3/meridian-logo-light.png"
          alt="MERIDIAN CONSOLIDATED"
          className="mx-auto mb-8 block h-auto w-[260px] object-contain"
        />

        {/* 公司名已在标志图里,这里只留给屏幕阅读器,避免视觉重复 */}
        <h2 id="project-notice-title" className="sr-only">
          {t.projectNotice.title}
        </h2>

        <p className="text-[10px] font-bold uppercase tracking-[0.35em] text-brand">
          {t.projectNotice.eyebrow}
        </p>

        <div className="mx-auto mt-4 h-px w-16 bg-white/25" aria-hidden />

        <p
          id="project-notice-body"
          className="mt-5 text-[14px] leading-relaxed text-white/90"
        >
          {t.projectNotice.body}
        </p>

        <button
          ref={btnRef}
          type="button"
          onClick={close}
          className="mt-9 border border-white/40 px-10 py-3 text-[12px] font-bold uppercase tracking-[0.2em] text-white transition-colors hover:border-brand hover:bg-brand hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-black"
        >
          {t.projectNotice.dismiss}
        </button>
      </div>
    </div>
  );
}
