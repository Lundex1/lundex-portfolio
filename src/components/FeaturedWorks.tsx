import { projects } from "@/data/projects";
import WorkCard from "./WorkCard";

/**
 * Featured Works:黑底 + 极淡视频氛围背景。
 *
 * 视觉分层(z-index):
 *   z-0  ─ <video>           background loop,opacity 0.15
 *   z-0  ─ <div bg-black/70> 黑色遮罩,保证卡片可读
 *   z-10 ─ 标题 / 卡片网格    内容层
 *
 * 视频与遮罩都 pointer-events:none,不抢卡片点击。
 * <video> 走静音 + playsInline,iOS Safari 上不会因有声拦截 autoplay。
 */
export default function FeaturedWorks() {
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

      {/* 内容层 */}
      <div className="relative z-10 mx-auto max-w-[1360px]">
        <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.3em]">
          <span
            className="mr-3 inline-block h-px w-8 bg-brand align-middle"
            aria-hidden
          />
          Featured Works
        </p>

        {/* 两张大卡片:手机/平板单列堆叠,桌面端两列各占一半 */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-10">
          {projects.map((p) => (
            <WorkCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
