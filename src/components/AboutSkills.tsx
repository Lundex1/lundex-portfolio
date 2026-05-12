"use client";

import { useEffect, useRef, useState } from "react";
import { useLang } from "./LangProvider";
import Reveal from "./Reveal";

/**
 * Experience 单条履历。
 *
 * 桌面(支持 hover):走 hover:bg-brand 红高亮(站内已有交互语言)。
 * 触屏(`hover: none`):没有 hover,用 IntersectionObserver 监听
 *   元素是否进入"视口中心带"(上下各砍 30% → 中间 40% 区域),
 *   进入 → 自动加红高亮;移出 → 退回默认。这样手指滑动时,
 *   履历会"随屏幕滑动显示和消失",和桌面 hover 效果对齐。
 *
 * 两套机制不冲突:hybrid 设备(同时有 hover + 触摸)走 hover;
 * 纯触屏设备走滚动激活。
 */
function ExperienceItem({
  item,
  index,
}: {
  item: string;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // 只在无 hover 的设备启用滚动激活;桌面 hover 设备直接 return
    const noHover = window.matchMedia("(hover: none)").matches;
    if (!noHover) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        // 进入中心带 → active;离开 → 退回
        setActive(entry.isIntersecting);
      },
      // 中心 40% 视口为激活带:上下各 30% 作为缓冲区,不会刚露头就高亮
      { threshold: 0, rootMargin: "-30% 0px -30% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // 数据约定:用 " · " 分隔 角色 / 机构
  const parts = item.split(" · ");
  const role = parts[0];
  const org = parts.slice(1).join(" · ");

  return (
    <div
      ref={ref}
      className={`group/exp -mx-3 flex origin-left items-baseline gap-5 px-3 py-3 transition-all duration-300 ease-out hover:scale-[1.015] hover:bg-brand ${
        active ? "scale-[1.015] bg-brand" : ""
      }`}
    >
      <span
        className={`font-mono text-[11px] font-bold tabular-nums transition-colors duration-300 ${
          active
            ? "text-ink/85"
            : "text-brand group-hover/exp:text-ink/85"
        }`}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[15px] font-bold leading-snug text-ink">
          {role}
        </p>
        {org && (
          <p
            className={`mt-1 text-[12px] leading-snug transition-colors duration-300 ${
              active
                ? "text-ink/80"
                : "text-ink/55 group-hover/exp:text-ink/80"
            }`}
          >
            {org}
          </p>
        )}
      </div>
    </div>
  );
}

// ─── Skill 图标 ──────────────────────────────────────────
// 全部走 currentColor + 1.5 stroke,默认随父级文字色(白)。

function PhotoshopIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <rect x="3" y="3" width="18" height="18" rx="1" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M9 17V8h3.2a2.4 2.4 0 0 1 0 4.8H9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
        strokeLinejoin="miter"
      />
    </svg>
  );
}
function BlenderIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}
function ThreeDCoatIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 3 21 8v8l-9 5-9-5V8z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="miter"
      />
      <path d="M3 8l9 5 9-5M12 13v8" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function SubstanceIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M7.5 8.5a6 6 0 0 1 6-2.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}
function UnrealIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M8 7v7a4 4 0 0 0 8 0V7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="square"
      />
    </svg>
  );
}
function DaVinciIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="15.5" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

type Skill = { name: string; Icon: () => React.JSX.Element };

const skills: Skill[] = [
  { name: "Photoshop", Icon: PhotoshopIcon },
  { name: "Blender", Icon: BlenderIcon },
  { name: "3DCoat", Icon: ThreeDCoatIcon },
  { name: "Substance Painter", Icon: SubstanceIcon },
  { name: "Unreal Engine 5", Icon: UnrealIcon },
  { name: "DaVinci Resolve", Icon: DaVinciIcon },
];

const ACTIVE_SKILL = "Unreal Engine 5";

export default function AboutSkills() {
  const { t } = useLang();

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[#e8e3da] px-6 py-24 lg:px-12 lg:py-32"
    >
      {/* 静态噪点 —— 与 Hero 颗粒同语言但更克制,衔接氛围 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "5px 5px",
        }}
      />

      <div className="relative mx-auto grid max-w-[1360px] gap-16 lg:grid-cols-2 lg:gap-20">
        {/* ─── About 左:大头像 + 巨型 LUNDEX + 履历 + 引用式 Goal ─── */}
        <Reveal>
          {/* eyebrow */}
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.3em]">
            <span
              className="mr-3 inline-block h-px w-8 bg-brand align-middle"
              aria-hidden
            />
            {t.about.eyebrow}
          </p>

          <h2 className="mb-12 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            {t.about.title}
          </h2>

          {/* 头像 + 名字 block —— 头像 220px,LUNDEX 巨型,bio 在右侧 */}
          <div className="mb-14 flex flex-col gap-7 sm:flex-row sm:items-start sm:gap-9">
            <div className="relative shrink-0">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/works/06.png"
                alt="LUNDEX portrait"
                className="h-[180px] w-[180px] object-cover sm:h-[220px] sm:w-[220px]"
              />
              {/* 右下角小红方块 —— 品牌印章感,不抢主图 */}
              <span
                aria-hidden
                className="absolute -bottom-1.5 -right-1.5 block h-4 w-4 bg-brand"
              />
            </div>

            <div className="min-w-0 flex-1 pt-1">
              {/* 巨型名字 —— 与 Hero 标题成对话关系 */}
              <p className="text-[44px] font-extrabold leading-none tracking-tight sm:text-[56px] lg:text-[64px]">
                LUNDEX
              </p>
              <div
                className="mt-4 h-[2px] w-14 bg-brand"
                aria-hidden
              />
              <p className="mt-5 max-w-md text-[15px] leading-relaxed text-ink/65">
                {t.about.bio}
              </p>
            </div>
          </div>

          {/* Experience —— 履历条:01/02 编号 + 角色/机构两行,
              hover 整条变品牌红(站内已有语言),不像简历的"项目列表" */}
          <div className="mb-14">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em]">
              <span
                className="mr-3 inline-block h-px w-6 bg-brand align-middle"
                aria-hidden
              />
              {t.about.experienceTitle}
            </p>
            <div className="space-y-2">
              {t.about.experience.map((item, i) => (
                <ExperienceItem key={item} item={item} index={i} />
              ))}
            </div>
          </div>

          {/* Focus 标签(保留,内容是 4 个领域)*/}
          <div className="mb-14">
            <p className="mb-5 text-[11px] font-semibold uppercase tracking-[0.3em]">
              <span
                className="mr-3 inline-block h-px w-6 bg-brand align-middle"
                aria-hidden
              />
              {t.about.focusTitle}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.about.focus.map((tag) => (
                <span
                  key={tag}
                  className="inline-block origin-center border border-ink/25 px-4 py-2 text-[13px] font-medium text-ink/75 transition-all duration-200 ease-out hover:scale-[1.05] hover:border-brand hover:text-ink"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Goal —— 引用式 pull-quote:超大开引号 + 粗红边 + 加重字号
              和上面"履历/标签"区分开,作为这段的"立场陈述" */}
          <blockquote className="relative max-w-md border-l-[3px] border-brand py-1 pl-7">
            <span
              aria-hidden
              className="absolute -top-4 left-3 select-none font-serif text-[68px] leading-none text-brand/25"
            >
              &ldquo;
            </span>
            <p className="text-[17px] font-medium leading-relaxed text-ink/85">
              {t.about.goal}
            </p>
          </blockquote>
        </Reveal>

        {/* ─── Skills 右:软件 + Design Focus 方法论 ─── */}
        <Reveal delay={120}>
          {/* Skills —— 软件清单,保持网格 + 当前 active 高亮 */}
          <p className="mb-6 text-[11px] font-semibold uppercase tracking-[0.3em]">
            <span
              className="mr-3 inline-block h-px w-8 bg-brand align-middle"
              aria-hidden
            />
            {t.skills.eyebrow}
          </p>

          <div className="mb-16 grid grid-cols-2 gap-3">
            {skills.map(({ name, Icon }) => {
              const active = name === ACTIVE_SKILL;
              return (
                <span
                  key={name}
                  className={`grid grid-cols-[32px_1fr] items-center gap-4 px-5 py-4 text-sm transition-all duration-300 hover:-translate-y-0.5 ${
                    active
                      ? "bg-brand text-white"
                      : "bg-ink text-white hover:bg-ink-soft"
                  }`}
                >
                  <span className="flex items-center justify-center">
                    <Icon />
                  </span>
                  <span className="text-left">{name}</span>
                </span>
              );
            })}
          </div>

          {/* Design Focus —— 方法论列表:序号 + 短标题 + 一句话说明
              视觉上和 Skills 完全不同(无底色块、无图标、有横线分隔),
              强调"设计思路",不是"软件清单"。
              hover:整行红色 hover-bg + 文字加重,延续站内语言 */}
          <div>
            <div className="mb-6 flex items-end justify-between">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em]">
                <span
                  className="mr-3 inline-block h-px w-8 bg-brand align-middle"
                  aria-hidden
                />
                {t.designFocus.title}
              </p>
              {/* 小总数 —— editorial 目录感 */}
              <span className="text-[10px] uppercase tracking-[0.25em] text-ink/40">
                {String(t.designFocus.items.length).padStart(2, "0")} principles
              </span>
            </div>

            <ol className="border-t border-ink/15">
              {t.designFocus.items.map(({ id, title, desc }) => (
                <li
                  key={id}
                  className="group/df grid origin-left grid-cols-[40px_1fr] items-baseline gap-x-5 border-b border-ink/15 py-5 transition-all duration-200 ease-out hover:scale-[1.01] hover:pl-2"
                >
                  {/* 编号 —— 等宽字、品牌红、tabular-nums 对齐 */}
                  <span className="font-mono text-[12px] font-bold tabular-nums tracking-wider text-brand">
                    {id}
                  </span>
                  <div className="min-w-0">
                    <p className="text-[15px] font-bold leading-tight tracking-tight text-ink transition-colors duration-200 group-hover/df:text-brand">
                      {title}
                    </p>
                    <p className="mt-1.5 text-[13px] leading-relaxed text-ink/60">
                      {desc}
                    </p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
