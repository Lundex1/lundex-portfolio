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
      {/* 背景图层 —— 双层嵌套,各自承担不同动画属性:
          外层 .hero-bg-shake :  老电视 CRT 抖动(translate 突跳),
                                  单独占用 transform 通道
          内层 .hero-bg-film  :  breath(scale)+ flicker(filter)
                                  scale 与 outer 的 translate 在不同元素上,
                                  合成时各自独立累计,不冲突。 */}
      <div
        aria-hidden
        className="hero-bg-shake pointer-events-none absolute inset-0"
      >
        <div
          className="hero-bg-film absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/works/BG/01.png')" }}
        />
      </div>

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

          {/* Selected Works 信息条 —— 顶部细线 + 三段:Label / Projects / Focus
              再加一档可读性:字号统一上调 1px,透明度上调一级,
              但仍不抢 Hero 大标题(标题 lg:text-[70px] vs 此处最大 17px) */}
          <div className="mt-16 flex max-w-2xl flex-col gap-3 border-t border-ink/20 pt-6 sm:flex-row sm:items-center sm:gap-5">
            <span className="text-[12px] font-bold uppercase tracking-[0.3em] text-brand">
              {t.hero.selectedLabel}
            </span>
            <span
              className="hidden h-px w-6 bg-ink/30 sm:block"
              aria-hidden
            />
            <span className="text-[17px] font-extrabold tracking-tight text-ink">
              {t.hero.selectedProjects}
            </span>
            <span
              className="hidden h-px w-6 bg-ink/30 sm:block"
              aria-hidden
            />
            <span className="text-[12px] uppercase tracking-[0.2em] text-ink/80">
              {t.hero.selectedFocus}
            </span>
          </div>
        </div>

        {/* 右:几何装饰(平板及以上才显示,不抢作品视觉中心) */}
        <div className="hidden md:block lg:col-span-4">
          <GeometricArt />
        </div>
      </div>
    </section>
  );
}
