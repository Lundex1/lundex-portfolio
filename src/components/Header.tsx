"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLang } from "./LangProvider";

// 导航项 id 与首页 section 的 DOM id 对应;label 走 i18n 字典
const navItemIds = ["works", "about", "contact"] as const;
type NavId = (typeof navItemIds)[number];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [active, setActive] = useState<string>("");
  const { lang, setLang, t } = useLang();

  // 仅在首页用 IntersectionObserver 跟踪当前 section
  useEffect(() => {
    if (!isHome) return;

    const sections = navItemIds
      .map((id) => document.getElementById(id))
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

  // i18n 字典里 nav 字段就是 { works, about, contact } 键名 → 直接索引
  const labelFor = (id: NavId) => t.nav[id];

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-ink text-white">
      {/* 移动端 px-4,平板及以上恢复 px-6/lg:px-12;给 EN/JP 留空间防溢出 */}
      <div className="mx-auto flex h-16 max-w-[1360px] items-center justify-between px-4 sm:px-6 lg:px-12">
        <Link
          href="/"
          className="flex items-center gap-2 text-sm font-extrabold tracking-[0.2em]"
          aria-label="LUNDEX home"
        >
          <span className="block h-4 w-1 bg-brand" aria-hidden />
          LUNDEX
        </Link>

        {/* 右侧:导航 + 语言切换。小屏 gap 收紧,确保 360px 也能放下 */}
        <div className="flex items-center gap-3 sm:gap-6 lg:gap-8">
          <nav>
            <ul className="flex items-center gap-4 text-[13px] sm:gap-6 sm:text-sm lg:gap-8">
              {navItemIds.map((id) => {
                const isActive = isHome && active === id;
                return (
                  <li key={id}>
                    <a
                      href={hrefFor(id)}
                      className={`relative py-1 transition-colors ${
                        isActive ? "text-brand" : "hover:text-brand"
                      }`}
                    >
                      {labelFor(id)}
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

          {/* 语言切换:EN / JP / ZH。小屏取消左侧竖线,节省空间 */}
          <div
            className="flex items-center gap-1.5 pl-2 text-[11px] font-semibold tracking-wider sm:border-l sm:border-white/15 sm:pl-4 sm:text-[12px] lg:pl-5"
            role="group"
            aria-label="Language switch"
          >
            <button
              type="button"
              onClick={() => setLang("en")}
              aria-pressed={lang === "en"}
              className={`transition-colors ${
                lang === "en"
                  ? "text-brand"
                  : "text-white/55 hover:text-white"
              }`}
            >
              {t.langToggle.en}
            </button>
            <span className="text-white/25" aria-hidden>
              /
            </span>
            <button
              type="button"
              onClick={() => setLang("jp")}
              aria-pressed={lang === "jp"}
              className={`transition-colors ${
                lang === "jp"
                  ? "text-brand"
                  : "text-white/55 hover:text-white"
              }`}
            >
              {t.langToggle.jp}
            </button>
            <span className="text-white/25" aria-hidden>
              /
            </span>
            <button
              type="button"
              onClick={() => setLang("zh")}
              aria-pressed={lang === "zh"}
              className={`transition-colors ${
                lang === "zh"
                  ? "text-brand"
                  : "text-white/55 hover:text-white"
              }`}
            >
              {t.langToggle.zh}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
