/**
 * 首页 Featured Works 用的轻量列表。
 *
 * 数据源是 src/data/workDetails.ts —— 改作品标题/分类/封面请去那里。
 * 这里只负责把详情数据投影成首页卡片需要的扁平形状。
 */

import { workDetails } from "./workDetails";

export type Project = {
  /** 同时也是 slug,用于跳转 /works/[id] */
  id: string;
  number: string;
  title: string;
  category: string;
  image: string;
};

export const projects: Project[] = workDetails.map((w) => ({
  id: w.slug,
  number: w.number,
  title: w.title,
  category: w.category,
  image: w.coverImage,
}));
