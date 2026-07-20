"use client";

import { useEffect, useRef, useState } from "react";
import type { WorkSection } from "@/data/workDetails";
import type { Lang } from "@/data/i18n";
import { useLang } from "./LangProvider";

/**
 * 详情页画廊 —— 垂直阅读流 + 收起式悬浮导览。
 *
 * 阅读主体:桌面与移动共用同一条纵向流。每张图 = 一张卡片
 * (编号 / 图 / 标题 / 描述 / Stage·Tools),图片紧挨自己的说明,
 * 一路往下滚即可读完,不再需要常驻的缩略图总览栏。
 *
 * 导览栏(仅 lg+):默认收起为屏幕左缘的一枚竖标签;鼠标移到标签上
 * 展开为悬浮面板,列出全部缩略图,点击平滑滚动到对应位置。
 * 当前阅读到第几张由 IntersectionObserver 追踪并在面板里高亮。
 *
 * 键盘 ← / → 在图片之间跳转(滚动),与导览面板共用同一套索引。
 *
 * 接收三语 sections:Record<Lang, WorkSection[]>。三套数组顺序、长度、
 * src 严格对齐,所以 index 在任何语言下都指向同一张图。
 */
export default function WorkGallery({
  sections,
}: {
  sections: Record<Lang, WorkSection[]>;
}) {
  const { lang, t } = useLang();
  const activeSections = sections[lang];

  // 拆分:有图的 section 进阅读流;带 video 的 section(YouTube 嵌入等)
  // 作为独立展示块渲染在流之后
  const imageSections = activeSections.filter((s) => s.images.length > 0);
  const videoSections = activeSections.filter((s) => s.video);

  const allImages = imageSections.flatMap((s) => s.images);
  const total = allImages.length;

  // 当前阅读到的图片索引(由滚动位置驱动,用于导览面板高亮)
  const [index, setIndex] = useState(0);
  // 导览面板展开状态:hover 边缘标签临时展开;点击标签可固定(pin)住,
  // 便于连续点选多张 —— 两者任一为真即展开
  const [navHover, setNavHover] = useState(false);
  const [navPinned, setNavPinned] = useState(false);
  const navOpen = navHover || navPinned;
  // 每张卡片的 DOM 引用 —— 供导览点击 / 键盘跳转时滚动定位
  const articleRefs = useRef<(HTMLElement | null)[]>([]);

  // 滚动追踪:哪张卡片在视口中占比最大,就把它标记为"当前"
  useEffect(() => {
    const els = articleRefs.current.filter(Boolean) as HTMLElement[];
    if (els.length === 0) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (!visible) return;
        const i = Number((visible.target as HTMLElement).dataset.index);
        if (!Number.isNaN(i)) setIndex(i);
      },
      // 视口中段作为判定带,避免刚露头就被判为"当前"
      { rootMargin: "-25% 0px -45% 0px", threshold: [0.05, 0.35, 0.7] }
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [total, lang]);

  // 平滑滚动到指定图片(顶部留出 header 高度,globals.css 已设 scroll-padding-top)
  const scrollToImage = (i: number) => {
    articleRefs.current[i]?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  // 键盘 ← / → 跳到上/下一张(循环)
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement | null)?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      if (total === 0) return;

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        setIndex((i) => {
          const next = (i - 1 + total) % total;
          articleRefs.current[next]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          return next;
        });
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        setIndex((i) => {
          const next = (i + 1) % total;
          articleRefs.current[next]?.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          return next;
        });
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [total]);

  if (total === 0) return null;

  // 给每个 section 计算它在全局扁平数组里的起始下标 → 卡片编号 01..N 连续
  const sectionsWithOffset = imageSections.map((s, i) => ({
    ...s,
    start: imageSections
      .slice(0, i)
      .reduce((sum, sec) => sum + sec.images.length, 0),
  }));

  return (
    <>
      {/* ═══ 收起式悬浮导览(仅 lg+)═══
          默认只露出左缘一枚竖标签,hover 展开缩略图面板;
          点击缩略图平滑滚动到对应卡片,当前阅读项高亮。 */}
      <div
        className="fixed left-0 top-1/2 z-40 hidden -translate-y-1/2 lg:block"
        onPointerEnter={() => setNavHover(true)}
        onPointerLeave={() => setNavHover(false)}
      >
        <div className="flex items-center">
          {/* 折叠标签 —— 竖排文字 + 当前进度;点击可固定展开 */}
          <button
            type="button"
            onClick={() => setNavPinned((p) => !p)}
            aria-expanded={navOpen}
            aria-label={t.workDetail.index}
            className={`flex cursor-pointer flex-col items-center gap-3 rounded-r border-y border-r bg-ink/95 py-5 pl-2 pr-2.5 backdrop-blur transition-colors ${
              navPinned
                ? "border-brand"
                : navOpen
                ? "border-brand/40"
                : "border-white/15 hover:border-white/30"
            }`}
          >
            <span
              className="text-[10px] font-semibold uppercase tracking-[0.3em] text-white/70"
              style={{ writingMode: "vertical-rl" }}
            >
              {t.workDetail.index}
            </span>
            <span
              className="block h-6 w-px bg-brand"
              aria-hidden
            />
            <span className="font-mono text-[10px] font-bold tabular-nums text-brand">
              {String(index + 1).padStart(2, "0")}
            </span>
          </button>

          {/* 展开面板 —— 宽度 / 透明度过渡,收起时不占位也不可点 */}
          <div
            className={`overflow-hidden transition-all duration-300 ease-out ${
              navOpen
                ? "max-w-[320px] opacity-100"
                : "pointer-events-none max-w-0 opacity-0"
            }`}
          >
            <div className="ml-1 max-h-[70vh] w-[300px] overflow-y-auto rounded border border-white/15 bg-ink/95 p-3 backdrop-blur">
              {sectionsWithOffset.map((section, sIdx) => (
                <div key={section.label} className={sIdx === 0 ? "" : "mt-4"}>
                  <p className="mb-2 text-[11px] font-bold uppercase tracking-[0.18em] text-white/85">
                    <span
                      className="mr-2 inline-block h-px w-4 bg-brand align-middle"
                      aria-hidden
                    />
                    {section.label}
                  </p>
                  <div className="grid grid-cols-3 gap-1.5">
                    {section.images.map((img, localI) => {
                      const i = section.start + localI;
                      const active = i === index;
                      const number = String(i + 1).padStart(2, "0");
                      return (
                        <button
                          key={`${img.src}-${i}`}
                          type="button"
                          onClick={() => scrollToImage(i)}
                          className={`relative aspect-video overflow-hidden rounded-sm text-left transition-opacity ${
                            active
                              ? "ring-2 ring-brand"
                              : "opacity-70 hover:opacity-100"
                          }`}
                          aria-label={`${number}: ${img.title}`}
                          aria-current={active}
                        >
                          {img.isVideo ? (
                            <>
                              <video
                                src={img.src}
                                muted
                                playsInline
                                preload="metadata"
                                className="absolute inset-0 h-full w-full object-cover"
                              />
                              <span
                                aria-hidden
                                className="absolute inset-0 flex items-center justify-center"
                              >
                                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/60">
                                  <svg width="7" height="8" viewBox="0 0 10 12" fill="none">
                                    <path d="M0 0l10 6-10 6z" fill="#fff" />
                                  </svg>
                                </span>
                              </span>
                            </>
                          ) : (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img
                              src={img.src}
                              alt={img.title}
                              loading="lazy"
                              decoding="async"
                              className={`absolute inset-0 h-full w-full ${
                                img.orientation === "portrait"
                                  ? "object-contain"
                                  : "object-cover"
                              }`}
                            />
                          )}
                          <span
                            className={`absolute left-1 top-1 rounded-full px-1.5 text-[9px] font-bold leading-[1.5] tracking-wider ${
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
          </div>
        </div>
      </div>

      <section className="bg-ink px-6 pb-24 text-white lg:px-12 lg:pb-32">
        <div className="mx-auto max-w-[1360px]">
          {/* 与 Hero 之间的细分割线 */}
          <div className="border-t border-white/10" aria-hidden />

          {/* ═══ 垂直阅读流(桌面 + 移动共用)═══
              阅读区收窄到 1080px,长图不至于铺满整屏影响阅读节奏 */}
          <div className="mx-auto mt-12 max-w-[1080px] space-y-16 lg:mt-16 lg:space-y-24">
            {sectionsWithOffset.map((section) => (
              <div key={section.label}>
                {/* Section 标题 —— 分区现在是具名地点(如"旧慈悲修道院"),
                    字号从 10px 提到 15/17px 并加粗,作为阅读流的分章标题 */}
                <p className="mb-6 text-[15px] font-bold uppercase tracking-[0.22em] text-white lg:mb-8 lg:text-[17px]">
                  <span
                    className="mr-3 inline-block h-[2px] w-8 bg-brand align-middle"
                    aria-hidden
                  />
                  {section.label}
                </p>

                <div className="space-y-12 lg:space-y-20">
                  {section.images.map((img, localI) => {
                    const i = section.start + localI;
                    const number = String(i + 1).padStart(2, "0");
                    return (
                      <article
                        key={`${img.src}-${i}`}
                        ref={(el) => {
                          articleRefs.current[i] = el;
                        }}
                        data-index={i}
                        className="scroll-mt-24"
                      >
                        {/* 图片 / 视频 —— w-full 保持原比例不变形 */}
                        {img.isVideo ? (
                          <video
                            src={img.src}
                            controls
                            playsInline
                            preload="metadata"
                            className="block h-auto w-full bg-white/[0.04]"
                          />
                        ) : (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={img.src}
                            alt={img.title}
                            loading="lazy"
                            decoding="async"
                            // 竖构图(海报拼图、立绘等)按视口高度收进一屏并居中,
                            // 否则满宽渲染会高过一屏、需要滚动才能看全;
                            // 横构图仍然满宽铺满阅读区
                            className={`block bg-white/[0.04] ${
                              img.orientation === "portrait"
                                ? "mx-auto h-auto max-h-[78vh] w-auto max-w-full"
                                : "h-auto w-full"
                            }`}
                          />
                        )}

                        {/* 说明区 —— 桌面左右分栏(标题+描述 / Stage·Tools),
                            移动端自然上下堆叠 */}
                        <div className="mt-5 grid gap-4 border-t border-white/10 pt-5 lg:mt-6 lg:grid-cols-12 lg:gap-8 lg:pt-6">
                          <div className="lg:col-span-8">
                            <div className="flex items-baseline gap-3">
                              <span className="font-mono text-[11px] font-bold tabular-nums tracking-wider text-brand">
                                {number}
                              </span>
                              <h3 className="text-[17px] font-bold leading-snug lg:text-[20px]">
                                {img.title}
                              </h3>
                            </div>
                            <p className="mt-2.5 text-[14px] leading-relaxed text-white/80 lg:text-[15px]">
                              {img.description}
                            </p>
                          </div>

                          <dl className="grid grid-cols-2 gap-x-4 gap-y-3 lg:col-span-4 lg:grid-cols-1">
                            <div>
                              <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                                {t.workDetail.stage}
                              </dt>
                              <dd className="mt-1.5 text-[12px] text-white/85 lg:text-[13px]">
                                {img.stage}
                              </dd>
                            </div>
                            <div>
                              <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                                {t.workDetail.tools}
                              </dt>
                              <dd className="mt-1.5 text-[12px] text-white/85 lg:text-[13px]">
                                {img.tools.join(" / ")}
                              </dd>
                            </div>
                          </dl>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* ═══ 视频展示块(GAMEPLAY SYSTEM DEMO 等)═══
              带 video 字段的 section 独立渲染在阅读流之后。
              桌面:视频左 7 列 + 说明右 5 列;移动:上下堆叠。 */}
          {videoSections.map((section) => {
            const v = section.video;
            if (!v) return null;
            return (
              <div key={section.label} className="mx-auto mt-16 max-w-[1080px] lg:mt-24">
                <p className="mb-6 text-[15px] font-bold uppercase tracking-[0.22em] text-white lg:mb-8 lg:text-[17px]">
                  <span
                    className="mr-3 inline-block h-[2px] w-8 bg-brand align-middle"
                    aria-hidden
                  />
                  {section.label}
                </p>

                <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
                  <div className="lg:col-span-7">
                    <div className="relative aspect-video overflow-hidden bg-white/[0.04]">
                      {v.localSrc ? (
                        <video
                          src={v.localSrc}
                          controls
                          playsInline
                          preload="metadata"
                          className="absolute inset-0 h-full w-full object-contain"
                        />
                      ) : (
                        <iframe
                          src={v.embedUrl}
                          title={v.title}
                          className="absolute inset-0 h-full w-full"
                          loading="lazy"
                          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                          referrerPolicy="strict-origin-when-cross-origin"
                          allowFullScreen
                        />
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5">
                    <h3 className="text-xl font-bold">{v.title}</h3>
                    <div className="mt-4 border-l border-white/15 pl-5">
                      <dl className="space-y-4">
                        <div>
                          <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                            {t.workDetail.description}
                          </dt>
                          <dd className="mt-2 text-sm leading-relaxed text-white/80">
                            {v.description}
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                            {t.workDetail.stage}
                          </dt>
                          <dd className="mt-2 text-sm">{v.stage}</dd>
                        </div>
                        <div>
                          <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                            {t.workDetail.tools}
                          </dt>
                          <dd className="mt-2 text-sm">{v.tools.join(" / ")}</dd>
                        </div>
                        <div>
                          <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                            {t.workDetail.content}
                          </dt>
                          <dd className="mt-2">
                            <ul className="space-y-1.5">
                              {v.content.map((c) => (
                                <li
                                  key={c}
                                  className="flex items-start gap-2 text-sm text-white/80"
                                >
                                  <span
                                    className="mt-[7px] inline-block h-1 w-1 flex-shrink-0 bg-brand"
                                    aria-hidden
                                  />
                                  {c}
                                </li>
                              ))}
                            </ul>
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    </>
  );
}
