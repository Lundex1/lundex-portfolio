"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { ui, type Lang, LANG_STORAGE_KEY, type UI } from "@/data/i18n";

/** 把内部 Lang 键映射到 BCP 47 标签 → 写到 <html lang="..."> */
function htmlLangFor(l: Lang): string {
  if (l === "jp") return "ja";
  if (l === "zh") return "zh-CN";
  return "en";
}

/**
 * 全站语言上下文。
 *
 * SSR / 首屏渲染:固定 "en" → 服务端与客户端首帧一致,不会触发 hydration mismatch。
 * 客户端挂载后:useEffect 读 localStorage,若用户上次选过 jp,则切到 jp。
 *
 * setLang 同时:
 *   1. 更新 state(触发整页所有消费者重新渲染,不刷新页面)
 *   2. 写 localStorage(下次访问保持)
 *   3. 同步 <html lang> 属性(辅助技术、搜索引擎可读)
 */

type LangCtx = {
  lang: Lang;
  setLang: (l: Lang) => void;
  t: UI;
};

const Ctx = createContext<LangCtx | null>(null);

export default function LangProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [lang, setLangState] = useState<Lang>("en");

  // 首次挂载后读取上次保存的语言
  useEffect(() => {
    try {
      const saved = localStorage.getItem(LANG_STORAGE_KEY);
      if (saved === "en" || saved === "jp" || saved === "zh") {
        setLangState(saved);
        document.documentElement.lang = htmlLangFor(saved);
      }
    } catch {
      /* localStorage 不可用时静默回退到默认 en */
    }
  }, []);

  const setLang = useCallback((l: Lang) => {
    // 切换瞬间给 body 加 .lang-switching → main 短暂半透明,~150ms 后恢复;
    // 视觉上有一个非常轻的 "翻页" 感,而不是文字硬切。
    if (typeof document !== "undefined") {
      const body = document.body;
      body.classList.add("lang-switching");
      // 短暂等 main 进入半透明状态,再切语言 + 恢复透明度,
      // 这样 EN ↔ JP 文字替换被夹在 fade 中间,不会被看到硬切
      window.setTimeout(() => {
        setLangState(l);
        document.documentElement.lang = htmlLangFor(l);
        // 下一帧再移除类,让浏览器把新文本渲到 dom 之后再触发 fade-in
        requestAnimationFrame(() => {
          body.classList.remove("lang-switching");
        });
      }, 140);
    } else {
      setLangState(l);
    }
    try {
      localStorage.setItem(LANG_STORAGE_KEY, l);
    } catch {
      /* 静默忽略 */
    }
  }, []);

  return (
    <Ctx.Provider value={{ lang, setLang, t: ui[lang] }}>
      {children}
    </Ctx.Provider>
  );
}

/** 取当前语言、切换函数、以及当前语言下的 UI 字典 */
export function useLang(): LangCtx {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useLang must be used within <LangProvider>");
  return ctx;
}
