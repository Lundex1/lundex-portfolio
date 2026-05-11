/**
 * 全站作品数据 —— 唯一数据源。
 *
 * 首页 Featured Works 与 /works/[slug] 详情页都从这里读取,改一处全站同步。
 *
 * 数据结构(项目 → 多个 section → 多张图):
 *   WorkDetail.sections[]              一个项目可以有多个内部分组
 *     ├─ label                         分组标题(显示在画廊缩略图组上方)
 *     └─ images[]                      该分组的图片
 *          ├─ src                      图片路径(public 下)
 *          ├─ title                    图片标题(viewer 下方显示)
 *          ├─ description / stage / tools  说明字段
 *          └─ orientation              "portrait" = 竖图,缩略图用 object-contain
 *
 * ─── 使用速查 ────────────────────────────────────────────
 *  · 改项目标题/分类/简介/工具:改下面对应项的顶层字段
 *  · 给 NIO / VARIANT 加新分组:在 sections 数组里追加 { label, images } 对象
 *  · 给某分组加新图:在该 section 的 images 数组末尾追加 { ... }
 *  · 改某张图的说明:改对应 image 项的 title / description / stage / tools
 *  · 图片放置位置:public/works/<folder>/...;若文件暂缺,SmartImage 会显示占位
 */

export type WorkImage = {
  src: string;
  title: string;
  description: string;
  stage: string;
  tools: string[];
  /** 竖图 = portrait,横图 = landscape(可省略,默认按横图处理)。
   *  仅影响 Gallery 缩略图的 object-fit:portrait 用 contain 不裁切。 */
  orientation?: "portrait" | "landscape";
};

/** 项目内部分组,例如 NIO 项目里的 "Environment Design" / "Concept Sketch" */
export type WorkSection = {
  label: string;
  images: WorkImage[];
};

export type WorkDetail = {
  slug: string;
  number: string;
  title: string;
  category: string;
  description: string;
  projectType: string;
  stage: string;
  tools: string[];
  date: string;
  coverImage: string;
  sections: WorkSection[];
};

// ─── 同一 section 内每张图共享的说明 ──────────────────────
// 抽常量避免重复(改一处影响该 section 全部图)

// NIO 每张图的说明已各自独立,不再使用共享模板。

const VARIANT_DEVICE_TPL = {
  description:
    "A design option exploring form, structure, and detail for a sci-fi environment asset.",
  stage: "Design Exploration",
  tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
};

const VARIANT_WALL_TPL = {
  description:
    "A wall asset study focused on modular structure, material separation, and surface detail.",
  stage: "Asset Design",
  tools: ["Blender", "3DCoat", "Substance Painter"],
};

export const workDetails: WorkDetail[] = [
  // ═══════════════════════════════════════════════════════
  //  01 — NIO
  //  整合原 Warehouse Church(场景设计) + 原 Concept Sketch(前期草图)
  // ═══════════════════════════════════════════════════════
  {
    slug: "nio",
    number: "01",
    title: "NIO",
    category: "Narrative Horror Environment",
    description:
      "NIO is a narrative horror environment project centered on a ruined church space. The project focuses on spatial flow, ritual symbols, lighting hierarchy, and environmental storytelling from early layout sketches to final mood exploration.",
    projectType: "Environment Concept",
    stage: "Concept Design",
    tools: ["Photoshop", "Blender"],
    date: "2025",
    coverImage: "/works/01.png",
    sections: [
      {
        label: "Design Process",
        images: [
          {
            src: "/works/warehouse/001.png",
            title: "First Floor Layout Study",
            description: "An early layout sketch exploring the first-floor spatial structure, movement flow, and object placement of the scene.",
            stage: "Concept Sketch",
            tools: ["Photoshop"],
          },
          {
            src: "/works/warehouse/01.png",
            title: "Second Floor Layout Study",
            description: "An early layout sketch exploring the second-floor spatial arrangement, ritual area, movement flow, and key object placement.",
            stage: "Concept Sketch",
            tools: ["Photoshop"],
          },
          {
            src: "/works/warehouse/03.png",
            title: "Story Door Design",
            description: "A key asset design for the main story door, used to define an important progression point and reinforce the visual language of the cult space.",
            stage: "Key Asset Design",
            tools: ["Photoshop"],
          },
          {
            src: "/works/warehouse/04.png",
            title: "Hanging Cult Token Design",
            description: "A key asset study for the hanging cult token on the first floor, exploring silhouette, symbolic detail, and its role as a narrative clue in the scene.",
            stage: "Key Asset Design",
            tools: ["Photoshop"],
          },
          {
            src: "/works/warehouse/05.png",
            title: "Sacrificial Figure Focal Point",
            description: "A design study for the sacrificed figure on the second floor, exploring pose, silhouette, and how the body functions as a major visual focus in the ritual space.",
            stage: "Key Visual Asset Design",
            tools: ["Photoshop"],
          },
          {
            src: "/works/warehouse/06.png",
            title: "Second Floor Altar Design",
            description: "An interactive altar prop design for the second floor, focused on ritual structure, readable interaction points, and decorative details.",
            stage: "Interactive Prop Design",
            tools: ["Photoshop"],
          },
          {
            src: "/works/warehouse/07.jpg",
            title: "Enemy Concept Design 01",
            description: "An enemy concept exploring body shape, clothing, and cult-related details, with a focus on silhouette and hostile presence.",
            stage: "Character Concept Design",
            tools: ["Photoshop"],
            orientation: "portrait",
          },
          {
            src: "/works/warehouse/08.jpg",
            title: "Enemy Concept Design 02",
            description: "An enemy variation exploring costume proportions, staff design, and character identity for the cult faction.",
            stage: "Character Concept Design",
            tools: ["Photoshop"],
            orientation: "portrait",
          },
        ],
      },
      {
        label: "Lighting Studies",
        images: [
          {
            src: "/works/lighting/01.jpg",
            title: "First Floor Concept Image",
            description: "An early concept image for the first floor, used to test atmosphere, composition, lighting direction, and the overall mood of the space.",
            stage: "Environment Concept",
            tools: ["Photoshop"],
          },
          {
            src: "/works/lighting/02.png",
            title: "Story Door Concept Image",
            description: "A concept image focused on the first-floor story door, exploring its lighting, surrounding atmosphere, and narrative importance within the scene.",
            stage: "Environment Concept",
            tools: ["Photoshop"],
            orientation: "portrait",
          },
          {
            src: "/works/lighting/03.png",
            title: "Second Floor Lighting Study 01",
            description: "A lighting study for the second-floor ritual area, testing focal hierarchy, contrast, and how light guides attention toward the main scene element.",
            stage: "Lighting Study",
            tools: ["Photoshop"],
          },
          {
            src: "/works/lighting/04.png",
            title: "Second Floor Lighting Study 02",
            description: "A lighting exploration testing a wider composition, shadow distribution, and the readability of the player's visual path through the second-floor space.",
            stage: "Lighting Study",
            tools: ["Photoshop"],
          },
          {
            src: "/works/lighting/05.png",
            title: "Second Floor Lighting Study 03",
            description: "A lighting study exploring the final mood direction for the second floor, balancing darkness, backlight, and ritual atmosphere.",
            stage: "Lighting Study",
            tools: ["Photoshop"],
          },
        ],
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  02 — VARIANT
  //  整合原 Sci-Fi Device Design + 原 Wall Design
  // ═══════════════════════════════════════════════════════
  {
    slug: "variant",
    number: "02",
    title: "VARIANT",
    category: "Sci-Fi Facility Development",
    description:
      "VARIANT is a sci-fi facility development project focused on modular wall systems and environment asset exploration. The project tests industrial forms, material separation, and functional design language before building a complete scene.",
    projectType: "Sci-Fi Environment Development",
    stage: "Asset Design Exploration",
    tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
    date: "2026",
    coverImage: "/works/03.jpg",
    sections: [
      {
        label: "Device Design",
        images: [
          { src: "/works/device/01.jpg", title: "Device 01", ...VARIANT_DEVICE_TPL },
          { src: "/works/device/02.jpg", title: "Device 02", ...VARIANT_DEVICE_TPL },
          { src: "/works/device/03.jpg", title: "Device 03", ...VARIANT_DEVICE_TPL },
          { src: "/works/device/04.jpg", title: "Device 04", ...VARIANT_DEVICE_TPL },
          { src: "/works/device/05.jpg", title: "Device 05", ...VARIANT_DEVICE_TPL },
          { src: "/works/device/06.jpg", title: "Device 06", ...VARIANT_DEVICE_TPL },
        ],
      },
      {
        label: "Wall Design",
        images: [
          { src: "/works/wall/01.jpg", title: "Wall 01", ...VARIANT_WALL_TPL },
          { src: "/works/wall/02.jpg", title: "Wall 02", ...VARIANT_WALL_TPL },
          { src: "/works/wall/03.jpg", title: "Wall 03", ...VARIANT_WALL_TPL },
        ],
      },
    ],
  },
];

export function getWorkBySlug(slug: string): WorkDetail | undefined {
  return workDetails.find((w) => w.slug === slug);
}
