"use client";

import { useState } from "react";
import SmartImage from "./SmartImage";
import type { WorkSection } from "@/data/workDetails";

/**
 * 详情页画廊:左侧按 section 分组的缩略图,右侧大图 + 说明。
 *
 * 索引模型:section 是渲染分组,大图切换走 *全局 flat index*。
 * 所有 section 的图按顺序展开后,缩略图 01..N 对应全局 index 0..N-1。
 * 上下张按钮在全局数组里循环。
 */
export default function WorkGallery({
  sections,
}: {
  sections: WorkSection[];
}) {
  // 把所有 section 的图扁平成全局数组,用于 viewer 和上下张导航
  const allImages = sections.flatMap((s) => s.images);
  const total = allImages.length;

  const [index, setIndex] = useState(0);
  const current = allImages[index];

  if (total === 0 || !current) return null;

  // 上一张/下一张:循环不出界
  const goTo = (i: number) => setIndex(((i % total) + total) % total);
  const prev = () => goTo(index - 1);
  const next = () => goTo(index + 1);
  // 关闭按钮:回到默认状态(第 1 张)
  const reset = () => setIndex(0);

  // 给每个 section 计算它在全局扁平数组中的起始下标,
  // 这样渲染分组时仍能算出每张图的全局 index(01..N)。
  // 用 slice+reduce 纯函数式,避免 react-hooks lint 在 map 回调里抓"render 后 reassign"。
  const sectionsWithOffset = sections.map((s, i) => ({
    ...s,
    start: sections
      .slice(0, i)
      .reduce((sum, sec) => sum + sec.images.length, 0),
  }));

  return (
    <section className="bg-ink px-6 pb-24 text-white lg:px-12 lg:pb-32">
      <div className="mx-auto max-w-[1360px]">
        {/* 与 Hero 之间的细分割线 */}
        <div className="border-t border-white/10" aria-hidden />

        <div className="mt-12 grid gap-10 lg:grid-cols-12 lg:gap-12">
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
                    // 竖图用 contain 不裁切;横图正常 cover 撑满
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
              {/* 直接用普通 <img>:不走 SmartImage 的 errored state,
                  保证 src 切换永远稳定;object-contain 保留全图不裁切 */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={current.src}
                alt={current.title}
                className="absolute inset-0 h-full w-full object-contain"
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

            {/* 说明区 */}
            <div className="mt-6">
              <h3 className="text-xl font-bold">{current.title}</h3>

              <div className="mt-4 border-l border-white/15 pl-5">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      Description
                    </dt>
                    <dd className="mt-2 text-sm leading-relaxed text-white/80">
                      {current.description}
                    </dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      Stage
                    </dt>
                    <dd className="mt-2 text-sm">{current.stage}</dd>
                  </div>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                      Tools
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
      </div>
    </section>
  );
}
