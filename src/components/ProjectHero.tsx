import Link from "next/link";
import type { WorkDetail } from "@/data/workDetails";

/**
 * 详情页 Hero 区域:左项目信息,右大封面图。
 * 仅展示用,不含交互(交互全在 WorkGallery 客户端组件)。
 */
export default function ProjectHero({ work }: { work: WorkDetail }) {
  return (
    <section className="bg-ink px-6 pb-16 pt-28 text-white lg:px-12 lg:pb-24 lg:pt-32">
      <div className="mx-auto max-w-[1360px]">
        {/* Back to Works */}
        <Link
          href="/#works"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-brand"
        >
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            aria-hidden
          >
            <path
              d="M5 1L1 5l4 4M1 5h12"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          Back to Works
        </Link>

        {/* Hero grid */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* 左:项目信息 */}
          <div className="lg:col-span-6">
            <p className="text-3xl font-extrabold text-brand">{work.number}</p>
            <h1 className="mt-1 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {work.title}
            </h1>
            <p className="mt-3 text-sm text-white/60">{work.category}</p>

            <div className="mt-4 h-px w-12 bg-brand" aria-hidden />

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/80">
              {work.description}
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Project Type
                </dt>
                <dd className="mt-2 text-sm">{work.projectType}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Stage
                </dt>
                <dd className="mt-2 text-sm">{work.stage}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Tools
                </dt>
                <dd className="mt-2 text-sm">{work.tools.join(" / ")}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                  Date
                </dt>
                <dd className="mt-2 text-sm">{work.date}</dd>
              </div>
            </dl>
          </div>

          {/* 右:封面图 */}
          <div className="lg:col-span-6">
            <div className="relative aspect-video overflow-hidden bg-white/[0.04]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={work.coverImage}
                alt={work.title}
                className="absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
