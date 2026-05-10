"use client";

import { useEffect, useState } from "react";

type Props = {
  src: string;
  alt: string;
  className?: string;
  /** 缺图占位上显示的文字(通常传序号 "01"、"02") */
  fallbackLabel?: string;
};

/**
 * 加载失败或路径为空时,渲染一个深色占位块,不抛出 404 错误也不破坏布局。
 */
export default function SmartImage({
  src,
  alt,
  className = "",
  fallbackLabel,
}: Props) {
  const [errored, setErrored] = useState(false);

  // src 变化时复位 errored —— 否则若组件实例被复用(例如在 viewer 里换图),
  // 一次错误会让后续所有 src 切换都误判为失败,永远显示 fallback。
  useEffect(() => {
    setErrored(false);
  }, [src]);

  if (errored || !src) {
    return (
      <div
        className={`flex items-center justify-center bg-white/[0.04] ${className}`}
        role="img"
        aria-label={alt}
      >
        {fallbackLabel ? (
          <span className="text-5xl font-black text-white/15">
            {fallbackLabel}
          </span>
        ) : (
          <span className="text-[10px] uppercase tracking-[0.3em] text-white/30">
            Image
          </span>
        )}
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setErrored(true)}
    />
  );
}
