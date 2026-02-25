import {
  getProjectById,
  getDocumentsByProjectId,
} from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const DOC_TYPE_LABELS: Record<string, string> = {
  "product-description": "Product Description",
  "timeline": "Timeline",
  "swot-analysis": "SWOT Analysis",
  "market-research": "Market Research",
  "financial-projections": "Financial Projections",
  "funding-requirements": "Funding Requirements",
  "product-forecast": "Product Forecast",
  "competitive-analysis": "Competitive Analysis",
  "executive-summary": "Executive Summary",
};

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectDocumentsPage({ params }: Props) {
  const { projectId } = await params;
  const project = getProjectById(projectId);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-heading font-bold uppercase">Project not found</h1>
        <Link
          href="/projects"
          className="swiss-label text-gray-300 hover:text-black"
          style={{ marginTop: "24px" }}
        >
          &larr;&ensp;Back to projects
        </Link>
      </div>
    );
  }

  const docs = getDocumentsByProjectId(projectId);
  const readyDocs = docs.filter((d) => d.status === "ready");

  return (
    <div style={{ padding: "clamp(32px, 4vw, 64px) clamp(32px, 4vw, 64px)" }}>
      {/* Header */}
      <div className="animate-fade-up">
        <div className="flex items-start justify-between" style={{ gap: "clamp(24px, 3vw, 48px)" }}>
          <div>
            <p className="swiss-label text-gray-200" style={{ marginBottom: "12px" }}>
              {project.name}
            </p>
            <h1 className="text-display font-black uppercase tracking-tight leading-none">
              Documents
            </h1>
          </div>

          <div className="hidden md:flex items-start pt-1" style={{ gap: "clamp(32px, 4vw, 56px)" }}>
            <div>
              <p className="text-[36px] font-black leading-none">{docs.length}</p>
              <p className="swiss-label text-gray-200" style={{ marginTop: "6px" }}>Total</p>
            </div>
            <div>
              <p className="text-[36px] font-black leading-none">{readyDocs.length}</p>
              <p className="swiss-label text-gray-200" style={{ marginTop: "6px" }}>Ready</p>
            </div>
          </div>
        </div>

        <p
          className="text-body-lg text-gray-300 max-w-[560px] leading-relaxed"
          style={{ marginTop: "16px" }}
        >
          All generated documents for this project — SWOT analyses, financial
          projections, market research, and more.
        </p>
      </div>

      {/* Hairline */}
      <div
        className="border-t hairline animate-fade-up delay-1"
        style={{ margin: "clamp(28px, 3vw, 48px) 0" }}
      />

      {/* Documents */}
      <div className="animate-fade-up delay-2">
        {/* Project heading */}
        <div className="flex items-center" style={{ gap: "16px", marginBottom: "clamp(20px, 2.5vw, 36px)" }}>
          <p className="swiss-label text-gray-200 flex-shrink-0">
            {project.name}
          </p>
          <div className="flex-1 border-t hairline" />
          <span className="text-[12px] font-mono text-gray-200">
            {docs.length} docs
          </span>
        </div>

        {/* Document grid */}
        {docs.length === 0 ? (
          <p className="text-[15px] text-gray-200">No documents generated yet.</p>
        ) : (
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            style={{ columnGap: "clamp(20px, 2.5vw, 40px)", rowGap: "clamp(20px, 2.5vw, 36px)" }}
          >
            {docs.map((doc) => (
              <Link
                key={doc.id}
                href={`/projects/${projectId}/documents/${doc.id}`}
                className="border border-gray-100 hover:border-black transition-colors group block"
                style={{ padding: "clamp(20px, 2.5vw, 32px)" }}
              >
                <div className="flex items-center justify-between" style={{ marginBottom: "16px" }}>
                  <span className="text-[11px] font-mono text-accent">
                    {doc.type.split("-").map(w => w[0]).join("").toUpperCase()}
                  </span>
                  <Badge variant={doc.status}>{doc.status}</Badge>
                </div>
                <h3 className="text-[15px] font-bold leading-snug group-hover:text-accent transition-colors">
                  {DOC_TYPE_LABELS[doc.type] || doc.title}
                </h3>
                <p className="text-[13px] text-gray-200 leading-relaxed" style={{ marginTop: "10px" }}>
                  {doc.content.slice(0, 100)}{doc.content.length > 100 ? "\u2026" : ""}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>

      {/* Bottom bar */}
      <div
        className="border-t hairline flex items-center justify-between animate-fade-up delay-3"
        style={{ marginTop: "clamp(40px, 5vw, 72px)", paddingTop: "20px" }}
      >
        <p className="text-[12px] text-gray-200">
          {docs.length} documents
        </p>
        <p className="text-[12px] text-gray-200 font-mono">
          TRACTION<span className="text-accent">.</span>
        </p>
      </div>
    </div>
  );
}
