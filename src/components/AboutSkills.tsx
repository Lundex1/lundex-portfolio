const skills = [
  "Photoshop",
  "Blender",
  "3DCoat",
  "Substance Painter",
  "Unreal Engine 5",
  "DaVinci Resolve",
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
            Designing Spaces.
            <br />
            Telling Stories.
          </h2>

          <p className="max-w-md text-[15px] leading-relaxed text-ink/70">
            I&apos;m an environment concept designer focused on creating
            compelling spaces that support narrative, evoke emotion, and inspire
            exploration. With a background in worldbuilding, I bring both
            structure and imagination to every project.
          </p>
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
            {skills.map((s) => {
              const active = s === ACTIVE_SKILL;
              return (
                <span
                  key={s}
                  className={`px-5 py-4 text-center text-sm transition-colors ${
                    active
                      ? "bg-brand text-white"
                      : "bg-ink text-white hover:bg-ink-soft"
                  }`}
                >
                  {s}
                </span>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
