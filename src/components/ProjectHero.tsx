"use client";

import Link from "next/link";
import type { WorkDetail } from "@/data/workDetails";
import { useLang } from "./LangProvider";

/**
 * 详情页 Hero 区域:左项目信息,右大封面图。
 *
 * 接收双语数据对 `{ en, jp }`,在客户端根据 useLang() 选用一份渲染。
 * 这样父级 page.tsx 可以保持 server component(只需 await params),
 * 同时切换语言不刷新页面、不触发路由跳转。
 */
export default function ProjectHero({
  work,
}: {
  work: { en: WorkDetail; jp: WorkDetail };
}) {
  const { lang, t } = useLang();
  const w = work[lang];

  return (
    <section className="bg-ink px-6 pb-16 pt-28 text-white lg:px-12 lg:pb-24 lg:pt-32">
      <div className="mx-auto max-w-[1360px]">
        {/* Back to Works — hover 时箭头向左滑 4px,呼应 Hero 的 View Works */}
        <Link
          href="/#works"
          className="group inline-flex items-center gap-2 text-xs uppercase tracking-[0.2em] text-white/60 transition-colors hover:text-brand"
        >
          <svg
            width="14"
            height="10"
            viewBox="0 0 14 10"
            fill="none"
            aria-hidden
            className="transition-transform duration-300 group-hover:-translate-x-1"
          >
            <path
              d="M5 1L1 5l4 4M1 5h12"
              stroke="currentColor"
              strokeWidth="1.5"
            />
          </svg>
          {t.workDetail.back}
        </Link>

        {/* Hero grid */}
        <div className="mt-10 grid gap-10 lg:grid-cols-12 lg:gap-12">
          {/* 左:项目信息 */}
          <div className="lg:col-span-6">
            <p className="text-3xl font-extrabold text-brand">{w.number}</p>
            <h1 className="mt-1 text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-6xl">
              {w.title}
            </h1>
            <p className="mt-3 text-sm text-white/60">{w.category}</p>

            <div className="mt-4 h-px w-12 bg-brand" aria-hidden />

            <p className="mt-6 max-w-xl text-[15px] leading-relaxed text-white/80">
              {w.description}
            </p>

            <dl className="mt-12 grid grid-cols-2 gap-x-8 gap-y-6 sm:grid-cols-4">
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {t.workDetail.projectType}
                </dt>
                <dd className="mt-2 text-sm">{w.projectType}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {t.workDetail.stage}
                </dt>
                <dd className="mt-2 text-sm">{w.stage}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {t.workDetail.tools}
                </dt>
                <dd className="mt-2 text-sm">{w.tools.join(" / ")}</dd>
              </div>
              <div>
                <dt className="text-[10px] uppercase tracking-[0.2em] text-white/40">
                  {t.workDetail.date}
                </dt>
                <dd className="mt-2 text-sm">{w.date}</dd>
              </div>
            </dl>
          </div>

          {/* 右:封面图 —— key={coverImage} 让两套语言同 src 时不必重挂,
              但路由切换 / 语言切换都不会破坏 image-fade-in 的首挂触发 */}
          <div className="lg:col-span-6">
            <div className="relative aspect-video overflow-hidden bg-white/[0.04]">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={w.coverImage}
                alt={w.title}
                className="image-fade-in absolute inset-0 h-full w-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
