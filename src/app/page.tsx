import Header from "@/components/Header";
import HeroController from "@/components/HeroController";
import FeaturedWorks from "@/components/FeaturedWorks";
import AboutSkills from "@/components/AboutSkills";
import Footer from "@/components/Footer";

// 注:AudioController 已移至 src/app/layout.tsx,让背景音乐在
// 首页 ↔ 详情页跳转时不会被卸载、不会重新播放。

export default function Home() {
  return (
    <>
      <Header />
      <main>
        {/* 包含 Hero + IntroOverlay,Intro 结束后才触发 Hero 动画 */}
        <HeroController />
        <FeaturedWorks />
        <AboutSkills />
      </main>
      <Footer />
    </>
  );
}
