import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { formatDate, truncate } from "@/lib/utils";
import type { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link
      href={`/projects/${project.id}`}
      className="group block border border-gray-100 hover:border-black transition-colors"
    >
      {/* Thumbnail */}
      <div className="aspect-[4/3] bg-[#f5f5f5] flex items-center justify-center border-b border-gray-100 group-hover:border-black transition-colors">
        <div className="flex flex-col items-center">
          <span className="text-[28px] font-black text-gray-100 group-hover:text-black transition-colors leading-none">
            {project.slidesHtml.length}
          </span>
          <span className="text-[10px] font-mono text-gray-200 uppercase tracking-widest" style={{ marginTop: "6px" }}>
            slides
          </span>
        </div>
      </div>

      {/* Meta */}
      <div style={{ padding: "clamp(16px, 2vw, 24px)" }}>
        <h3 className="text-[16px] font-bold truncate">{project.name}</h3>
        <p className="text-[13px] text-gray-300 truncate leading-relaxed" style={{ marginTop: "8px" }}>
          {truncate(project.prompt, 55)}
        </p>
        <div className="flex items-center justify-between border-t hairline" style={{ marginTop: "16px", paddingTop: "16px" }}>
          <Badge variant={project.status}>{project.status}</Badge>
          <span className="text-[11px] text-gray-200 font-mono">
            {formatDate(project.updatedAt)}
          </span>
        </div>
      </div>
    </Link>
  );
}
