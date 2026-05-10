"use client";

import GeometricArt from "./GeometricArt";

/**
 * 首页 Hero 区域。
 *
 * `start` 控制入场动画是否激活:
 *   · false → 标题 / 简介 className 为 "opacity-0",静止隐藏,不挂任何 animation
 *   · true  → 切换到 "animate-hero-title" / "animate-hero-desc",
 *             浏览器在 className 改变那一帧立即启动 CSS 动画
 *
 * 由 HeroController 在 IntroOverlay 完成时把 start 切为 true。
 * 关键:动画**只在 start=true 时挂载**,组件初始渲染时不会自动播放。
 */
export default function Hero({ start = false }: { start?: boolean }) {
  const titleClass = start ? "animate-hero-title" : "opacity-0";
  const descClass = start ? "animate-hero-desc" : "opacity-0";

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-28 lg:px-12 lg:pb-32 lg:pt-40">
      {/* 背景图层 —— 灰度化:图片只贡献明暗,不带色相,
          叠加后米白底 paper 的纯色不会被图片色温污染 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-cover bg-center opacity-[0.41] grayscale"
        style={{ backgroundImage: "url('/works/BG/01.png')" }}
      />
      {/* 米白半透明 overlay —— 在背景图之上再罩一层 paper 色,进一步压低
          对比度,保证标题/正文/几何图形的清晰度,完全不影响可读性 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-paper/30"
      />

      <div className="relative z-10 mx-auto grid max-w-[1360px] items-center gap-12 lg:grid-cols-12 lg:gap-16">
        {/* 左:文案 */}
        <div className="lg:col-span-7">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.3em]">
            <span
              className="mr-3 inline-block h-px w-8 bg-brand align-middle"
              aria-hidden
            />
            Concept Designer
          </p>

          <h1 className="text-[52px] font-extrabold leading-[0.95] tracking-tight sm:text-[72px] lg:text-[104px]">
            <span className={`block ${titleClass}`}>Environment</span>
            <span className={`block ${titleClass}`}>Concept Design</span>
          </h1>

          <div
            className={`mt-10 max-w-md border-l-2 border-ink pl-5 ${descClass}`}
          >
            <p className="text-[15px] leading-relaxed">
              I am an environment concept designer focused on game spaces,
              cinematic mood, and 3D-assisted design workflows.
            </p>
          </div>

          <a
            href="#works"
            className="mt-10 inline-flex items-center gap-3 bg-brand px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-brand/90"
          >
            View Works
            <svg
              width="22"
              height="10"
              viewBox="0 0 22 10"
              fill="none"
              aria-hidden
            >
              <path
                d="M16 1l4 4-4 4M0 5h20"
                stroke="currentColor"
                strokeWidth="1.5"
              />
            </svg>
          </a>

          <p className="mt-16 text-[10px] uppercase tracking-[0.4em] text-muted">
            <span
              className="mr-3 inline-block h-px w-12 bg-current align-middle"
              aria-hidden
            />
            Based in Earth
          </p>
        </div>

        {/* 右:几何装饰(平板及以上才显示,不抢作品视觉中心) */}
        <div className="hidden md:block lg:col-span-5">
          <GeometricArt />
        </div>
      </div>
    </section>
  );
}
