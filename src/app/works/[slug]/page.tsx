import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProjectHero from "@/components/ProjectHero";
import WorkGallery from "@/components/WorkGallery";
import Footer from "@/components/Footer";
import NextProjectLink from "@/components/NextProjectLink";
import ScrollProgress from "@/components/ScrollProgress";
import { workDetails, getWorkBySlug } from "@/data/workDetails";
import { getLocalizedWorkPair } from "@/data/workDetailsJp";
import type { Metadata } from "next";

// 让 2 个详情页在 build 时全部静态预渲染
export function generateStaticParams() {
  return workDetails.map((w) => ({ slug: w.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const work = getWorkBySlug(slug);
  if (!work) return { title: "Not Found — LUNDEX" };
  // metadata 用英文版(SEO 主要靠英文,日文用户切语言后看到的页面 UI 是本地化的)
  return {
    title: `${work.title} — LUNDEX`,
    description: work.description,
  };
}

export default async function WorkDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const pair = getLocalizedWorkPair(slug);
  if (!pair) notFound();

  // 把双语数据对一起传给客户端组件,客户端按 useLang() 选择渲染哪份。
  // 这样 server 端不需要知道当前语言,仍能 SSG 预渲染。
  return (
    <div className="min-h-screen bg-ink">
      <Header />
      {/* 顶部品牌红滚动进度条 —— 长 gallery 时方便看读到哪 */}
      <ScrollProgress />
      {/* page-in:进入详情页时整页 ~420ms 淡入,衔接首页 → 详情页节奏 */}
      <main className="page-in">
        <ProjectHero work={pair} />
        <WorkGallery sections={{ en: pair.en.sections, jp: pair.jp.sections }} />
        {/* 底部"下一/上一项目"导航 —— 客户端组件,按 useLang() 选取对应语言数据 */}
        <NextProjectLink currentSlug={slug} />
      </main>
      <Footer />
    </div>
  );
}
