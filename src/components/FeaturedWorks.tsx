"use client";

import { projects } from "@/data/projects";
import WorkCard from "./WorkCard";
import { useLang } from "./LangProvider";
import Reveal from "./Reveal";

/**
 * Featured Works:黑底 + 极淡视频氛围背景。
 *
 * 视觉分层(z-index):
 *   z-0  ─ <video>           background loop,opacity 0.35
 *   z-0  ─ <div bg-black/45> 黑色遮罩,保证卡片可读
 *   z-10 ─ 标题 / 卡片网格    内容层
 *
 * 视频与遮罩都 pointer-events:none,不抢卡片点击。
 * 现在是 client 组件 —— 因为 eyebrow / 项目卡片标题分类要随语言切换。
 */
export default function FeaturedWorks() {
  const { t } = useLang();

  return (
    <section
      id="works"
      className="relative overflow-hidden bg-ink px-6 py-14 text-white lg:px-12 lg:py-20"
    >
      {/* 视频氛围层 */}
      <video
        className="pointer-events-none absolute inset-0 z-0 h-full w-full object-cover opacity-[0.35]"
        src="/works/video/works-bg.mp4"
        autoPlay
        loop
        muted
        playsInline
        aria-hidden
      />

      {/* 黑色遮罩:压暗视频,保证下方文字 / 卡片清晰 */}
      <div
        className="pointer-events-none absolute inset-0 z-0 bg-black/45"
        aria-hidden
      />

      {/* 内容层 —— eyebrow 与卡片错峰 reveal:eyebrow 先,卡片再 80/180ms */}
      <div className="relative z-10 mx-auto max-w-[1360px]">
        <Reveal>
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.3em]">
            <span
              className="mr-3 inline-block h-px w-8 bg-brand align-middle"
              aria-hidden
            />
            {t.featured.eyebrow}
          </p>
        </Reveal>

        {/* 两张大卡片:手机/平板单列堆叠,桌面端两列各占一半 */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {projects.map((p, i) => (
            <Reveal key={p.id} delay={80 + i * 100}>
              <WorkCard project={p} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
