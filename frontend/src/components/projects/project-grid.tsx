import Link from "next/link";
import type { Project } from "@/types";
import { ProjectCard } from "./project-card";

interface ProjectGridProps {
  projects: Project[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  return (
    <div>
      {/* Section label + hairline */}
      <div className="flex items-center" style={{ gap: "16px", marginBottom: "clamp(24px, 3vw, 40px)" }}>
        <p className="swiss-label text-gray-200 flex-shrink-0">
          Recent Projects
        </p>
        <div className="flex-1 border-t hairline" />
      </div>

      {/* Grid */}
      <div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
        style={{ gap: "clamp(20px, 2.5vw, 36px)" }}
      >
        {/* New Pitch card */}
        <Link
          href="/dashboard"
          className="group flex flex-col items-center justify-center aspect-[4/3] border border-dashed border-gray-100 hover:border-black transition-colors bg-[#fafafa] hover:bg-[#f5f5f5]"
        >
          <span className="text-[40px] font-extralight text-gray-100 group-hover:text-black transition-colors leading-none">
            +
          </span>
          <span className="swiss-label text-gray-200 group-hover:text-black transition-colors" style={{ marginTop: "16px" }}>
            New Pitch
          </span>
        </Link>

        {/* Project cards */}
        {projects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>

      {/* Empty state */}
      {projects.length === 0 && (
        <div className="text-center" style={{ padding: "80px 0" }}>
          <p className="text-heading-sm font-bold uppercase">No projects yet</p>
          <p className="text-body text-gray-300" style={{ marginTop: "12px" }}>
            Use the prompt above to create your first pitch deck.
          </p>
        </div>
      )}
    </div>
  );
}
