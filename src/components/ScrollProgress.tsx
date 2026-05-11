"use client";

import { useEffect, useRef } from "react";

/**
 * 顶部 2px 红色滚动进度条。
 *
 * 优先走 CSS `animation-timeline: scroll(root)`(Chrome 115+ / Safari 26+)。
 * 不支持时退化到 JS:监听 scroll 事件,写 --p CSS 变量(0–1)。
 *
 * passive listener 不阻塞滚动;requestAnimationFrame 节流,避免高频写 style。
 */
export default function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 浏览器已支持 scroll-timeline 时,CSS 那条规则会接管,JS 不必参与
    if (CSS.supports?.("animation-timeline: scroll()")) return;

    let raf = 0;
    const update = () => {
      const doc = document.documentElement;
      const max = doc.scrollHeight - doc.clientHeight;
      const p = max > 0 ? Math.min(1, Math.max(0, doc.scrollTop / max)) : 0;
      el.style.setProperty("--p", String(p));
      raf = 0;
    };
    const onScroll = () => {
      if (raf) return;
      raf = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", update);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={ref} className="scroll-progress" aria-hidden />;
}
