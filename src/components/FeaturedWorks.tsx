"use client";

import { useState } from "react";
import { projects } from "@/data/projects";
import WorkCard from "./WorkCard";
import { useLang } from "./LangProvider";
import Reveal from "./Reveal";

/**
 * Featured Works:黑底 + 极淡视频氛围背景 + 两个项目"协调式 hover"。
 *
 * 默认状态:NIO / VARIANT 同行并排,VARIANT 静态下移 lg:mt-6(24px)
 *           —— 编辑感的轻微错位,但首屏即可同框看到两个项目
 * Hover 状态:用 React state 协调
 *           · 鼠标进入某张卡 → 该卡为 active(放大 + 上移)
 *           · 另一张自动为 inactive(缩小 + 下移 + 70% 不透明)
 *           · 全部 transition 420ms ease-out
 * 移动端:transform 都用 lg: 前缀 → 自动跳过互斥效果,两卡同等清晰
 */
export default function FeaturedWorks() {
  const { t } = useLang();
  // 当前 hover 的项目 id,null 表示无 hover(默认状态)
  const [hovering, setHovering] = useState<string | null>(null);

  return (
    <section
      id="works"
      className="relative overflow-hidden bg-ink px-6 py-14 text-white lg:px-12 lg:py-20"
    >
      {/* 视频氛围层 —— opacity 再上调到 0.5,视频更显见 */}
      <video
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-[0.5]"
        src="/works/video/works-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      />

      {/* 黑色遮罩 /35 —— 再降一档压暗,让视频成为氛围主角 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-black/35"
        aria-hidden
      />

      {/* 内容层 —— eyebrow + 协调式 hover 网格 */}
      <div className="relative z-10 mx-auto max-w-[1360px]">
        <Reveal>
          <div className="mb-12 flex items-end justify-between gap-6">
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em]">
              <span
                className="mr-3 inline-block h-px w-8 bg-brand align-middle"
                aria-hidden
              />
              {t.featured.eyebrow}
            </p>
            <p className="text-[10px] uppercase tracking-[0.3em] text-white/40">
              <span className="mr-2 font-bold text-white/70 tabular-nums">
                {String(projects.length).padStart(2, "0")}
              </span>
              Projects
            </p>
          </div>
        </Reveal>

        {/*
          桌面(lg+)── 12 列网格,两个项目 row-start-1 各占 6 列
            · NIO   :col-span-6 col-start-1
            · VARIANT:col-span-6 col-start-7 + lg:mt-6(24px 静态错位)
          两卡静止状态下尺寸完全相同(同列宽 + 同 variant),
          视觉主次完全由 hover 协调:鼠标进入哪张 → 那张变 active,
          另一张自动 inactive(缩小 + 下移 + 70% opacity)。
          移动 ── 单列堆叠,无 mt 偏移,无 hover transform
        */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-x-10 lg:gap-y-0">
          {projects[0] && (
            <Reveal
              className="lg:col-span-6 lg:col-start-1 lg:row-start-1"
              delay={80}
            >
              <WorkCard
                project={projects[0]}
                mode={
                  hovering === null
                    ? "default"
                    : hovering === projects[0].id
                    ? "active"
                    : "inactive"
                }
                onPointerEnter={() => setHovering(projects[0]!.id)}
                onPointerLeave={() => setHovering(null)}
              />
            </Reveal>
          )}
          {projects[1] && (
            <Reveal
              className="lg:col-span-6 lg:col-start-7 lg:row-start-1 lg:mt-6"
              delay={220}
            >
              <WorkCard
                project={projects[1]}
                mode={
                  hovering === null
                    ? "default"
                    : hovering === projects[1].id
                    ? "active"
                    : "inactive"
                }
                onPointerEnter={() => setHovering(projects[1]!.id)}
                onPointerLeave={() => setHovering(null)}
              />
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
