"use client";

import { useState } from "react";
import Hero from "./Hero";
import IntroOverlay from "./IntroOverlay";

/**
 * 首页"Intro → Hero"编排:
 *   1. 默认 introDone = false,Hero 保持 opacity:0 静止态
 *   2. IntroOverlay 播放 ~3.3s 后调用 onComplete
 *   3. setIntroDone(true) → Hero 节点新增 .hero-ready,触发 CSS 动画
 *
 * 抽出客户端容器是为了让 page.tsx 仍可保持 Server Component,
 * 避免 FeaturedWorks / AboutSkills / Footer 被无意义地拽进 client bundle。
 */
export default function HeroController() {
  const [introDone, setIntroDone] = useState(false);

  return (
    <>
      <Hero start={introDone} />
      <IntroOverlay onComplete={() => setIntroDone(true)} />
    </>
  );
}
