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
};

export const projects: Project[] = workDetails.map((w) => {
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
