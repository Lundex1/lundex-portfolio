/**
 * 轻量本地 i18n —— 不引依赖,只用 React Context + localStorage。
 *
 * 数据结构:
 *   ui[lang] = { 各组件用到的所有文案 }
 *
 * 新增语言:在 Lang 联合类型里加键 → 在 ui 里加一份完整内容。
 * 新增文案:同时在 en / jp 里加同名字段。
 *
 * 项目数据(NIO / VARIANT 标题、说明、图片描述)单独放在
 * workDetails.ts(en) 和 workDetailsJp.ts(jp),通过 slug 配对。
 */

export type Lang = "en" | "jp" | "zh";
export const LANG_STORAGE_KEY = "lundex.lang";

export type UI = {
  nav: { works: string; about: string; contact: string };
  langToggle: { en: string; jp: string; zh: string };
  hero: {
    eyebrow: string;
    title: [string, string, string];
    desc: [string, string];
    cta: string;
    basedIn: string;
    /** 底部信息条 —— 三段:Selected 标签 / 项目名 / 设计方向 */
    selectedLabel: string;
    selectedProjects: string;
    selectedFocus: string;
  };
  featured: { eyebrow: string };
  about: {
    eyebrow: string;
    title: string;
    bio: string;
    experienceTitle: string;
    experience: string[];
    focusTitle: string;
    focus: string[];
    goal: string;
  };
  skills: { eyebrow: string };
  /** Design Focus —— 编号方法论:每项包含序号、短标题、说明 */
  designFocus: {
    title: string;
    items: { id: string; title: string; desc: string }[];
  };
  workDetail: {
    back: string;
    projectType: string;
    stage: string;
    tools: string;
    date: string;
    description: string;
    nextProject: string;
    previousProject: string;
  };
  footer: {
    slogan: [string, string];
    rights: [string, string];
  };
};

export const ui: Record<Lang, UI> = {
  en: {
    nav: { works: "Works", about: "About", contact: "Contact" },
    langToggle: { en: "EN", jp: "JP", zh: "ZH" },
    hero: {
      eyebrow: "CONCEPT DESIGNER",
      title: ["LUNDEX", "Environment Art", "Portfolio"],
      desc: [
        "Environment art for narrative game worlds.",
        "I build atmospheric spaces through sketching, 3D blockouts, lighting, and visual storytelling.",
      ],
      cta: "View Works",
      basedIn: "Based in Earth",
      selectedLabel: "Selected Works 2025 – 2026",
      selectedProjects: "NIO / VARIANT",
      selectedFocus:
        "Environment Concept · 3D Assisted Workflow · Lighting Study",
    },
    featured: { eyebrow: "Featured Works" },
    about: {
      eyebrow: "About",
      title: "Personal Introduction",
      bio: "Environment concept design student focused on game spaces, atmosphere, and 3D-assisted visual development.",
      experienceTitle: "Experience",
      experience: [
        "Selected Participant · Capcom Portfolio Review Program",
        "Outsourced Project Contribution · ByteDance",
      ],
      // 左侧 About 的"Core Skills"—— 改名以与右侧"Design Focus"区分,
      // 避免两个标题都叫 Focus,概念重复
      focusTitle: "Core Skills",
      focus: [
        "Environment Concept Design",
        "Lighting",
        "3D Blockout",
        "Asset Design",
      ],
      goal: "My goal is to become an environment concept designer in the game industry, creating spaces that support gameplay, mood, and storytelling.",
    },
    skills: { eyebrow: "Skills" },
    designFocus: {
      title: "Design Focus",
      items: [
        {
          id: "01",
          title: "Narrative Space",
          desc: "Build spaces around story beats.",
        },
        {
          id: "02",
          title: "Lighting & Mood",
          desc: "Use light to guide focus and emotion.",
        },
        {
          id: "03",
          title: "Player Flow",
          desc: "Design paths that support gameplay reading.",
        },
        {
          id: "04",
          title: "3D Blockout",
          desc: "Test scale, structure, and spatial intent.",
        },
        {
          id: "05",
          title: "Asset Language",
          desc: "Create forms and details that support the world.",
        },
      ],
    },
    workDetail: {
      back: "Back to Works",
      projectType: "Project Type",
      stage: "Stage",
      tools: "Tools",
      date: "Date",
      description: "Description",
      nextProject: "Next Project",
      previousProject: "Previous Project",
    },
    footer: {
      slogan: ["Worlds are Built.", "Meaning is Designed."],
      rights: ["© 2026 LUNDEX", "All Rights Reserved."],
    },
  },

  jp: {
    nav: { works: "作品", about: "自己紹介", contact: "連絡先" },
    langToggle: { en: "EN", jp: "JP", zh: "ZH" },
    hero: {
      eyebrow: "コンセプトデザイナー",
      title: ["LUNDEX", "環境アート", "ポートフォリオ"],
      desc: [
        "物語性のあるゲーム空間を対象に、環境アートを制作しています。",
        "スケッチ、3Dブロックアウト、ライティングを通して、雰囲気とストーリー性のある空間を設計します。",
      ],
      cta: "作品を見る",
      basedIn: "Based in Earth",
      selectedLabel: "選抜作品 2025 – 2026",
      selectedProjects: "NIO / VARIANT",
      selectedFocus: "環境コンセプト · 3D制作支援 · ライティング検証",
    },
    featured: { eyebrow: "作品" },
    about: {
      eyebrow: "自己紹介",
      title: "自己紹介",
      bio: "ゲーム空間、雰囲気づくり、3Dを活用したビジュアル開発を中心に学んでいます。",
      experienceTitle: "経験",
      experience: [
        "CAPCOM ポートフォリオレビュー 選抜参加",
        "ByteDance 外部委託案件 参加",
      ],
      // 与 EN 的 "Core Skills" 对应 —— 左侧"主要スキル",
      // 与右侧"制作の重点"区分
      focusTitle: "主要スキル",
      focus: [
        "環境コンセプト",
        "ライティング",
        "3Dブロックアウト",
        "アセット設計",
      ],
      goal: "将来はゲーム業界で、プレイ体験・雰囲気・物語性を支える環境コンセプトデザイナーを目指しています。",
    },
    skills: { eyebrow: "使用ソフト" },
    designFocus: {
      title: "制作の重点",
      // 标题尽量短,说明 14–18 字以内 → 不撑坏布局
      items: [
        {
          id: "01",
          title: "物語空間",
          desc: "ストーリーに沿って空間を組み立てる。",
        },
        {
          id: "02",
          title: "光と雰囲気",
          desc: "光で視線と感情を導く。",
        },
        {
          id: "03",
          title: "プレイヤー動線",
          desc: "読み取りやすい経路を設計する。",
        },
        {
          id: "04",
          title: "3D検証",
          desc: "スケールと構造を検証する。",
        },
        {
          id: "05",
          title: "アセット設計",
          desc: "世界観を支える造形を作る。",
        },
      ],
    },
    workDetail: {
      back: "作品一覧へ戻る",
      projectType: "種別",
      stage: "段階",
      tools: "使用ツール",
      date: "制作年",
      description: "説明",
      nextProject: "次のプロジェクト",
      previousProject: "前のプロジェクト",
    },
    footer: {
      slogan: ["世界は構築される。", "意味は設計される。"],
      rights: ["© 2026 LUNDEX", "All Rights Reserved."],
    },
  },

  zh: {
    nav: { works: "作品", about: "关于", contact: "联系" },
    langToggle: { en: "EN", jp: "JP", zh: "ZH" },
    hero: {
      eyebrow: "概念设计师",
      title: ["LUNDEX", "环境艺术", "作品集"],
      desc: [
        "面向叙事型游戏空间的环境艺术设计。",
        "通过草图、3D Blockout、灯光和视觉叙事,构建具有氛围和空间逻辑的游戏场景。",
      ],
      cta: "查看作品",
      basedIn: "Based in Earth",
      selectedLabel: "精选作品 2025 – 2026",
      selectedProjects: "NIO / VARIANT",
      selectedFocus: "环境概念 · 3D 辅助流程 · 灯光研究",
    },
    featured: { eyebrow: "精选作品" },
    about: {
      eyebrow: "关于我",
      title: "个人介绍",
      bio: "专注于游戏空间、氛围塑造和 3D 辅助视觉开发的环境概念设计学习者。",
      experienceTitle: "经历",
      experience: [
        "CAPCOM 作品集评审项目 入选参加",
        "字节跳动外包项目 参与",
      ],
      // 与 EN "Core Skills" / JP "主要スキル"对应
      focusTitle: "核心能力",
      focus: [
        "环境概念设计",
        "灯光设计",
        "3D Blockout",
        "资产设计",
      ],
      goal: "目标是在游戏行业成为环境概念设计师,设计能够支撑玩法、氛围和叙事的游戏空间。",
    },
    skills: { eyebrow: "使用软件" },
    designFocus: {
      title: "设计关注点",
      items: [
        {
          id: "01",
          title: "叙事空间",
          desc: "围绕故事节点构建空间。",
        },
        {
          id: "02",
          title: "灯光与氛围",
          desc: "用光引导视线与情绪。",
        },
        {
          id: "03",
          title: "玩家动线",
          desc: "设计可读、清晰的游玩路径。",
        },
        {
          id: "04",
          title: "3D Blockout",
          desc: "验证尺度、结构与空间意图。",
        },
        {
          id: "05",
          title: "资产语言",
          desc: "用形态与细节支撑世界观。",
        },
      ],
    },
    workDetail: {
      back: "返回作品",
      projectType: "类型",
      stage: "阶段",
      tools: "工具",
      date: "年份",
      description: "说明",
      nextProject: "下一项目",
      previousProject: "上一项目",
    },
    footer: {
      slogan: ["世界被构建。", "意义被设计。"],
      rights: ["© 2026 LUNDEX", "All Rights Reserved."],
    },
  },
};
