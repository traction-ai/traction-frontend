import { PromptInput } from "@/components/chat/prompt-input";
import { ProjectGrid } from "@/components/projects/project-grid";
import { projects } from "@/lib/mock-data";

export default function DashboardPage() {
  return (
    <div style={{ padding: "clamp(32px, 4vw, 64px) clamp(32px, 4vw, 64px)" }}>
      {/* Header */}
      <div className="animate-fade-up">
        <h1 className="text-heading-lg font-black uppercase tracking-tight">
          Dashboard
        </h1>
        <p
          className="text-body-lg text-gray-300 max-w-[520px] leading-relaxed"
          style={{ marginTop: "12px" }}
        >
          Create a new pitch or continue where you left off.
        </p>
      </div>

      {/* Prompt input */}
      <div className="animate-fade-up delay-1" style={{ marginTop: "clamp(32px, 4vw, 56px)" }}>
        <p className="swiss-label text-gray-200" style={{ marginBottom: "16px" }}>
          New Project
        </p>
        <PromptInput />
      </div>

      {/* Projects */}
      <div className="animate-fade-up delay-2" style={{ marginTop: "clamp(48px, 5vw, 80px)" }}>
        <ProjectGrid projects={projects} />
      </div>
    </div>
  );
}
