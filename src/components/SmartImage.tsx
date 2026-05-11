"use client";

import { useState } from "react";

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

  // 当前用法下每个 SmartImage 实例的 src 固定不变(缩略图、详情页 cover 都是
  // 单实例单 src),errored 状态自然不需要复位。如果未来在某处复用同一个
  // SmartImage 实例并切换 src,改用 <SmartImage key={src} ...> 强制重挂。

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
