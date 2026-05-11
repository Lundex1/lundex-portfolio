"use client";

import Link from "next/link";
import { workDetails } from "@/data/workDetails";
import { workDetailsJp } from "@/data/workDetailsJp";
import { useLang } from "./LangProvider";

/**
 * 详情页底部"下一/上一项目"导航。
 *
 * 数据驱动:从当前 slug 在 workDetails 中的索引推算目标。
 *   · 不是最后一项 → "Next Project" 指向下一项
 *   · 是最后一项   → "Previous Project" 指向上一项
 * 增删项目时不需要改这个组件,自动适配。
 *
 * 视觉:延续 WorkCard 的 hover 语言 —— 透明 → bg-brand,白字 → 黑字,
 * 箭头沿方向位移。整条卡片可点击,移动端 100% 宽。
 */
export default function NextProjectLink({
  currentSlug,
}: {
  currentSlug: string;
}) {
  const { lang, t } = useLang();

  // 根据语言选用对应的数据源 —— 两份数组 slug / 顺序严格对齐
  const list = lang === "jp" ? workDetailsJp : workDetails;
  const idx = list.findIndex((w) => w.slug === currentSlug);
  if (idx < 0) return null;

  // 优先 next,无 next 时回退到 previous;两者都不存在(只有 1 个项目)→ 不渲染
  const direction: "next" | "previous" =
    idx < list.length - 1 ? "next" : "previous";
  const targetIdx = direction === "next" ? idx + 1 : idx - 1;
  const target = list[targetIdx];
  if (!target) return null;

  const label =
    direction === "next"
      ? t.workDetail.nextProject
      : t.workDetail.previousProject;

  // previous 时整条左右镜像:箭头在左,文字右对齐;next 时常规左文右箭头
  const isPrev = direction === "previous";

  return (
    <section className="bg-ink text-white">
      <div className="mx-auto max-w-[1360px] px-6 lg:px-12">
        <Link
          href={`/works/${target.slug}`}
          aria-label={`${label}: ${target.title}`}
          className={`group flex items-center gap-5 border-t border-white/10 px-2 py-10 transition-colors duration-300 hover:bg-brand sm:gap-8 sm:py-14 ${
            isPrev ? "flex-row-reverse" : ""
          }`}
        >
          {/* 文案块 —— 三行:小标签 / 序号+标题 / 分类。整体宽度自适应 */}
          <div className={`min-w-0 flex-1 ${isPrev ? "text-right" : ""}`}>
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-brand transition-colors duration-300 group-hover:text-ink">
              {label}
            </p>
            <div
              className={`mt-3 flex items-baseline gap-3 sm:gap-5 ${
                isPrev ? "justify-end" : ""
              }`}
            >
              <span className="text-2xl font-black text-white/40 transition-colors duration-300 group-hover:text-ink/60 sm:text-3xl">
                {target.number}
              </span>
              <h2 className="text-[26px] font-extrabold tracking-tight text-white transition-colors duration-300 group-hover:text-ink sm:text-[34px] lg:text-[40px]">
                {target.title}
              </h2>
            </div>
            <p className="mt-1.5 text-xs text-white/55 transition-colors duration-300 group-hover:text-ink/70 sm:text-sm">
              {target.category}
            </p>
          </div>

          {/* 箭头:next → / previous ←,hover 沿方向滑出 */}
          <div className="shrink-0 text-white transition-colors duration-300 group-hover:text-ink">
            <svg
              width="32"
              height="14"
              viewBox="0 0 32 14"
              fill="none"
              aria-hidden
              className={`transition-transform duration-300 ${
                isPrev
                  ? "group-hover:-translate-x-2"
                  : "group-hover:translate-x-2"
              }`}
            >
              {isPrev ? (
                <path
                  d="M8 1L2 7l6 6M32 7H4"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              ) : (
                <path
                  d="M24 1l6 6-6 6M0 7h28"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
              )}
            </svg>
          </div>
        </Link>
      </div>
    </section>
  );
}
