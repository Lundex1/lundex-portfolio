import Link from "next/link";
import type { Project } from "@/data/projects";

export default function WorkCard({ project }: { project: Project }) {
  return (
    <Link
      href={`/works/${project.id}`}
      className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      <article className="group">
        {/* 封面图(无图时显示半透明大序号占位) */}
        <div className="relative mb-3 aspect-video overflow-hidden bg-white/[0.04]">
          {project.image ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={project.image}
              alt={project.title}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-7xl font-black text-white/10">
                {project.number}
              </span>
            </div>
          )}
        </div>

        {/* 序号 + 红短线 + 标题/分类 */}
        <div className="flex gap-4">
          <div className="shrink-0">
            <div className="text-2xl font-bold leading-none">
              {project.number}
            </div>
            <div className="mt-2 h-0.5 w-6 bg-brand" />
          </div>
          <div>
            <h3 className="text-base font-bold">{project.title}</h3>
            <p className="mt-1 text-xs text-white/50">{project.category}</p>
          </div>
        </div>
      </article>
    </Link>
  );
}
