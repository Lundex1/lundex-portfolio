"use client";

import Link from "next/link";
import type { Project } from "@/data/projects";
import { useLang } from "./LangProvider";

/**
 * Featured Works 区域的单卡 —— 两张大卡片版本。
 *
 * Hover 行为(由 `group` + `group-hover` 驱动):
 *   - 封面图:scale-[1.03] 轻微放大
 *   - 信息条:背景 transparent → 主题红;所有文字 白 / 灰 → 黑;
 *            红短线 → 黑短线;右箭头白 → 黑
 *   - 过渡时长 300ms,落在用户给的 250-350ms 区间
 *
 * project.title / project.category 现在是 { en, jp } 双语对象,
 * 通过 useLang() 选择当前语言下的字符串渲染。
 */
export default function WorkCard({ project }: { project: Project }) {
  const { lang } = useLang();
  const title = project.title[lang];
  const category = project.category[lang];

  return (
    <Link
      href={`/works/${project.id}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <article className="group">
        {/* 封面图 */}
        <div className="relative aspect-video overflow-hidden bg-white/[0.04]">
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03]"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl font-black text-white/10">
                {project.number}
              </span>
            </div>
          )}
        </div>

        {/* 信息条:默认透明(显出 section 黑底),hover 时整块变红、文字全部变黑 */}
        <div className="flex items-center gap-5 bg-transparent px-5 py-5 transition-colors duration-300 group-hover:bg-brand">
          {/* 序号 + 红短线 */}
          <div className="shrink-0">
            <div className="text-[46px] font-black leading-none text-white transition-colors duration-300 group-hover:text-ink">
              {project.number}
            </div>
            <div className="mt-2 h-0.5 w-6 bg-brand transition-colors duration-300 group-hover:bg-ink" />
          </div>

          {/* 标题 + 分类 */}
          <div className="min-w-0 flex-1">
            <h3 className="text-[26px] font-extrabold tracking-tight text-white transition-colors duration-300 group-hover:text-ink sm:text-[31px]">
              {title}
            </h3>
            <p className="mt-1 text-xs text-white/50 transition-colors duration-300 group-hover:text-ink/70">
              {category}
            </p>
          </div>

          {/* 右箭头:hover 时整条变红 + 箭头向右滑 4px */}
          <div className="shrink-0 text-white transition-colors duration-300 group-hover:text-ink">
            <svg
              width="26"
              height="12"
              viewBox="0 0 26 12"
              fill="none"
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
            >
              <path
                d="M19 1l5 5-5 5M0 6h23"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </div>
        </div>
      </article>
    </Link>
  );
}
