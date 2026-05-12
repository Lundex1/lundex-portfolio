"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import { useLang } from "./LangProvider";

/**
 * Featured Works 卡片(编辑式版本)。
 *
 * 视觉变化:
 *   · 图层叠编号 —— 半透 white/15,hover 加亮,作品集"目录页"感
 *   · 图左下角浮一条分类小条 —— 替代原来 info bar 里的分类小字
 *   · 标题区:细红线 + 标题 + 箭头;红线在 hover 时变长(8 → 16)
 *   · hover 整条信息区仍变 bg-brand,文字反白 → 黑,保留站内已有的交互语言
 *
 * variant:
 *   · "featured" → 标题字号更大,编号叠图更大,作为视觉锚点(NIO)
 *   · 默认       → 标准尺寸(VARIANT)
 *
 * mode(由父级 FeaturedWorks 协调):
 *   · "default"  → 无外加 transform,作为静止/双方都未 hover 的状态
 *   · "active"   → 当前卡被 hover:scale 1.04 + translateY -16
 *   · "inactive" → 兄弟卡被 hover:scale 0.97 + translateY +16 + opacity 0.7
 *   所有 transform 都用 lg: 前缀 → 移动端不进行 hover 互斥,
 *   保持两个项目同等清晰。
 *
 * onPointerEnter / onPointerLeave 由父级注入,
 * 父级用 useState 决定哪张卡处于 active。
 */
export default function WorkCard({
  project,
  variant = "default",
  mode = "default",
  onPointerEnter,
  onPointerLeave,
}: {
  project: Project;
  variant?: "featured" | "default";
  mode?: "default" | "active" | "inactive";
  onPointerEnter?: () => void;
  onPointerLeave?: () => void;
}) {
  const { lang } = useLang();
  const title = project.title[lang];
  const category = project.category[lang];
  const isFeatured = variant === "featured";

  // mode → 桌面 lg+ 的 transform / opacity。Tailwind 不能动态拼,所以列出三种组合。
  // 仅 lg: 生效 → 移动端永远是默认尺寸不互斥。
  const modeClass =
    mode === "active"
      ? "lg:-translate-y-4 lg:scale-[1.04]"
      : mode === "inactive"
      ? "lg:translate-y-4 lg:scale-[0.97] lg:opacity-70"
      : "";

  return (
    <Link
      href={`/works/${project.id}`}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
      style={{ transformOrigin: "center center" }}
      className={`block transition-all duration-[420ms] ease-out focus:outline-none focus-visible:ring-2 focus-visible:ring-brand ${modeClass}`}
    >
      <article className="group">
        {/* 封面图 + 叠层 */}
        <div className="relative aspect-video overflow-hidden bg-white/[0.04]">
          {project.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-[1.04]"
            />
          )}

          {/* 编号水印 —— 右上,白色半透,hover 时更亮、稍向左滑
              默认尺寸略上调(110→128),配合 VARIANT 加宽 */}
          <span
            aria-hidden
            className={`pointer-events-none absolute right-4 top-2 select-none font-black leading-none text-white/15 transition-all duration-500 ease-out group-hover:text-white/35 ${
              isFeatured
                ? "text-[88px] sm:text-[120px] lg:text-[150px]"
                : "text-[78px] sm:text-[104px] lg:text-[128px]"
            }`}
          >
            {project.number}
          </span>

          {/* 分类小条 —— 左下,半透黑底,前缀小红线;作品集"标签"语境
              字号 10 → 11,文字 /90 → 100%,横条 padding 也略增,
              可读性提升一档但仍是"标签"不抢主标题 */}
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-2 bg-black/55 px-3 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-white backdrop-blur-sm">
            <span className="block h-px w-3 bg-brand" aria-hidden />
            {category}
          </span>
        </div>

        {/* 信息条:hover 时整块变红
            布局重构:顶部红线独立一行,下方是 [标题 ⇄ 箭头] 的 flex items-center
            → 箭头视觉中心严格对齐标题文字 y 轴中线,不再贴底偏低 */}
        <div className="flex flex-col gap-3 bg-transparent px-5 py-6 transition-colors duration-300 group-hover:bg-brand">
          {/* 红线指示器 —— hover 时变长,翻页感 */}
          <div
            aria-hidden
            className="h-[2px] w-8 bg-brand transition-all duration-300 group-hover:w-16 group-hover:bg-ink"
          />

          {/* 标题 + 箭头同一 flex row,items-center 让箭头钉在标题视觉中心 */}
          <div className="flex items-center gap-5">
            <h3
              className={`min-w-0 flex-1 font-extrabold tracking-tight text-white transition-colors duration-300 group-hover:text-ink ${
                isFeatured
                  ? "text-[30px] sm:text-[40px] lg:text-[48px]"
                  : "text-[26px] sm:text-[32px] lg:text-[36px]"
              }`}
            >
              {title}
            </h3>

            {/* 箭头:再 +15% → 46×21,stroke 2 → 2.4(更粗一档,极简线性)
                hover translate-x 由 3 → 2(12px → 8px,落在 6–10px 区间) */}
            <div className="shrink-0 text-white transition-colors duration-300 group-hover:text-ink">
              <svg
                width="46"
                height="21"
                viewBox="0 0 46 21"
                fill="none"
                aria-hidden
                className="transition-transform duration-300 group-hover:translate-x-2"
              >
                <path
                  d="M35 1.5l9 9-9 9M0 10.5h42"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="square"
                />
              </svg>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
