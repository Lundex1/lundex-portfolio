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
          { src: "/works/2233.png", title: "设备方案 07", ...VARIANT_DEVICE_TPL_ZH },
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
      {
        // 视频展示分类 —— 基于 UE5 GASP 系统的玩法与角色系统测试
        label: "GAMEPLAY SYSTEM DEMO",
        images: [],
        video: {
          embedUrl: "https://www.youtube.com/embed/qxc540hAxA4",
          title: "开发测试展示",
          description:
            "基于 UE5 GASP 系统进行角色控制、武器交互与白盒关卡测试的开发验证。",
          stage: "系统测试 / 玩法原型 / 白盒验证",
          tools: ["Unreal Engine 5", "GASP", "Blueprint"],
          content: [
            "未装备武器移动测试",
            "飞行系统测试",
            "武器动作与开枪系统",
            "潜行模式",
            "白盒关卡测试",
          ],
        },
      },
    ],
  },

  // ═══════════════════════════════════════════════════════
  //  03 — PROJECT 03(占位 —— 正式文案确定后替换)
  // ═══════════════════════════════════════════════════════
  {
    slug: "culmination",
    number: "03",
    title: "白昼流星",
    category: "游戏概念设定集",
    description:
      "《白昼流星》(CULMINATION) 是我的毕业设计——一部游戏概念设定集。1976 年的另一条时间线:冷战没有停止,资源枯竭、失业蔓延,国家先在人心里垮掉,然后才轮到版图。MERIDIAN CONSOLIDATED 公司以“万物皆有归处,每人皆有使命”填补了这片空白。它比政府更高效,于是取代了政府。设定集以三处场所为轴——枢点交易中心、秩序办事处、定额分配所——以及「白昼流星子午线」:公司正在向这颗已经被它分拣完毕的星球推销的星际拓展计划。秩序运转良好,只是再没人问过谁想做什么;适配等级由机器裁定,人被登记为资产。而在这套完美调度的背后,似乎有某种不属于这套秩序的东西,正注视着这一切。",
    projectType: "毕业设计",
    stage: "概念设计",
    tools: ["Photoshop"],
    date: "2026",
    coverImage: "/works/project3/cover.jpg",
    sections: [
      {
        // 书籍设计 —— 封面平面稿 + 实物精装展示
        label: "书籍设计",
        images: [
          {
            // 01 —— 封面设计(平面稿)
            src: "/works/project3/cover.jpg",
            title: "作品集封面设计",
            description:
              "《白昼流星》设定集封面,整体按 70 年代复古风格从零设计。CULMINATION 标题字形自制了实心与条纹两套版本,配合半调网点、等高线底纹与暖橙色带,构成 MERIDIAN CONSOLIDATED 的企业印刷识别。",
            stage: "封面设计 / 字体设计",
            tools: ["Photoshop"],
          },
          {
            // 02 —— 实物精装书展示(两角度)
            src: "/works/project3/mockup.jpg",
            title: "装帧样书",
            description:
              "成书的装帧模拟——横开本精装,双角度呈现,用于检验封面、书脊与色带作为一个实体的整体观感,而不只是一张平面稿。",
            stage: "装帧模拟",
            tools: ["Photoshop"],
          },
        ],
      },
      {
        label: "关键场景",
        images: [
          {
            // 03 —— 秩序办事处大场景
            src: "/works/project3/01.jpg",
            title: "秩序办事处",
            description:
              "由公司管理处驻员运作的机构,负责人员调动与户籍档案管理——每一次任命、每一次迁徙、每一个人的档案,都从这排办公桌开始。空间语言建立在 70 年代的圆弧造型上:喇叭形立柱、倒角家具、连续拱廊;配色与打光统一控制在暖色区间,天窗把整座大厅照满,让它读起来像一间接待厅,而不是决定人往哪去的地方。",
            stage: "关键场景",
            tools: ["3DCoat", "Blender", "Photoshop"],
          },
        ],
      },
      {
        label: "角色设计",
        images: [
          {
            // 04 —— 公司吉祥物 Tally:三视图 + 表情表
            src: "/works/project3/04.png",
            title: "塔利 —— 公司 IP 形象",
            description:
              "「塔利」(Tally) 是 MERIDIAN CONSOLIDATED 的官方 IP 形象,出现在海报、包装与广播里,是公司对外的那张脸。造型采用美式卡通风格:橡皮管四肢、夸张的头身比、一条几乎落不下来的嘴角线,配上公司制式的米色外套与橙色圆形徽标。设定含完整三视图与一组表情表——一个吉祥物被允许流露哪些情绪,本身就是公司的决定。",
            stage: "角色概念",
            tools: ["Photoshop"],
          },
        ],
      },
      {
        label: "演示视频",
        images: [
          {
            // 05 —— 视频条目(参与画廊编号,查看器内播放)
            src: "/works/project3/demo.mp4",
            title: "公司宣传影片(1965)",
            description:
              "MERIDIAN CONSOLIDATED 于 1965 年发布的早期企业宣传片,用于向公众推销公司自身。影片整体模仿 60 年代美国老式卡通广告的质感——有限动画、粗糙的印刷颗粒,以及一个对「未来已被安排妥当」过分满意的解说腔。分镜与全部角色均由本人设计,动画环节使用 Seedance 2.0 辅助生成,最终剪辑与调色在 Premiere Pro 完成。",
            stage: "分镜 / 动画 / 剪辑",
            tools: ["Photoshop", "Seedance 2.0", "Premiere Pro"],
            isVideo: true,
          },
        ],
      },
      {
        // 星际拓展计划宣传海报(两张拼合)
        label: "计划宣传海报",
        images: [
          {
            src: "/works/project3/posters.jpg",
            title: "白昼流星子午线",
            description:
              "为「白昼流星子午线」制作的两张主视觉海报——这是公司的星际拓展计划,也是整本设定集名字的由来。画面沿用公司统一的印刷语言:半调网点的天空、轨道路线图、一个站在新指派之地边缘的身影。一项把人送离地球的计划,被用与员工福利完全相同的暖度推销出去。",
            stage: "主视觉 / 海报设计",
            tools: ["Photoshop"],
            orientation: "portrait",
          },
        ],
      },
      {
        label: "旧慈悲修道院",
        images: [
          {
            // 06 —— 旧慈悲修道院:静止期(暖)
            src: "/works/project3/02.png",
            title: "静止期",
            description:
              "在原俄罗斯境内、现划为燃气采集区的地下矿井深处,公司保有一处设施。矿井的尽头是被封存的旧慈悲修道院——档案里查不到这个地名。静止期的内部是暖的:烛火、镀金石面,拱顶下那具带翼形体被照得像一幅祭坛画。它看上去仍然是一座教堂。",
            stage: "光色研究",
            tools: ["Photoshop"],
          },
          {
            // 07 —— 旧慈悲修道院:汲取期(冷)
            src: "/works/project3/03.jpg",
            title: "汲取期",
            description:
              "每一次汲取开始的瞬间,整座修道院会同时转为蓝色,接着是长时间的哀嚎——没有任何记录写明那声音来自哪里。结构没有改变,性质改变了:色散撕开轮廓,蓝白强光从拱顶压下,带翼形体不再是圣像,而是某种正在显影出来的东西。公司把这道工序归档为「常规作业」。",
            stage: "光色研究",
            tools: ["Blender", "Photoshop"],
          },
        ],
      },
      {
        // 未完成插图 —— 排在最后
        label: "未分配",
        images: [
          {
            src: "/works/project3/illustration.jpg",
            title: "未完成插图",
            description:
              "一张仍在进行中的插图——平涂已铺,细化尚未开始。在一本讲述「每人皆有使命」的册子里,这一张还没有被分配到位置:它可能会收进设定集,也可能不会。其实是用来凑数的。我就是最近玩《遗忘之海》玩多了。",
            stage: "进行中",
            tools: ["Photoshop"],
            orientation: "portrait",
          },
        ],
      },
    ],
  },
];

export function getWorkBySlugZh(slug: string): WorkDetail | undefined {
  return workDetailsZh.find((w) => w.slug === slug);
}
