/**
 * NIO / VARIANT 项目数据的中文版本。
 *
 * 结构与 workDetails.ts(英文)/ workDetailsJp.ts(日文)严格对齐:
 *   · 同 slug、同 number、同 coverImage、同 section 数量、同图片顺序、同 src
 *   · 仅"可翻译的字符串字段"换成中文
 *
 * 消费组件按 useLang() 在三套数据中索引切换,无需重写渲染逻辑。
 */

import type { WorkDetail } from "./workDetails";

const VARIANT_DEVICE_TPL_ZH = {
  description: "探索科幻环境资产造型、结构和细节的设计方案。",
  stage: "设计探索",
  tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
};

export const workDetailsZh: WorkDetail[] = [
  // ═══════════════════════════════════════════════════════
  //  01 — NIO
  // ═══════════════════════════════════════════════════════
  {
    slug: "nio",
    number: "01",
    title: "NIO",
    category: "叙事型恐怖环境",
    description:
      "NIO 是一个以废弃教堂为核心场景的叙事恐怖环境项目。从早期布局草图到最终氛围探索,关注空间流动、仪式符号、光照层级与环境叙事。",
    projectType: "环境概念",
    stage: "概念设计",
    tools: ["Photoshop", "Blender"],
    date: "2025",
    coverImage: "/works/01.png",
    sections: [
      {
        label: "设计流程",
        images: [
          {
            src: "/works/warehouse/001.png",
            title: "一层布局研究",
            description:
              "探索一层空间结构、动线和物件摆放的早期布局草图。",
            stage: "概念草图",
            tools: ["Photoshop"],
          },
          {
            src: "/works/warehouse/01.png",
            title: "二层布局研究",
            description:
              "探索二层空间布置、仪式区域、动线和关键物件的早期布局草图。",
            stage: "概念草图",
            tools: ["Photoshop"],
          },
          {
            src: "/works/warehouse/03.png",
            title: "故事门设计",
            description:
              "主要故事门的关键资产设计,作为重要进度节点,用于强化邪教空间的视觉语言。",
            stage: "关键资产设计",
            tools: ["Photoshop"],
          },
          {
            src: "/works/warehouse/04.png",
            title: "悬挂邪教信物设计",
            description:
              "一层悬挂邪教信物的关键资产研究,探索剪影、象征性细节及其作为场景叙事线索的作用。",
            stage: "关键资产设计",
            tools: ["Photoshop"],
          },
          {
            src: "/works/warehouse/05.png",
            title: "献祭人形视觉焦点",
            description:
              "二层献祭人形的设计研究,探索姿势、剪影,以及身体作为仪式空间主要视觉焦点的作用。",
            stage: "关键视觉资产设计",
            tools: ["Photoshop"],
          },
          {
            src: "/works/warehouse/06.png",
            title: "二层祭坛设计",
            description:
              "二层的交互式祭坛道具设计,关注仪式结构、可读的交互点和装饰细节。",
            stage: "交互道具设计",
            tools: ["Photoshop"],
          },
          {
            src: "/works/warehouse/07.jpg",
            title: "敌人概念设计 01",
            description:
              "敌人概念探索,围绕体型、服饰和邪教相关细节,聚焦剪影与敌对存在感。",
            stage: "角色概念设计",
            tools: ["Photoshop"],
            orientation: "portrait",
          },
          {
            src: "/works/warehouse/08.jpg",
            title: "敌人概念设计 02",
            description:
              "敌人变体研究,探索服饰比例、法杖设计与邪教派系的角色辨识度。",
            stage: "角色概念设计",
            tools: ["Photoshop"],
            orientation: "portrait",
          },
        ],
      },
      {
        label: "灯光研究",
        images: [
          {
            src: "/works/lighting/01.jpg",
            title: "一层概念图",
            description:
              "一层早期概念图,用于测试氛围、构图、光照方向和空间整体情绪。",
            stage: "环境概念",
            tools: ["Photoshop"],
          },
          {
            src: "/works/lighting/02.png",
            title: "故事门概念图",
            description:
              "聚焦一层故事门的概念图,探索其光照、周边氛围和场景中的叙事重要性。",
            stage: "环境概念",
            tools: ["Photoshop"],
            orientation: "portrait",
          },
          {
            src: "/works/lighting/03.png",
            title: "二层灯光研究 01",
            description:
              "二层仪式区域的灯光研究,测试焦点层级、明暗对比以及光如何引导视线聚焦主视觉。",
            stage: "灯光研究",
            tools: ["Photoshop"],
          },
          {
            src: "/works/lighting/04.png",
            title: "二层灯光研究 02",
            description:
              "测试更广构图、阴影分布以及玩家视觉路径可读性的灯光探索。",
            stage: "灯光研究",
            tools: ["Photoshop"],
          },
          {
            src: "/works/lighting/05.png",
            title: "二层灯光研究 03",
            description:
              "探索二层最终情绪方向的灯光研究,平衡黑暗、逆光与仪式氛围。",
            stage: "灯光研究",
            tools: ["Photoshop"],
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  02 — VARIANT
  // ═══════════════════════════════════════════════════════
  {
    slug: "variant",
    number: "02",
    title: "VARIANT",
    category: "科幻设施设计",
    description:
      "VARIANT 是一个聚焦模块化墙面系统与环境资产探索的科幻设施开发项目。在正式搭建完整场景之前,先验证工业造型、材质分区与功能设计语言。",
    projectType: "科幻环境开发",
    stage: "资产设计验证",
    tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
    date: "2026",
    coverImage: "/works/03.jpg",
    sections: [
      {
        label: "设备设计",
        images: [
          { src: "/works/device/01.jpg", title: "设备方案 01", ...VARIANT_DEVICE_TPL_ZH },
          { src: "/works/device/02.jpg", title: "设备方案 02", ...VARIANT_DEVICE_TPL_ZH },
          { src: "/works/device/03.jpg", title: "设备方案 03", ...VARIANT_DEVICE_TPL_ZH },
          { src: "/works/device/04.jpg", title: "设备方案 04", ...VARIANT_DEVICE_TPL_ZH },
          { src: "/works/device/05.jpg", title: "设备方案 05", ...VARIANT_DEVICE_TPL_ZH },
          { src: "/works/device/06.jpg", title: "设备方案 06", ...VARIANT_DEVICE_TPL_ZH },
        ],
      },
      {
        label: "墙面设计",
        images: [
          {
            src: "/works/wall/01.jpg",
            title: "墙面设计 01",
            description:
              "关注模块化结构、材质分区与表面细节的墙面资产研究。",
            stage: "资产设计",
            tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
          },
          {
            src: "/works/wall/02.jpg",
            title: "墙面设计 02",
            description:
              "在设施内设想变体展开,探索不同构成与细节的墙面设计。",
            stage: "资产设计",
            tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
          },
          {
            src: "/works/wall/03.jpg",
            title: "墙面设计 03",
            description:
              "考虑模块化复用、便于重复使用的造型与功能可读性的墙面方案。",
            stage: "资产设计",
            tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
          },
        ],
      },
    ],
  },
];

export function getWorkBySlugZh(slug: string): WorkDetail | undefined {
  return workDetailsZh.find((w) => w.slug === slug);
}
