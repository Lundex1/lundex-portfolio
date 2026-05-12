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

