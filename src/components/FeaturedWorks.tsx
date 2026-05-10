import { projects } from "@/data/projects";
import WorkCard from "./WorkCard";

export default function FeaturedWorks() {
  return (
    <section
      id="works"
      className="bg-ink px-6 py-14 text-white lg:px-12 lg:py-20"
    >
      <div className="mx-auto max-w-[1360px]">
        <p className="mb-8 text-[11px] font-semibold uppercase tracking-[0.3em]">
          <span
            className="mr-3 inline-block h-px w-8 bg-brand align-middle"
            aria-hidden
          />
          Featured Works
        </p>

        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {projects.map((p) => (
            <WorkCard key={p.id} project={p} />
          ))}
        </div>
      </div>
    </section>
  );
}
