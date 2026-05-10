/**
 * 全站作品数据 —— 唯一数据源。
 *
 * 首页 Featured Works 与 /works/[slug] 详情页都从这里读取,改一处全站同步。
 *
 * 字段说明:
 *   slug        URL 路径,对应 /works/<slug>
 *   number      首页卡片左上角序号
 *   title       作品标题
 *   category    分类
 *   description 详情页 Hero 的项目简介
 *   projectType / stage / tools / date  详情页信息栏 4 列
 *   coverImage  首页卡片封面图 + 详情页 Hero 大图
 *   images      详情页画廊数组(可任意增减)
 *
 * ─── 使用速查 ────────────────────────────────────────────
 *  · 改作品标题 / 分类 / 简介:改下面对应项的字段
 *  · 加新图(第 7、8 张):在该项的 images 数组末尾追加 {} 即可
 *  · 改某张图的说明:改对应 image 项的 title / description / stage / tools
 *  · 加新作品:在 workDetails 数组末尾追加一项,首页与详情页自动出现
 *  · 图片放置位置:public/works/<folder>/01.jpg 等;若文件暂缺,
 *    SmartImage 组件会自动显示带序号的占位,不会报错
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
  images: WorkImage[];
};

export const workDetails: WorkDetail[] = [
  {
    slug: "warehouse-church",
    number: "01",
    title: "Warehouse Church",
    category: "Environment Design",
    description:
      "A ruined warehouse transformed into a secluded place of worship. Exploring the contrast between divine faith and decayed reality, with strong atmospheric storytelling and cinematic lighting.",
    projectType: "Environment Concept",
    stage: "Concept Design",
    tools: ["Photoshop", "Blender", "UE5"],
    date: "2025",
    coverImage: "/works/01.png",
    images: [
      {
        src: "/works/warehouse/01.png",
        title: "Abandoned Sanctuary",
        description:
          "The core scene of the project. Capturing a feeling of silent devotion in a place long forgotten by people.",
        stage: "Final Render",
        tools: ["Photoshop", "Blender", "UE5"],
      },
      {
        src: "/works/warehouse/02.png",
        title: "Golden Hour",
        description:
          "Warm afternoon light pouring through the broken roof, accentuating dust particles and texture.",
        stage: "Lighting Test",
        tools: ["Blender", "UE5"],
      },
      {
        src: "/works/warehouse/03.png",
        title: "Side Aisle",
        description:
          "Compositional study of the side aisle, exploring vertical lines and silhouette.",
        stage: "3D Blockout",
        tools: ["Blender"],
      },
      {
        src: "/works/warehouse/04.png",
        title: "Inner Chapel",
        description:
          "An intimate corner showing makeshift devotional objects and candles.",
        stage: "Final Render",
        tools: ["Photoshop", "Blender", "UE5"],
      },
      {
        src: "/works/warehouse/05.png",
        title: "Light Beam Study",
        description:
          "Iteration on volumetric light passing between structural beams.",
        stage: "Lighting Test",
        tools: ["UE5"],
      },
      {
        src: "/works/warehouse/06.png",
        title: "Detail Pass",
        description:
          "Texture and material detail pass on weathered wood and rusted metal.",
        stage: "Material Pass",
        tools: ["Substance Painter", "Blender"],
      },
    ],
  },
  {
    slug: "lighting-concept-sketch",
    number: "02",
    title: "Concept Sketch",
    category: "Early Concept Exploration",
    description:
      "Early sketches exploring composition, atmosphere, and spatial ideas before moving into more detailed environment design. This stage helps test directions quickly and avoid committing too early to one solution.",
    projectType: "Concept Sketch",
    stage: "Early Exploration",
    tools: ["Photoshop"],
    date: "2025",
    coverImage: "/works/02.jpg",
    images: [
      {
        src: "/works/lighting/01.png",
        title: "Sketch 01",
        description:
          "A preliminary sketch used to test composition, mood, and spatial direction.",
        stage: "Early Sketch",
        tools: ["Photoshop"],
      },
      {
        src: "/works/lighting/02.png",
        title: "Sketch 02",
        description:
          "A preliminary sketch used to test composition, mood, and spatial direction.",
        stage: "Early Sketch",
        tools: ["Photoshop"],
      },
      {
        src: "/works/lighting/03.png",
        title: "Sketch 03",
        description:
          "A preliminary sketch used to test composition, mood, and spatial direction.",
        stage: "Early Sketch",
        tools: ["Photoshop"],
      },
      {
        src: "/works/lighting/04.png",
        title: "Sketch 04",
        description:
          "A preliminary sketch used to test composition, mood, and spatial direction.",
        stage: "Early Sketch",
        tools: ["Photoshop"],
      },
      {
        src: "/works/lighting/05.jpg",
        title: "Sketch 05",
        description:
          "A preliminary sketch used to test composition, mood, and spatial direction.",
        stage: "Early Sketch",
        tools: ["Photoshop"],
        orientation: "portrait",
      },
      {
        src: "/works/lighting/06.jpg",
        title: "Sketch 06",
        description:
          "A preliminary sketch used to test composition, mood, and spatial direction.",
        stage: "Early Sketch",
        tools: ["Photoshop"],
        orientation: "portrait",
      },
    ],
  },
  {
    slug: "sci-fi-device-design",
    number: "03",
    title: "Sci-Fi Device Design",
    category: "Prop / Device Design",
    description:
      "Design variations for a sci-fi environment asset. This project explores different shapes, functions, and detail levels to find a direction that can fit into a larger scene.",
    projectType: "Environment Asset",
    stage: "Design Exploration",
    tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
    date: "2026",
    coverImage: "/works/03.jpg",
    images: [
      {
        src: "/works/device/01.jpg",
        title: "Variant 01",
        description:
          "A design option exploring form, structure, and detail for a sci-fi environment asset.",
        stage: "Design Exploration",
        tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
      },
      {
        src: "/works/device/02.jpg",
        title: "Variant 02",
        description:
          "A design option exploring form, structure, and detail for a sci-fi environment asset.",
        stage: "Design Exploration",
        tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
      },
      {
        src: "/works/device/03.jpg",
        title: "Variant 03",
        description:
          "A design option exploring form, structure, and detail for a sci-fi environment asset.",
        stage: "Design Exploration",
        tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
      },
      {
        src: "/works/device/04.jpg",
        title: "Variant 04",
        description:
          "A design option exploring form, structure, and detail for a sci-fi environment asset.",
        stage: "Design Exploration",
        tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
      },
      {
        src: "/works/device/05.jpg",
        title: "Variant 05",
        description:
          "A design option exploring form, structure, and detail for a sci-fi environment asset.",
        stage: "Design Exploration",
        tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
      },
      {
        src: "/works/device/06.jpg",
        title: "Variant 06",
        description:
          "A design option exploring form, structure, and detail for a sci-fi environment asset.",
        stage: "Design Exploration",
        tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
      },
    ],
  },
  {
    slug: "wall-design",
    number: "04",
    title: "Wall Design",
    category: "Environment Asset Design",
    description:
      "Wall asset design for a sci-fi environment kit. The focus is on structure, panel rhythm, material separation, and reusable details for scene construction.",
    projectType: "Environment Asset",
    stage: "Asset Design",
    tools: ["Blender", "3DCoat", "Substance Painter"],
    date: "2026",
    coverImage: "/works/04.jpg",
    images: [
      {
        src: "/works/wall/01.jpg",
        title: "Base Tile A",
        description:
          "A wall asset study focused on modular structure, material separation, and surface detail.",
        stage: "Asset Design",
        tools: ["Blender", "3DCoat", "Substance Painter"],
      },
      {
        src: "/works/wall/02.jpg",
        title: "Damaged Variant",
        description:
          "A wall asset study focused on modular structure, material separation, and surface detail.",
        stage: "Asset Design",
        tools: ["Blender", "3DCoat", "Substance Painter"],
      },
      {
        src: "/works/wall/03.jpg",
        title: "Module Set",
        description:
          "A wall asset study focused on modular structure, material separation, and surface detail.",
        stage: "Asset Design",
        tools: ["Blender", "3DCoat", "Substance Painter"],
      },
    ],
  },
];

export function getWorkBySlug(slug: string): WorkDetail | undefined {
  return workDetails.find((w) => w.slug === slug);
}
