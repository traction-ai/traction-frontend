import Link from "next/link";
import { projects } from "@/lib/mock-data";
import { formatDate } from "@/lib/utils";

export default function SharedPage() {
  const sharedProjects = projects.filter((p) => p.status === "shared");

  return (
    <div style={{ padding: "clamp(32px, 4vw, 64px) clamp(32px, 4vw, 64px)" }}>
      {/* Header */}
      <div className="animate-fade-up">
        <div className="flex items-start justify-between" style={{ gap: "clamp(24px, 3vw, 48px)" }}>
          <div>
            <p className="swiss-label text-gray-200" style={{ marginBottom: "12px" }}>
              Distribution
            </p>
            <h1 className="text-display font-black uppercase tracking-tight leading-none">
              Shared
            </h1>
          </div>

          <div className="hidden md:flex items-start pt-1">
            <div>
              <p className="text-[36px] font-black leading-none">{sharedProjects.length}</p>
              <p className="swiss-label text-gray-200" style={{ marginTop: "6px" }}>Live Links</p>
            </div>
          </div>
        </div>

        <p
          className="text-body-lg text-gray-300 max-w-[560px] leading-relaxed"
          style={{ marginTop: "16px" }}
        >
          Projects you&apos;ve shared with investors. Track engagement
          and manage access from here.
        </p>
      </div>

      {/* Hairline */}
      <div
        className="border-t hairline animate-fade-up delay-1"
        style={{ margin: "clamp(28px, 3vw, 48px) 0" }}
      />

      {/* Shared projects list */}
      {sharedProjects.length > 0 ? (
        <div className="flex flex-col" style={{ gap: "0" }}>
          {sharedProjects.map((project, i) => (
            <Link
              key={project.id}
              href={`/projects/${project.id}`}
              className="group grid grid-cols-1 md:grid-cols-12 border-b hairline transition-colors hover:bg-[#fafafa] animate-fade-up delay-2"
              style={{
                padding: "clamp(24px, 3vw, 40px) clamp(8px, 1vw, 16px)",
                gap: "clamp(12px, 2vw, 24px)",
                animationDelay: `${0.2 + i * 0.08}s`,
              }}
            >
              {/* Number */}
              <div className="md:col-span-1 flex items-start">
                <span className="text-[11px] font-mono text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>

              {/* Name + prompt */}
              <div className="md:col-span-5">
                <h3 className="text-[17px] font-bold leading-snug group-hover:text-accent transition-colors">
                  {project.name}
                </h3>
                <p className="text-[13px] text-gray-200 leading-relaxed" style={{ marginTop: "6px" }}>
                  {project.prompt.length > 80
                    ? project.prompt.slice(0, 80) + "\u2026"
                    : project.prompt}
                </p>
              </div>

              {/* Slides */}
              <div className="md:col-span-2 flex items-start">
                <div>
                  <p className="text-[24px] font-black leading-none">{project.slidesHtml.length}</p>
                  <p className="text-[11px] text-gray-200 font-mono uppercase" style={{ marginTop: "4px" }}>slides</p>
                </div>
              </div>

              {/* Status */}
              <div className="md:col-span-2 flex items-start">
                <span className="text-[12px] font-bold uppercase tracking-[0.08em] text-green-700">
                  Live
                </span>
              </div>

              {/* Date */}
              <div className="md:col-span-2 flex items-start justify-end">
                <span className="text-[11px] font-mono text-gray-200">
                  {formatDate(project.updatedAt)}
                </span>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <div className="text-center animate-fade-in" style={{ padding: "80px 0" }}>
          <p className="text-heading-sm font-bold uppercase">No shared projects</p>
          <p className="text-body text-gray-300" style={{ marginTop: "12px" }}>
            Finalize a project and share it to see it here.
          </p>
        </div>
      )}

      {/* Bottom bar */}
      <div
        className="border-t hairline flex items-center justify-between animate-fade-up delay-3"
        style={{ marginTop: "clamp(40px, 5vw, 72px)", paddingTop: "20px" }}
      >
        <p className="text-[12px] text-gray-200">
          {sharedProjects.length} shared project{sharedProjects.length !== 1 ? "s" : ""}
        </p>
        <p className="text-[12px] text-gray-200 font-mono">
          TRACTION<span className="text-accent">.</span>
        </p>
      </div>
    </div>
  );
}
