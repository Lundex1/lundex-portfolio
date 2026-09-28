/**
 * 首页 Featured Works 用的轻量列表。
 *
 * 数据源:src/data/workDetails.ts (英文) + src/data/workDetailsJp.ts (日文)
 *         + src/data/workDetailsZh.ts (中文)
 * 改作品标题/分类/封面去那三个文件;这里只负责按 slug 配对、扁平化成卡片字段。
 *
 * 三语字段({ en, jp, zh })在 WorkCard 内根据 useLang() 选择渲染,
 * 无需复制组件。
 */

import { workDetails } from "./workDetails";
import { workDetailsJp } from "./workDetailsJp";
import { workDetailsZh } from "./workDetailsZh";

export type Project = {
  /** 同时也是 slug,用于跳转 /works/[id] */
  id: string;
  number: string;
  image: string;
  /** 三语标题。WorkCard 根据当前语言取一项。 */
  title: { en: string; jp: string; zh: string };
  category: { en: string; jp: string; zh: string };
  /** 不走 /works/[id] 详情页时的直达地址(整页跳转,例如 /defense 点击式发表) */
  href?: string;
};

/**
 * 没有详情页的额外卡片 —— 点击直接打开独立页面。
 * 04 = 毕业制作前期发表的点击式演示(public/defense/index.html,由 F:\video 的 build-web-player 生成)。
 */
const extraProjects: Project[] = [
  {
    id: "defense",
    number: "04",
    image: "/defense/cover.jpg",
    href: "/defense",
    title: { en: "ENVIRONMENT DESIGN", jp: "ゲームのための環境デザイン", zh: "面向游戏的环境设计" },
    category: { en: "Graduation Project · Interactive Deck", jp: "卒業制作・インタラクティブ発表", zh: "毕业制作・点击式发表" },
  },
];

const detailProjects: Project[] = workDetails.map((w) => {
  const jp = workDetailsJp.find((j) => j.slug === w.slug);
  const zh = workDetailsZh.find((z) => z.slug === w.slug);
  return {
    id: w.slug,
    number: w.number,
    image: w.coverImage,
    title: {
      en: w.title,
      jp: jp?.title ?? w.title,
      zh: zh?.title ?? w.title,
    },
    category: {
      en: w.category,
      jp: jp?.category ?? w.category,
      zh: zh?.category ?? w.category,
    },
  };
});

export const projects: Project[] = [...detailProjects, ...extraProjects];
