import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * 老作品 URL 永久重定向到整合后的新项目。
   * 之前外部链接/书签访问以下 4 个旧 slug 都会被 301 跳到对应的新项目页:
   *   /works/warehouse-church       → /works/nio
   *   /works/lighting-concept-sketch → /works/nio
   *   /works/sci-fi-device-design   → /works/variant
   *   /works/wall-design            → /works/variant
   */
  async redirects() {
    return [
      {
        source: "/works/warehouse-church",
        destination: "/works/nio",
        permanent: true,
      },
      {
        source: "/works/lighting-concept-sketch",
        destination: "/works/nio",
        permanent: true,
      },
      {
        source: "/works/sci-fi-device-design",
        destination: "/works/variant",
        permanent: true,
      },
      {
        source: "/works/wall-design",
        destination: "/works/variant",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
