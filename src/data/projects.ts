/**
 * 首页 Featured Works 用的轻量列表。
 *
 * 数据源:src/data/workDetails.ts (英文) + src/data/workDetailsJp.ts (日文)
 * 改作品标题/分类/封面去那两个文件;这里只负责按 slug 配对、扁平化成卡片字段。
 *
 * 双语字段({ en, jp })在 WorkCard 内根据 useLang() 选择渲染,无需复制组件。
 */

import { workDetails } from "./workDetails";
import { workDetailsJp } from "./workDetailsJp";

export type Project = {
  /** 同时也是 slug,用于跳转 /works/[id] */
  id: string;
  number: string;
  image: string;
  /** 双语标题。WorkCard 根据当前语言选取一项。 */
  title: { en: string; jp: string };
  category: { en: string; jp: string };
};

export const projects: Project[] = workDetails.map((w) => {
  const jp = workDetailsJp.find((j) => j.slug === w.slug);
  return {
    id: w.slug,
    number: w.number,
    image: w.coverImage,
    title: { en: w.title, jp: jp?.title ?? w.title },
    category: { en: w.category, jp: jp?.category ?? w.category },
  };
});
