import Header from "@/components/Header";
import HeroController from "@/components/HeroController";
import FeaturedWorks from "@/components/FeaturedWorks";
import AboutSkills from "@/components/AboutSkills";
import Footer from "@/components/Footer";
import AudioController from "@/components/AudioController";

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
      {/* 背景音乐 + 右上角浮动开关,只在首页挂载;不影响详情页 */}
      <AudioController />
    </>
  );
}
