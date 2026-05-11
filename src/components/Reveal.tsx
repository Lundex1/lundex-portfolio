"use client";

import { useEffect, useRef, useState } from "react";

/**
 * 滚动到视口后淡入 + 上移 16px 的简单包装。
 *
 * - 单向触发:进入视口一次就解绑,不会反复闪。
 * - threshold 0.12:稍微露出一点就触发,不用等整块全可见。
 * - delay 用 transition-delay 实现,适合同一组兄弟元素错峰。
 *
 * 渲染层只多一个 <div>,不破坏 grid / flex 布局。
 * 如果需要直接套在 grid 子上,把 as="…" 之后可以扩展。
 */
export default function Reveal({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 用户已经设置 reduce-motion → 直接显形,跳过观察
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (mq.matches) {
      setShown(true);
      return;
    }

    const obs = new IntersectionObserver(
      (entries) => {
        const e = entries[0];
        if (e?.isIntersecting) {
          setShown(true);
          obs.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -10% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`reveal ${shown ? "reveal-shown" : ""} ${className}`}
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </div>
  );
}
