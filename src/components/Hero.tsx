"use client";

import GeometricArt from "./GeometricArt";
import { useLang } from "./LangProvider";

/**
 * 首页 Hero 区域。
 *
 * `start` 控制入场动画是否激活:
 *   · false → 标题 / 简介 className 为 "opacity-0",静止隐藏,不挂任何 animation
 *   · true  → 切换到 "animate-hero-title" / "animate-hero-desc",
 *             浏览器在 className 改变那一帧立即启动 CSS 动画
 *
 * 文案全部走 useLang() 字典。日文标题(環境アート / ポートフォリオ)略短,
 * 复用同一套响应式字号即可,无横向溢出。
 */
export default function Hero({ start = false }: { start?: boolean }) {
  const { lang, t } = useLang();
  const titleClass = start ? "animate-hero-title" : "opacity-0";
  const descClass = start ? "animate-hero-desc" : "opacity-0";

  // 日文版标题字号稍小一档,避免"環境アート"在小屏发生拥挤
  const titleSizeClass =
    lang === "jp"
      ? "text-[32px] sm:text-[48px] lg:text-[60px] xl:text-[80px]"
      : "text-[36px] sm:text-[56px] lg:text-[70px] xl:text-[92px]";

  return (
    <section className="relative overflow-hidden px-6 pb-24 pt-28 lg:px-12 lg:pb-32 lg:pt-40">
      {/* 背景图层 + 老电影效果
          hero-bg-film: CSS 动画同时驱动 flicker(brightness/contrast/opacity 微波动)
          和 shake(亚像素 translate 微颤)。grayscale 写在 keyframe 里以便与
          brightness/contrast 合并到同一个 filter 属性,不会被覆盖。 */}
      <div
        aria-hidden
        className="hero-bg-film pointer-events-none absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/works/BG/01.png')" }}
      />

      {/* 胶片颗粒层 —— 纯 CSS radial-gradient 噪点,
          hero-grain 动画轻微闪烁 opacity 模拟胶片颗粒 */}
      <div
        aria-hidden
        className="hero-grain pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.15) 1px, transparent 1px)",
          backgroundSize: "4px 4px",
        }}
      />

      {/* 米白半透明 overlay —— 在背景图之上再罩一层 paper 色,进一步压低
          对比度,保证标题/正文/几何图形的清晰度,完全不影响可读性 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-paper/55"
      />

      <div className="relative z-10 mx-auto grid max-w-[1360px] items-center gap-12 lg:grid-cols-12 lg:gap-12">
        {/* 左:文案 — col-span-8 给 "Environment Art" 足够宽度不折行 */}
        <div className="lg:col-span-8">
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.3em]">
            <span
              className="mr-3 inline-block h-px w-8 bg-brand align-middle"
              aria-hidden
            />
            {t.hero.eyebrow}
          </p>

          <h1
            className={`font-extrabold leading-[0.95] tracking-tight ${titleSizeClass}`}
          >
            <span className={`block ${titleClass}`}>{t.hero.title[0]}</span>
            <span className={`block ${titleClass}`}>{t.hero.title[1]}</span>
            <span className={`block ${titleClass}`}>{t.hero.title[2]}</span>
          </h1>

          <div
            className={`mt-10 max-w-lg space-y-4 border-l-2 border-ink pl-5 text-base leading-7 ${descClass}`}
          >
            <p>{t.hero.desc[0]}</p>
            <p>{t.hero.desc[1]}</p>
          </div>

          <a
            href="#works"
            className="group mt-10 inline-flex items-center gap-3 bg-brand px-8 py-4 text-sm font-medium text-white transition-colors hover:bg-brand/90"
          >
            {t.hero.cta}
            <svg
              width="22"
              height="10"
              viewBox="0 0 22 10"
              fill="none"
              aria-hidden
              className="transition-transform duration-300 group-hover:translate-x-1"
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
            {t.hero.basedIn}
          </p>
        </div>

        {/* 右:几何装饰(平板及以上才显示,不抢作品视觉中心) */}
        <div className="hidden md:block lg:col-span-4">
          <GeometricArt />
        </div>
      </div>
    </section>
  );
}
