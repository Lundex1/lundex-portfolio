/**
 * NIO / VARIANT 项目数据的日文版本。
 *
 * 结构与 workDetails.ts 完全对齐 —— 同 slug、同 number、同 coverImage、同
 * section 数量、同图片顺序、同 src,只把所有"可翻译的字符串字段"换成日文。
 *
 * 这样消费组件可以根据 useLang() 在两套数据之间切换,无需重写渲染逻辑。
 */

import type { WorkDetail } from "./workDetails";

// VARIANT 多张设备图共享的日文说明模板 —— 改一处影响该 section 全部图
const VARIANT_DEVICE_TPL_JP = {
  description:
    "SF環境アセットとしての形状、構造、ディテールを検討したデザイン案です。",
  stage: "デザイン検証",
  tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
};

export const workDetailsJp: WorkDetail[] = [
  // ═══════════════════════════════════════════════════════
  //  01 — NIO
  // ═══════════════════════════════════════════════════════
  {
    slug: "nio",
    number: "01",
    title: "NIO",
    category: "物語型ホラー環境",
    description:
      "NIOは、廃れた教会空間を中心に制作したホラー環境プロジェクトです。空間の流れ、儀式的なモチーフ、光の優先順位を通して、環境による物語表現を探っています。",
    projectType: "環境コンセプト",
    stage: "コンセプト設計",
    tools: ["Photoshop", "Blender"],
    date: "2025",
    coverImage: "/works/01.png",
    sections: [
      {
        label: "デザインプロセス",
        images: [
          {
            src: "/works/warehouse/001.png",
            title: "一階レイアウト検証",
            description:
              "一階の空間構成、動線、オブジェクト配置を確認するための初期レイアウトスケッチです。",
            stage: "コンセプトスケッチ",
            tools: ["Photoshop"],
          },
          {
            src: "/works/warehouse/01.png",
            title: "二階レイアウト検証",
            description:
              "二階の儀式空間、移動経路、主要オブジェクトの配置を検討した初期スケッチです。",
            stage: "コンセプトスケッチ",
            tools: ["Photoshop"],
          },
          {
            src: "/works/warehouse/03.png",
            title: "ストーリードア設計",
            description:
              "進行上の重要な地点となる扉のデザインです。カルト空間のビジュアル言語を強めるために制作しました。",
            stage: "キーアセット設計",
            tools: ["Photoshop"],
          },
          {
            src: "/works/warehouse/04.png",
            title: "吊り下げ信物デザイン",
            description:
              "一階に配置するカルトの信物デザインです。シルエット、象徴性、物語上の手がかりとしての役割を検討しています。",
            stage: "キーアセット設計",
            tools: ["Photoshop"],
          },
          {
            src: "/works/warehouse/05.png",
            title: "献祭された人物",
            description:
              "二階の儀式空間で視線を集める人物デザインです。ポーズ、シルエット、画面内での見え方を検討しました。",
            stage: "キーアセット設計",
            tools: ["Photoshop"],
          },
          {
            src: "/works/warehouse/06.png",
            title: "二階祭壇デザイン",
            description:
              "二階に配置するインタラクティブな祭壇デザインです。構造、装飾、操作対象としての読みやすさを意識しています。",
            stage: "インタラクティブプロップ設計",
            tools: ["Photoshop"],
          },
          {
            src: "/works/warehouse/07.jpg",
            title: "敵キャラクター案 01",
            description:
              "体型、衣装、カルト的な要素をもとに、敵キャラクターのシルエットを検討したデザインです。",
            stage: "キャラクターコンセプト",
            tools: ["Photoshop"],
            orientation: "portrait",
          },
          {
            src: "/works/warehouse/08.jpg",
            title: "敵キャラクター案 02",
            description:
              "衣装バランス、杖の形状、勢力としての特徴を検討した敵キャラクターのバリエーションです。",
            stage: "キャラクターコンセプト",
            tools: ["Photoshop"],
            orientation: "portrait",
          },
        ],
      },
      {
        label: "ライティング検証",
        images: [
          {
            src: "/works/lighting/01.jpg",
            title: "一階コンセプトイメージ",
            description:
              "一階の雰囲気、構図、光の方向性を確認するための初期コンセプトイメージです。",
            stage: "環境コンセプト",
            tools: ["Photoshop"],
          },
          {
            src: "/works/lighting/02.png",
            title: "ストーリードア コンセプト",
            description:
              "一階の重要な扉を中心に、光、周辺の空気感、物語上の印象を検討したイメージです。",
            stage: "環境コンセプト",
            tools: ["Photoshop"],
            orientation: "portrait",
          },
          {
            src: "/works/lighting/03.png",
            title: "二階ライティング検証 01",
            description:
              "二階の儀式空間における視線誘導、明暗差、主役の見せ方を検討したライティング案です。",
            stage: "ライティング検証",
            tools: ["Photoshop"],
          },
          {
            src: "/works/lighting/04.png",
            title: "二階ライティング検証 02",
            description:
              "広めの構図で、影の分布やプレイヤー視点での読みやすさを確認したライティング案です。",
            stage: "ライティング検証",
            tools: ["Photoshop"],
          },
          {
            src: "/works/lighting/05.png",
            title: "二階ライティング検証 03",
            description:
              "二階の最終的な雰囲気に近い方向性を探るため、暗さ、逆光、儀式的な空気感を調整した検証です。",
            stage: "ライティング検証",
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
    category: "SF施設デザイン",
    description:
      "VARIANTは、モジュール式の壁面システムと環境アセットを中心にしたSF施設デザインのプロジェクトです。完成シーンに進む前段階として、工業的な形状、素材の分け方、機能的なデザイン言語を検証しています。",
    projectType: "SF環境開発",
    stage: "アセット設計検証",
    tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
    date: "2026",
    coverImage: "/works/03.jpg",
    sections: [
      {
        label: "デバイスデザイン",
        images: [
          { src: "/works/device/01.jpg", title: "デバイス案 01", ...VARIANT_DEVICE_TPL_JP },
          { src: "/works/device/02.jpg", title: "デバイス案 02", ...VARIANT_DEVICE_TPL_JP },
          { src: "/works/device/03.jpg", title: "デバイス案 03", ...VARIANT_DEVICE_TPL_JP },
          { src: "/works/device/04.jpg", title: "デバイス案 04", ...VARIANT_DEVICE_TPL_JP },
          { src: "/works/device/05.jpg", title: "デバイス案 05", ...VARIANT_DEVICE_TPL_JP },
          { src: "/works/device/06.jpg", title: "デバイス案 06", ...VARIANT_DEVICE_TPL_JP },
          { src: "/works/2233.png", title: "デバイス案 07", ...VARIANT_DEVICE_TPL_JP },
        ],
      },
      {
        label: "壁面デザイン",
        images: [
          {
            src: "/works/wall/01.jpg",
            title: "壁面デザイン 01",
            description:
              "SF施設の壁面アセットとして、構造、素材分け、照明要素を検討したデザインです。",
            stage: "アセット設計",
            tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
          },
          {
            src: "/works/wall/02.jpg",
            title: "壁面デザイン 02",
            description:
              "施設内のバリエーション展開を想定し、異なる構成とディテールを検討した壁面デザインです。",
            stage: "アセット設計",
            tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
          },
          {
            src: "/works/wall/03.jpg",
            title: "壁面デザイン 03",
            description:
              "モジュール化を意識し、反復使用しやすい形状と機能的な見え方を検討した壁面案です。",
            stage: "アセット設計",
            tools: ["Photoshop", "Blender", "3DCoat", "Substance Painter"],
          },
        ],
      },
      {
        // 视频展示分类 —— UE5 GASP 系统的玩法与角色系统测试
        label: "GAMEPLAY SYSTEM DEMO",
        images: [],
        video: {
          embedUrl: "https://www.youtube.com/embed/qxc540hAxA4",
          title: "開発テストデモ",
          description:
            "UE5 GASPシステムをベースに、キャラクター操作、武器インタラクション、ホワイトボックスレベルテストを検証した開発デモ。",
          stage: "システムテスト / ゲームプレイプロトタイプ / ホワイトボックス検証",
          tools: ["Unreal Engine 5", "GASP", "Blueprint"],
          content: [
            "武器未装備時の移動テスト",
            "飛行システムテスト",
            "武器アクションと射撃システム",
            "ステルスモード",
            "ホワイトボックスレベルテスト",
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
    category: "ゲームコンセプトアートブック",
    description:
      "「白昼流星(はくちゅうりゅうせい/CULMINATION)」は、卒業制作として手がけたゲームコンセプトアートブックです。舞台は1976年、もう一つの時間軸。冷戦は終わらず、資源は枯渇し、失業が広がり、国境が崩れるより先に国家への信頼が失墜した。その空白を埋めたのが MERIDIAN CONSOLIDATED社——「万物には帰る場所を、すべての人に使命を」という約束を掲げ、どの政府より効率的であったがゆえに、やがて政府そのものに取って代わった。システムは完璧に回っている。ただ、誰も「何がしたいか」を問われない。適性は機械が判定し、人間は資産として登録される。そしてその完璧な統制の裏で、この世界のものではない何かが見つめている——本作は、ネクサス交易所・秩序局・定量配給所という三つの拠点と、すでに仕分けを終えたこの惑星に向けて同社がいま売り込む星間進出計画「白昼流星子午線(MERIDIAN PASSAGE)」を軸に構成しています。",
    projectType: "卒業制作",
    stage: "コンセプト設計",
    tools: ["Photoshop"],
    date: "2026",
    coverImage: "/works/project3/cover.jpg",
    sections: [
      {
        // 书籍设计 —— 封面平面稿 + 实物精装展示
        label: "ブックデザイン",
        images: [
          {
            // 01 —— 封面设计(平面稿)
            src: "/works/project3/cover.jpg",
            title: "アートブック表紙デザイン",
            description:
              "1970年代のレトロスタイルを基に、表紙をゼロから設計しました。ロゴタイプはソリッドとストライプの2種類を自作し、ハーフトーン、等高線、暖色オレンジの帯と組み合わせて、MERIDIAN CONSOLIDATEDの印刷物におけるビジュアルアイデンティティを構築しています。",
            stage: "表紙デザイン / タイポグラフィ",
            tools: ["Photoshop"],
          },
          {
            // 02 —— 实物精装书展示(两角度)
            src: "/works/project3/mockup.jpg",
            title: "装丁モックアップ",
            description:
              "完成イメージを想定した装丁モックアップ。横長判のハードカバーを2つのアングルで示し、表紙・背表紙・カラーバンドが平面の版面ではなく一つの立体として成立するかを検証しました。",
            stage: "装丁モックアップ",
            tools: ["Photoshop"],
          },
        ],
      },
      {
        label: "キー環境",
        images: [
          {
            // 03 —— 秩序办事处大场景
            src: "/works/project3/01.jpg",
            title: "秩序局",
            description:
              "MERIDIAN CONSOLIDATEDの管理部門の職員が運営する機関で、人員の配置転換と戸籍・記録の管理を担っています。すべての辞令、すべての移動、すべての個人記録が、このデスクの列から始まります。建築言語は1970年代の曲面フォルム——広がった柱、面取りされた什器、連続するアーケード。配色とライティングは暖色域にまとめ、トップライトがホール全体を満たすことで、人の行き先が決まる場所ではなく応接ラウンジのように読めるよう設計しました。",
            stage: "キー環境",
            tools: ["3DCoat", "Blender", "Photoshop"],
          },
        ],
      },
      {
        label: "キャラクターデザイン",
        images: [
          {
            // 04 —— 公司吉祥物 Tally:三视图 + 表情表
            src: "/works/project3/04.png",
            title: "タリー(Tally)—— 企業IPキャラクター",
            description:
              "「タリー」はMERIDIAN CONSOLIDATEDの公式IPキャラクターであり、ポスター・パッケージ・放送に登場する企業の対外的な顔です。アメリカン・カートゥーンの様式——ラバーホースの手足、誇張された頭身、決して下がりきらない口角——で描き、社の制式であるクリーム色のジャケットとオレンジのラウンデルをまとわせています。三面図に加えて表情表を用意しました。マスコットが何を感じてよいかという範囲そのものが、企業の決定事項だからです。",
            stage: "キャラクターコンセプト",
            tools: ["Photoshop"],
          },
        ],
      },
      {
        label: "デモ映像",
        images: [
          {
            // 05 —— 视频条目
            src: "/works/project3/demo.mp4",
            title: "企業プロモーション映像(1965年)",
            description:
              "MERIDIAN CONSOLIDATEDが1965年に公開した初期の企業宣伝映像で、会社そのものを大衆に売り込むためのものです。1960年代アメリカのカートゥーンCMの質感——リミテッドアニメーション、粗い印刷のテクスチャ、そして「未来はすでに手配済み」と語りすぎるナレーション——を模しました。絵コンテと登場キャラクターはすべて自作し、アニメーション工程はSeedance 2.0を補助的に使用、最終的な編集とカラーグレーディングはPremiere Proで行っています。",
            stage: "絵コンテ / アニメーション / 編集",
            tools: ["Photoshop", "Seedance 2.0", "Premiere Pro"],
            isVideo: true,
          },
        ],
      },
      {
        // 星际拓展计划宣传海报(两张拼合)
        label: "計画ポスター",
        images: [
          {
            src: "/works/project3/posters.jpg",
            title: "白昼流星子午線(MERIDIAN PASSAGE)",
            description:
              "「白昼流星子午線」のキービジュアルポスター2点。これは同社の星間進出計画であり、本書のタイトルの由来でもあります。企業統一の印刷言語をそのまま踏襲し、ハーフトーンの空、軌道図、新たに配属された地の縁に立つ一つの人影で構成しました。人を地球の外へ送り出す計画が、社員福利とまったく同じ温度で売り込まれています。",
            stage: "キービジュアル / ポスターデザイン",
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
              "旧ロシア領、現在はガス採取区に指定された地下坑道の奥深くに、MERIDIAN CONSOLIDATEDは一つの施設を保有しています。坑道の終点にあるのが、封鎖された「旧慈悲修道院」——どの台帳にも記載のない地名です。静止期の内部は暖色に満ちています。蝋燭の炎、金色の石材、ヴォールトの下で祭壇画のように照らされた有翼の存在。まだ教会に見えます。",
            stage: "ライティング検証",
            tools: ["Photoshop"],
          },
          {
            // 07 —— 旧慈悲修道院:汲取期(冷)
            src: "/works/project3/03.jpg",
            title: "汲上期",
            description:
              "汲み上げが始まる瞬間、修道院全体が一斉に青へ転じ、長い哀哭が続きます。その音がどこから来るのかは、記録に残されていません。構造は変わらず、性質だけが変わる。色収差が輪郭を裂き、青白いグレアがヴォールトから降り、有翼の存在は聖像であることをやめ、いま現像されつつある何かとして立ち上がります。社はこの工程を「通常作業」として記録しています。",
            stage: "ライティング検証",
            tools: ["Blender", "Photoshop"],
          },
        ],
      },
      {
        // 未完成插图 —— 排在最后
        label: "未分類",
        images: [
          {
            src: "/works/project3/illustration.jpg",
            title: "未完成イラスト",
            description:
              "制作途中のイラスト。フラットカラーまで置いた段階で、描き込みはこれからです。「すべての人に使命を」と説く本のなかで、この一枚だけはまだ配属先が決まっていません。収録されるかどうかも未定です。",
            stage: "制作途中",
            tools: ["Photoshop"],
            orientation: "portrait",
          },
        ],
      },
    ],
  },
];

export function getWorkBySlugJp(slug: string): WorkDetail | undefined {
  return workDetailsJp.find((w) => w.slug === slug);
}

// 兜底:返回某 slug 的三语数据组。给 server component 用,把三套数据一起
// 传给客户端组件,组件根据 useLang() 选用,无需在 server 端读 localStorage。
import { workDetails } from "./workDetails";
import { workDetailsZh } from "./workDetailsZh";
export function getLocalizedWorkPair(slug: string) {
  const en = workDetails.find((w) => w.slug === slug);
  const jp = workDetailsJp.find((w) => w.slug === slug);
  const zh = workDetailsZh.find((w) => w.slug === slug);
  if (!en || !jp || !zh) return null;
  return { en, jp, zh };
}

