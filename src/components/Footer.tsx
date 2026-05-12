"use client";

import { useLang } from "./LangProvider";
import Reveal from "./Reveal";

// 联系方式链接(社交平台名保持英文,不进字典)
const links = [
  { label: "ArtStation", href: "https://www.artstation.com/lundex" },
  {
    label: "Instagram",
    href: "https://www.instagram.com/lundex_jjl?igsh=MXkwd2FvYTBhajE3Zg%3D%3D",
  },
  { label: "X / Twitter", href: "https://x.com/Lundex1234" },
  { label: "Email", href: "mailto:a18632690113@gmail.com" },
];

export default function Footer() {
  const { lang, t } = useLang();

  // 英文 slogan 走 uppercase 字距;CJK(jp / zh)不需要 uppercase,
  // 字号略大一档保持可读
  const sloganClass =
    lang === "en"
      ? "text-[11px] uppercase leading-relaxed tracking-[0.3em]"
      : "text-[12px] leading-relaxed tracking-[0.18em]";

  return (
    <footer
      id="contact"
      className="bg-ink px-6 py-16 text-white lg:px-12"
    >
      <Reveal className="mx-auto grid max-w-[1360px] gap-8 md:grid-cols-3 md:items-center">
        <div className="flex items-center gap-4">
          <span className="flex h-9 w-9 items-center justify-center bg-brand text-sm font-extrabold">
            L
          </span>
          <p className={sloganClass}>
            {t.footer.slogan[0]}
            <br />
            {t.footer.slogan[1]}
          </p>
        </div>

        {/* 版权:/50 → /70,从"几乎看不见"提到"低调可读" */}
        <p className="text-xs leading-relaxed text-white/70 md:text-center">
          {t.footer.rights[0]}
          <br />
          {t.footer.rights[1]}
        </p>

        {/* 社交链接:保持低调(/85 而非纯白),hover 转品牌红 */}
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/85 md:justify-end">
          {links.map((l) => {
            const isExternal = !l.href.startsWith("mailto:");
            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="group inline-flex items-center gap-1.5 transition-colors hover:text-brand"
                  {...(isExternal && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {/* hover 时左侧小红点显形 → 比单纯换色更有交互反馈 */}
                  <span
                    className="inline-block h-1 w-1 origin-center scale-0 bg-brand transition-transform duration-300 group-hover:scale-100"
                    aria-hidden
                  />
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </footer>
  );
}
