// 底部联系方式 —— 之后改链接来这里
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
  return (
    <footer
      id="contact"
      className="bg-ink px-6 py-16 text-white lg:px-12"
    >
      <div className="mx-auto grid max-w-[1360px] gap-8 md:grid-cols-3 md:items-center">
        <div className="flex items-center gap-4">
          <span className="flex h-9 w-9 items-center justify-center bg-brand text-sm font-extrabold">
            L
          </span>
          <p className="text-[10px] uppercase leading-relaxed tracking-[0.3em]">
            Worlds are Built.
            <br />
            Meaning is Designed.
          </p>
        </div>

        <p className="text-xs text-white/50 md:text-center">
          © {new Date().getFullYear()} LUNDEX
          <br />
          All Rights Reserved.
        </p>

        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm md:justify-end">
          {links.map((l) => {
            const isExternal = !l.href.startsWith("mailto:");
            return (
              <li key={l.label}>
                <a
                  href={l.href}
                  className="transition-colors hover:text-brand"
                  {...(isExternal && {
                    target: "_blank",
                    rel: "noopener noreferrer",
                  })}
                >
                  {l.label}
                </a>
              </li>
            );
          })}
        </ul>
      </div>
    </footer>
  );
}
