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

const skills: Skill[] = [
  { name: "Photoshop", Icon: PhotoshopIcon },
  { name: "Blender", Icon: BlenderIcon },
  { name: "3DCoat", Icon: ThreeDCoatIcon },
  { name: "Substance Painter", Icon: SubstanceIcon },
  { name: "Unreal Engine 5", Icon: UnrealIcon },
  { name: "DaVinci Resolve", Icon: DaVinciIcon },
];

// 高亮哪一项(用红色)。原本是 "Environment Design",新列表里没有此项,
// 暂选 "Unreal Engine 5" 作为高亮以保留概念图里的红色焦点效果。
const ACTIVE_SKILL = "Unreal Engine 5";

export default function AboutSkills() {
  return (
    <section id="about" className="px-6 py-24 lg:px-12 lg:py-32">
      <div className="mx-auto grid max-w-[1360px] gap-16 lg:grid-cols-2">
        {/* About 左 */}
        <div>
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.3em]">
            <span
              className="mr-3 inline-block h-px w-8 bg-brand align-middle"
              aria-hidden
            />
            About
          </p>

          <h2 className="mb-8 text-3xl font-extrabold leading-tight sm:text-4xl lg:text-5xl">
            Personal Introduction
          </h2>

          {/*
            头像 + 简介:横向排列(sm 及以上),移动端自动堆叠为上下。
            正文 max-w 限制行宽,保证可读性;头像固定接近正方形不被拉伸。
          */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/works/06.png"
              alt="LUNDEX portrait"
              className="h-32 w-32 flex-shrink-0 object-cover sm:h-36 sm:w-36"
            />

            <div className="max-w-md space-y-4 text-[15px] leading-relaxed text-ink/70">
              <p className="font-bold text-ink">Name: LUNDEX</p>

              <p>
                I am an environment concept design student focused on game
                spaces, atmosphere, and 3D-assisted visual development.
              </p>

              <p>
                I have studied drawing for around seven years and have been
                working with 3D software for about three years. My workflow
                combines sketching, Blender, 3DCoat, Photoshop, and texture
                production to explore spaces, props, lighting, and visual
                direction.
              </p>

              <p>
                I was selected to participate in Capcom&rsquo;s portfolio
                review program and have contributed to an outsourced project
                for ByteDance. These experiences gave me a clearer
                understanding of professional feedback, production standards,
                and how visual design decisions connect with real project
                needs.
              </p>

              <p>
                My goal is to become an environment concept designer in the
                game industry, creating spaces that support gameplay, mood,
                and storytelling.
              </p>
            </div>
          </div>
        </div>

        {/* Skills 右 */}
        <div>
          <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.3em]">
            <span
              className="mr-3 inline-block h-px w-8 bg-brand align-middle"
              aria-hidden
            />
            Skills
          </p>

          <div className="grid grid-cols-2 gap-3">
            {skills.map(({ name, Icon }) => {
              const active = name === ACTIVE_SKILL;
              return (
                <span
                  key={name}
                  className={`grid grid-cols-[32px_1fr] items-center gap-4 px-5 py-4 text-sm transition-colors ${
                    active
                      ? "bg-brand text-white"
                      : "bg-ink text-white hover:bg-ink-soft"
                  }`}
                >
                  {/*
                    Icon 槽:固定 32px 宽,图标在槽内居中。每个按钮里
                    icon 槽宽度一致 → 文字起点 X 坐标完全对齐(同列各按钮
                    "Photoshop / 3DCoat / Unreal Engine 5" 文字左边对齐)。
                    图标随父级 color (currentColor) 自动跟随白 / 红。
                  */}
                  <span className="flex items-center justify-center">
                    <Icon />
                  </span>
                  <span className="text-left">{name}</span>
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
