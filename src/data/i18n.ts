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

export type Lang = "en" | "jp";
export const LANG_STORAGE_KEY = "lundex.lang";

export type UI = {
  nav: { works: string; about: string; contact: string };
  langToggle: { en: string; jp: string };
  hero: {
    eyebrow: string;
    title: [string, string, string];
    desc: [string, string];
    cta: string;
    basedIn: string;
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
  designFocus: { title: string; items: string[] };
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
    langToggle: { en: "EN", jp: "JP" },
    hero: {
      eyebrow: "CONCEPT DESIGNER",
      title: ["LUNDEX", "Environment Art", "Portfolio"],
      desc: [
        "Environment art for narrative game worlds.",
        "I build atmospheric spaces through sketching, 3D blockouts, lighting, and visual storytelling.",
      ],
      cta: "View Works",
      basedIn: "Based in Earth",
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
      focusTitle: "Focus",
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
        "Narrative Space",
        "Lighting & Mood",
        "Player Flow",
        "3D Blockout",
        "Asset Language",
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
    langToggle: { en: "EN", jp: "JP" },
    hero: {
      eyebrow: "コンセプトデザイナー",
      title: ["LUNDEX", "環境アート", "ポートフォリオ"],
      desc: [
        "物語性のあるゲーム空間を対象に、環境アートを制作しています。",
        "スケッチ、3Dブロックアウト、ライティングを通して、雰囲気とストーリー性のある空間を設計します。",
      ],
      cta: "作品を見る",
      basedIn: "Based in Earth",
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
      focusTitle: "重点分野",
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
      // 短版本,保证排版稳定
      items: [
        "物語空間",
        "光と雰囲気",
        "プレイヤー動線",
        "3D検証",
        "アセット設計",
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
};
