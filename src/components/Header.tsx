"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const navItems = [
  { id: "works", label: "Works" },
  { id: "about", label: "About" },
  { id: "contact", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState<string>("");

  // 仅在首页用 IntersectionObserver 跟踪当前 section
  useEffect(() => {
    if (!isHome) return;

    const sections = navItems
      .map((i) => document.getElementById(i.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-40% 0px -40% 0px", threshold: [0.1, 0.5, 1] }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [isHome]);

  // 首页用纯锚点(平滑滚动);其他页跳回首页对应锚点
  const hrefFor = (id: string) => (isHome ? `#${id}` : `/#${id}`);

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink text-white">
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-6 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-extrabold tracking-[0.2em]"
          aria-label="LUNDEX home"
        >
          <span className="block h-4 w-1 bg-brand" aria-hidden />
          LUNDEX
        </Link>
        <nav>
          <ul className="flex items-center gap-8 text-sm">
            {navItems.map((item) => {
              const isActive = isHome && active === item.id;
              return (
                <li key={item.id}>
                  <a
                    href={hrefFor(item.id)}
                    className={`relative py-1 transition-colors ${
                      isActive ? "text-brand" : "hover:text-brand"
                    }`}
                  >
                    {item.label}
                    {isActive && (
                      <span
                        className="absolute -bottom-0.5 left-0 right-0 h-px bg-brand"
                        aria-hidden
                      />
                    )}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>
      </div>
    </header>
  );
}
