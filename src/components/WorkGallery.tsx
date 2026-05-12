"use client";

import { useEffect, useState } from "react";
import SmartImage from "./SmartImage";
import type { WorkSection } from "@/data/workDetails";
import type { Lang } from "@/data/i18n";
import { useLang } from "./LangProvider";

/**
 * 详情页画廊:左侧按 section 分组的缩略图,右侧大图 + 说明。
 *
 * 索引模型:section 是渲染分组,大图切换走 *全局 flat index*。
 * 所有 section 的图按顺序展开后,缩略图 01..N 对应全局 index 0..N-1。
 * 上下张按钮在全局数组里循环。
 *
 * 接收双语 sections:{ en, jp }。两套数组顺序、长度、src 严格对齐
 * (由 workDetailsJp.ts 保证),所以 index 在两种语言下都指向同一张图。
 */
export default function WorkGallery({
  sections,
}: {
  sections: Record<Lang, WorkSection[]>;
}) {
  const { lang, t } = useLang();
  const activeSections = sections[lang];

  // 扁平成全局数组(基于当前语言,但图片顺序与另一语言一致)
  const allImages = activeSections.flatMap((s) => s.images);
  const total = allImages.length;

  const [index, setIndex] = useState(0);
  const current = allImages[index];

  if (total === 0 || !current) return null;

  const goTo = (i: number) => setIndex(((i % total) + total) % total);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);
  const reset = () => setIndex(0);

  // 键盘 ← / → 切图;只在详情页才装,卸载时清理。
  // 不监听 Esc / Home / End 等,避免和浏览器原生快捷键冲突。
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      // 忽略输入框聚焦时的按键
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((i) => ((i - 1) % total + total) % total);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setIndex((i) => (i + 1) % total);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  const sectionsWithOffset = activeSections.map((s, i) => ({
    ...s,
    start: activeSections
      .slice(0, i)
      .reduce((sum, sec) => sum + sec.images.length, 0),
  }));

  return (
    <section className="bg-ink px-6 pb-24 text-white lg:px-12 lg:pb-32">
      <div className="mx-auto max-w-[1360px]">
        {/* 与 Hero 之间的细分割线(桌面 + 移动共用) */}
        <div className="border-t border-white/10" aria-hidden />

        {/* ═══ 桌面 lg+ ═══ 缩略图 + 大图 Viewer 双栏布局(原结构) */}
        <div className="mt-12 hidden gap-10 lg:grid lg:grid-cols-12 lg:gap-12">
          {/* ─── 左:缩略图(按 section 分组,组上方有小标题) ─── */}
          <div className="lg:col-span-6">
            {sectionsWithOffset.map((section, sIdx) => (
              <div
                key={section.label}
                className={sIdx === 0 ? "" : "mt-10"}
              >
                {/* Section 小标题 —— 与全站 eyebrow 风格一致 */}
                <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
                  <span
                    className="mr-3 inline-block h-px w-6 bg-brand align-middle"
                    aria-hidden
                  />
                  {section.label}
                </p>

                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
                  {section.images.map((img, localI) => {
                    const i = section.start + localI;
                    const active = i === index;
                    const number = String(i + 1).padStart(2, "0");
                    const fit =
                      img.orientation === "portrait"
                        ? "object-contain"
                        : "object-cover";
                    return (
                      <button
                        key={`${img.src}-${i}`}
                        type="button"
                        onClick={() => setIndex(i)}
                        className={`relative aspect-video overflow-hidden text-left transition-opacity ${
                          active
                            ? "ring-2 ring-brand ring-offset-0"
                            : "opacity-80 hover:opacity-100"
                        }`}
                        aria-label={`Show image ${number}: ${img.title}`}
                        aria-pressed={active}
                      >
                        <SmartImage
                          src={img.src}
                          alt={img.title}
                          className={`absolute inset-0 h-full w-full ${fit}`}
                          fallbackLabel={number}
                        />
                        <span
                          className={`absolute left-2 top-2 rounded-full px-2 py-0.5 text-[10px] font-bold leading-tight tracking-wider ${
                            active
                              ? "bg-brand text-white"
                              : "bg-black/70 text-white/90"
                          }`}
                        >
                          {number}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* ─── 右:大图查看 + 说明 ──────────────────────── */}
          <div className="lg:col-span-6">
            <div className="relative aspect-video overflow-hidden bg-white/[0.04]">
              {/* key={current.src} 让 <img> 每次切图都重挂 → image-fade-in
                  动画自然触发,产生 ~320ms 淡入,不会硬切 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={current.src}
                src={current.src}
                alt={current.title}
                className="image-fade-in absolute inset-0 h-full w-full object-contain"
              />

              {/* 右上 X:回到默认状态(第 1 张) */}
              <button
                type="button"
                onClick={reset}
                className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full border border-white/20 bg-black/40 text-white/80 transition-colors hover:border-brand hover:text-brand"
                aria-label="Reset to first image"
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  aria-hidden
                >
                  <path
                    d="M1 1l12 12M13 1L1 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </button>

              {/* 右下:序号 + 上下箭头 */}
              <div className="absolute bottom-3 right-3 flex items-center gap-2 rounded bg-black/40 px-3 py-2 backdrop-blur">
                <span className="text-xs tabular-nums text-white/80">
                  {index + 1} / {total}
                </span>
                <button
                  type="button"
                  onClick={prev}
                  className="flex h-7 w-7 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-brand hover:text-brand"
                  aria-label="Previous image"
                >
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M5 1L1 5l4 4M1 5h11"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="flex h-7 w-7 items-center justify-center border border-white/20 text-white/80 transition-colors hover:border-brand hover:text-brand"
                  aria-label="Next image"
                >
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    aria-hidden
                  >
                    <path
                      d="M7 1l4 4-4 4M11 5H0"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* 说明区 —— key 让文字也跟着大图一起淡入,节奏统一 */}
            <div key={current.src} className="image-fade-in mt-6">
              <h3 className="text-xl font-bold">{current.title}</h3>

              <div className="mt-4 border-l border-white/15 pl-5">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      {t.workDetail.description}
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-white/80">
                      {current.description}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      {t.workDetail.stage}
                    </dt>
                    <dd className="mt-2 text-sm">{current.stage}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      {t.workDetail.tools}
                    </dt>
                    <dd className="mt-2 text-sm">
                      {current.tools.join(" / ")}
                    </dd>
                  </div>
                </dl>
              </div>
            </div>
          </div>
        </div>

        {/* ═══ 移动 < lg ═══ 垂直图文卡片流
            每张图 = 一张独立卡片:编号 / 大图 / 标题 / 描述 / Stage·Tools 行
            图片紧挨自己的说明,用户滑到哪张就看到哪张的说明,不需要先翻完所有缩略图
            竖图 / 横图都用 w-full h-auto 自然显示,不裁切、不变形 */}
        <div className="mt-10 space-y-14 lg:hidden">
          {sectionsWithOffset.map((section) => (
            <div key={section.label}>
              {/* Section 小标题(与桌面 eyebrow 风格一致) */}
              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70">
                <span
                  className="mr-3 inline-block h-px w-6 bg-brand align-middle"
                  aria-hidden
                />
                {section.label}
              </p>

              <div className="space-y-12">
                {section.images.map((img, localI) => {
                  const i = section.start + localI;
                  const number = String(i + 1).padStart(2, "0");
                  return (
                    <article key={`${img.src}-${i}`} className="space-y-4">
                      {/* 小编号 —— 红色 / 等宽数字 */}
                      <span className="block font-mono text-[11px] font-bold tabular-nums tracking-wider text-brand">
                        {number}
                      </span>

                      {/* 图片 —— 横竖都用 w-full h-auto,保持原比例不变形
                          loading lazy / decoding async:移动端节省流量与渲染 */}
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.src}
                        alt={img.title}
                        loading="lazy"
                        decoding="async"
                        className="block h-auto w-full bg-white/[0.04]"
                      />

                      {/* 标题 + 描述紧挨图片 */}
                      <h3 className="text-[17px] font-bold leading-snug">
                        {img.title}
                      </h3>
                      <p className="text-[14px] leading-relaxed text-white/80">
                        {img.description}
                      </p>

                      {/* Stage / Tools 小信息行 —— 两列紧凑,不抢主内容 */}
                      <dl className="grid grid-cols-2 gap-x-4 gap-y-3 border-t border-white/10 pt-4">
                        <div>
                          <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                            {t.workDetail.stage}
                          </dt>
                          <dd className="mt-1.5 text-[12px] text-white/85">
                            {img.stage}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                            {t.workDetail.tools}
                          </dt>
                          <dd className="mt-1.5 text-[12px] text-white/85">
                            {img.tools.join(" / ")}
                          </dd>
                        </div>
                      </dl>
                    </article>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
