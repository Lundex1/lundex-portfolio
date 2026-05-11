"use client";

import { useLang } from "./LangProvider";
import Reveal from "./Reveal";

// ─── Skill 图标 ──────────────────────────────────────────
// 全部走 currentColor + 1.5 stroke,默认随父级文字色(白)。
// 抽象几何符号,不使用任何彩色官方 Logo;hover / active 时
// 父级 color 变化,图标自然跟随,无需单独切色。

/** Photoshop —— 方形外框 + 内部 "P" 字形负空间 */
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

/** Blender —— 3D 轨道符号,两条交叉椭圆暗示三维空间 */
function BlenderIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" />
      <ellipse cx="12" cy="12" rx="9" ry="3.5" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="12" r="1.6" fill="currentColor" />
    </svg>
  );
}

/** 3DCoat —— 立方体等距投影 */
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

/** Substance Painter —— 材质球(圆 + 高光弧线) */
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

/** Unreal Engine 5 —— 抽象 "U" 字形 */
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

/** DaVinci Resolve —— 三瓣色轮抽象(三个相切圆) */
function DaVinciIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="9" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="15" cy="10" r="4" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="12" cy="15.5" r="4" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

type Skill = {
  name: string;
  Icon: () => React.JSX.Element;
};

// 软件名是品牌名(各语言保持英文),不进字典
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
      {/* 静态噪点层 —— 用和 Hero 同样的 radial-gradient 点阵语言,
          但密度更密 / 颜色更淡(rgba 0.07 vs Hero 的 0.15),
          视觉上把 Hero 的胶片颗粒延伸到 About,不让米白背景显得太"光板"。
          aria-hidden + pointer-events-none,不影响阅读和交互。 */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(0,0,0,0.07) 1px, transparent 1px)",
          backgroundSize: "5px 5px",
        }}
      />

      <div className="relative mx-auto grid max-w-[1360px] gap-16 lg:grid-cols-2">
        {/* About 左 —— 整列 reveal,内部各小段不再单独错峰,避免视觉太碎 */}
        <Reveal>
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.3em]">
            <span
              className="mr-3 inline-block h-px w-8 bg-brand align-middle"
              aria-hidden
            />
            {t.about.eyebrow}
          </p>

          <h2 className="mb-10 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            {t.about.title}
          </h2>

          {/* 头像 + 姓名:桌面端左右,移动端上下 */}
          <div className="mb-10 flex flex-col gap-6 sm:flex-row sm:items-center sm:gap-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/works/06.png"
              alt="LUNDEX portrait"
              className="h-[150px] w-[150px] flex-shrink-0 object-cover"
            />
            <div>
              <p className="text-3xl font-extrabold tracking-tight sm:text-4xl">
                LUNDEX
              </p>
              <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-ink/65">
                {t.about.bio}
              </p>
            </div>
          </div>

          {/* Experience —— 带左边框的醒目条目 + 小标题 */}
          <div className="mb-10">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink/45">
              {t.about.experienceTitle}
            </p>
            <div className="space-y-3">
              {t.about.experience.map((item) => (
                <div
                  key={item}
                  // origin-left:从左侧锚定缩放,红条边线作为支点不动
                  // hover:bg-brand:整条变成主题红(同 WorkCard NIO hover 语言)
                  // 文字保持 text-ink(黑),在红底上仍清晰
                  className="origin-left border-l-2 border-brand py-2 pl-4 pr-4 transition-all duration-200 ease-out hover:scale-[1.02] hover:bg-brand"
                >
                  <p className="text-sm font-semibold text-ink">{item}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Focus —— 标签列表,比长字距一行更易读 */}
          <div className="mb-10">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.25em] text-ink/45">
              {t.about.focusTitle}
            </p>
            <div className="flex flex-wrap gap-2">
              {t.about.focus.map((tag) => (
                <span
                  key={tag}
                  // 与 Design Focus 列表同款放大;hover 时边框 + 文字向品牌红靠拢,
                  // 形成可点状的反馈(虽然实际不可点,纯视觉强调)
                  className="inline-block origin-center border border-ink/25 px-4 py-2 text-[13px] font-medium text-ink/75 transition-all duration-200 ease-out hover:scale-[1.05] hover:border-brand hover:text-ink"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* 目标 */}
          <p className="max-w-md text-[15px] leading-relaxed text-ink/70">
            {t.about.goal}
          </p>
        </Reveal>

        {/* Skills 右 —— 右列延后 120ms reveal,与左列形成自然错峰 */}
        <Reveal delay={120}>
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.3em]">
            <span
              className="mr-3 inline-block h-px w-8 bg-brand align-middle"
              aria-hidden
            />
            {t.skills.eyebrow}
          </p>

          <div className="grid grid-cols-2 gap-3">
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

          {/* Design Focus —— Skills 下方的小列表,填补右侧空白
              视觉风格:左侧细红线 + 黑字,与 About 各小标题(Experience / Focus)
              一致;条目间用细分隔线,不做大按钮,保持极简 */}
          <div className="mt-10">
            <p className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em]">
              <span
                className="mr-3 inline-block h-px w-8 bg-brand align-middle"
                aria-hidden
              />
              {t.designFocus.title}
            </p>
            <ul className="divide-y divide-ink/15 border-y border-ink/15">
              {t.designFocus.items.map((item) => (
                <li
                  key={item}
                  // origin-left:hover 时整行向右展开放大,左侧红点保持锚定
                  // hover:text-ink:同时把文字加深一档,呼应放大的互动感
                  className="flex origin-left items-center gap-3 py-3 text-[14px] text-ink/80 transition-all duration-200 ease-out hover:scale-[1.04] hover:text-ink"
                >
                  <span
                    className="inline-block h-1 w-1 flex-shrink-0 bg-brand"
                    aria-hidden
                  />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
