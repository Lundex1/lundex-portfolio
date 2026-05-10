/**
 * Bauhaus 风格几何构图 —— 纯 CSS / div,无图片。
 * 所有定位用百分比,容器自带宽高比,可随响应式缩放。
 */
export default function GeometricArt() {
  return (
    <div
      className="relative mx-auto aspect-[5/6] w-full max-w-[480px]"
      aria-hidden
    >
      {/* 顶部水平条纹 */}
      <div
        className="absolute left-[20%] top-[12%] h-[4%] w-[34%]"
        style={{
          backgroundImage:
            "repeating-linear-gradient(to bottom, var(--color-ink) 0 2px, transparent 2px 6px)",
        }}
      />

      {/* 红色竖向矩形(主体) */}
      <div className="absolute left-[20%] top-[18%] h-[55%] w-[34%] bg-brand" />

      {/* 矩形左下角的小黑方块 */}
      <div className="absolute left-[20%] top-[68%] h-[8%] w-[8%] bg-ink" />

      {/* 大黑环 */}
      <div className="absolute right-[6%] top-[26%] aspect-square w-[58%] rounded-full border-[28px] border-ink" />

      {/* 环内半调点阵纹理(暗示纸张质感) */}
      <div
        className="absolute right-[14%] top-[40%] aspect-square w-[24%] rounded-full"
        style={{
          backgroundImage:
            "radial-gradient(var(--color-ink) 1.1px, transparent 1.4px)",
          backgroundSize: "5px 5px",
        }}
      />

      {/* 右上角红色实心小圆 */}
      <div className="absolute right-[12%] top-[8%] aspect-square w-[10%] rounded-full bg-brand" />

      {/* 底部水平基线 */}
      <div className="absolute inset-x-0 bottom-[12%] h-px bg-ink" />

      {/* 右侧细竖线 */}
      <div className="absolute bottom-[4%] right-[24%] top-[4%] w-px bg-ink" />
    </div>
  );
}
