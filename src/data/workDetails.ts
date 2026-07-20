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
  /** true = 该条目是本地视频(src 指向 mp4):
   *  缩略图显示首帧 + ▶ 标记,大图查看器 / 移动卡片用 <video controls> 播放。
   *  视频条目参与画廊全局编号,可排在任意位置。 */
  isVideo?: boolean;
};

/** 视频展示块(如 VARIANT 的 GAMEPLAY SYSTEM DEMO)。
 *  两种来源二选一:
 *    · embedUrl —— YouTube embed(https://www.youtube.com/embed/<id>)
 *    · localSrc —— public 下的本地视频文件(如 /works/project3/demo.mp4),
 *                  用原生 <video controls> 播放
 *  说明字段与图片一致,另加 content[](测试内容逐项展示)。 */
export type WorkVideo = {
  /** YouTube embed 链接;与 localSrc 二选一 */
  embedUrl?: string;
  /** 本地视频路径(public 下);与 embedUrl 二选一,同时存在时优先 localSrc */
  localSrc?: string;
  title: string;
  description: string;
  stage: string;
  tools: string[];
  content: string[];
};

/** 项目内部分组,例如 NIO 项目里的 "Environment Design" / "Concept Sketch"。
 *  若带 video 字段,该 section 渲染为视频展示块(此时 images 为空数组)。 */
export type WorkSection = {
  label: string;
  images: WorkImage[];
  video?: WorkVideo;
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
          { src: "/works/2233.png", title: "Device 07", ...VARIANT_DEVICE_TPL },
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
      {
        // 视频展示分类 —— 基于 UE5 GASP 系统的玩法与角色系统测试
        label: "GAMEPLAY SYSTEM DEMO",
        images: [],
        video: {
          embedUrl: "https://www.youtube.com/embed/qxc540hAxA4",
          title: "Development Test Demo",
          description:
            "A development demo based on the UE5 GASP system, testing character movement, weapon interaction, and whitebox level design.",
          stage: "System Testing / Gameplay Prototype / Whitebox Validation",
          tools: ["Unreal Engine 5", "GASP", "Blueprint"],
          content: [
            "Unarmed Movement Test",
            "Flight System Test",
            "Weapon Animation & Shooting System",
            "Stealth Mode",
            "Whitebox Level Test",
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  03 — PROJECT 03(占位名 —— 正式项目名 / 文案待用户提供后替换)
  // ═══════════════════════════════════════════════════════
  {
    slug: "culmination",
    number: "03",
    title: "CULMINATION",
    category: "Game Concept Art Book",
    description:
      "CULMINATION is my graduation project — a game concept art book. An alternate 1976: the Cold War never ended, resources ran dry, unemployment climbed, and faith in nations collapsed long before their borders did. Into that vacuum stepped MERIDIAN CONSOLIDATED, a conglomerate selling a single promise — “Everything has its place, everyone has a purpose.” It was more efficient than any government, so it became one. The book is built around three sites — the Nexus Exchange, the Ordinance Office, and the Quota Station — and around MERIDIAN PASSAGE, the interstellar expansion program the company is now selling to a planet it has already finished sorting. The system runs flawlessly; only nobody is asked what they want anymore. A machine grades your aptitude, and you are entered into the register as an asset. And behind that perfect order, something that does not belong to this world is watching.",
    projectType: "Graduation Project",
    stage: "Concept Design",
    tools: ["Photoshop"],
    date: "2026",
    coverImage: "/works/project3/cover.jpg",
    sections: [
      {
        // 书籍设计 —— 封面平面稿 + 实物精装展示
        label: "Book Design",
        images: [
          {
            // 01 —— 封面设计(平面稿)
            src: "/works/project3/cover.jpg",
            title: "Art Book Cover",
            description:
              "The cover of the CULMINATION art book, designed from scratch in a 1970s idiom. I drew the wordmark in two custom variants — one solid, one striped — and set it against halftone gradients, topographic linework, and warm orange banding: the print language of MERIDIAN CONSOLIDATED.",
            stage: "Cover Design / Typography",
            tools: ["Photoshop"],
          },
          {
            // 02 —— 实物精装书展示(两角度)
            src: "/works/project3/mockup.jpg",
            title: "Print Mockup",
            description:
              "A print mockup of the finished book — a landscape hardcover shown from two angles, so the cover, spine, and color banding can be judged as one object rather than a flat layout.",
            stage: "Print Mockup",
            tools: ["Photoshop"],
          },
        ],
      },
      {
        label: "Key Environment",
        images: [
          {
            // 03 —— 秩序办事处大场景
            src: "/works/project3/01.jpg",
            title: "The Ordinance Office",
            description:
              "Staffed by clerks from MERIDIAN CONSOLIDATED's administration division, the Ordinance Office handles personnel reassignment and the civil registry — every posting, every relocation, every file on every citizen begins at one of these desks. The architecture is built on the rounded forms of the 1970s: flared columns, chamfered casework, a continuous arcade. Palette and lighting are held in a warm register and the skylight floods the hall, so the room reads as a reception lounge rather than the place where lives are reassigned.",
            stage: "Key Environment",
            tools: ["3DCoat", "Blender", "Photoshop"],
          },
        ],
      },
      {
        label: "Character Design",
        images: [
          {
            // 04 —— 公司吉祥物 Tally:三视图 + 表情表
            src: "/works/project3/04.png",
            title: "Tally — Corporate IP Character",
            description:
              "Tally is MERIDIAN CONSOLIDATED's official IP character, the company's public face on posters, packaging, and broadcast. He is drawn in classic American cartoon style — rubber-hose limbs, an exaggerated head-to-body ratio, a mouth line that never quite comes down — and dressed in the company's cream jacket and orange roundel. The sheet carries a full turnaround plus an expression range, because what a mascot is allowed to feel is itself a corporate decision.",
            stage: "Character Concept",
            tools: ["Photoshop"],
          },
        ],
      },
      {
        label: "Demo Video",
        images: [
          {
            // 05 —— 视频条目(参与画廊编号,viewer 内播放)
            src: "/works/project3/demo.mp4",
            title: "Corporate Promotional Film (1965)",
            description:
              "An early promotional film released by MERIDIAN CONSOLIDATED in 1965 to sell the public on the company itself. It imitates 1960s American cartoon advertising — limited animation, coarse print texture, and a narrator far too pleased about the future being handled for you. I designed the storyboard and every character in it; the animation was produced with Seedance 2.0 as an assist, and the final edit and grade were done in Premiere Pro.",
            stage: "Storyboard / Animation / Edit",
            tools: ["Photoshop", "Seedance 2.0", "Premiere Pro"],
            isVideo: true,
          },
        ],
      },
      {
        // 星际拓展计划宣传海报(两张拼合)
        label: "Program Posters",
        images: [
          {
            src: "/works/project3/posters.jpg",
            title: "CULMINATION: MERIDIAN PASSAGE",
            description:
              "Two key art posters for MERIDIAN PASSAGE — the company's interstellar expansion program, and the campaign the whole book is named after. Everything is presented in the corporate print language: halftone skies, orbital route diagrams, a single figure at the edge of somewhere newly assigned. A program that moves people off-world is sold with exactly the same warmth as a staff benefit.",
            stage: "Key Art / Poster Design",
            tools: ["Photoshop"],
            orientation: "portrait",
          },
        ],
      },
      {
        label: "Old Mercy Monastery",
        images: [
          {
            // 06 —— 旧慈悲修道院:静止期(暖)
            src: "/works/project3/02.png",
            title: "Dormant",
            description:
              "Deep in a mine shaft in former Russian territory — now zoned for gas extraction — MERIDIAN CONSOLIDATED keeps a facility. At the end of the shaft stands the sealed Old Mercy Monastery, a place name that appears in no registry. Dormant, the chamber is warm: candle flame, gilded stone, the winged form beneath the vault lit like an altarpiece. It still looks like a church.",
            stage: "Lighting Study",
            tools: ["Photoshop"],
          },
          {
            // 07 —— 旧慈悲修道院:汲取期(冷)
            src: "/works/project3/03.jpg",
            title: "Extraction",
            description:
              "The moment extraction begins, the whole monastery turns blue at once and the wailing starts — no record states where the sound comes from. The geometry does not change; its nature does. Chromatic fringing tears at the edges, blue-white glare presses down from the vault, and the winged form stops reading as an icon and starts reading as something developing into view. The company files this under routine operations.",
            stage: "Lighting Study",
            tools: ["Blender", "Photoshop"],
          },
        ],
      },
      {
        // 未完成插图 —— 排在最后
        label: "Unassigned",
        images: [
          {
            src: "/works/project3/illustration.jpg",
            title: "Unfinished Illustration",
            description:
              "An illustration still in progress — flats down, rendering not started. In a book about a company that assigns everyone a purpose, this one has not been given a place yet. It may end up inside; it may not.",
            stage: "Work in Progress",
            tools: ["Photoshop"],
            orientation: "portrait",
          },
        ],
      },
    ],
  },
];

export function getWorkBySlug(slug: string): WorkDetail | undefined {
  return workDetails.find((w) => w.slug === slug);
}
