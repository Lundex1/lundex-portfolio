import { notFound } from "next/navigation";
import Header from "@/components/Header";
import ProjectHero from "@/components/ProjectHero";
import WorkGallery from "@/components/WorkGallery";
import Footer from "@/components/Footer";
import { workDetails, getWorkBySlug } from "@/data/workDetails";
import type { Metadata } from "next";

// 让 4 个详情页在 build 时全部静态预渲染
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
  const work = getWorkBySlug(slug);
  if (!work) notFound();

  return (
    <div className="min-h-screen bg-ink">
      <Header />
      <main>
        <ProjectHero work={work} />
        <WorkGallery images={work.images} />
      </main>
      <Footer />
    </div>
  );
}
