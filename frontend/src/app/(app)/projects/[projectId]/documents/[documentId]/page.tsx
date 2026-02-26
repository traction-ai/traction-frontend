import {
  getProjectById,
  getDocumentById,
} from "@/lib/mock-data";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import Link from "next/link";

const DOC_TYPE_LABELS: Record<string, string> = {
  "product-description": "Product Description",
  timeline: "Timeline",
  "swot-analysis": "SWOT Analysis",
  "market-research": "Market Research",
  "financial-projections": "Financial Projections",
  "funding-requirements": "Funding Requirements",
  "product-forecast": "Product Forecast",
  "competitive-analysis": "Competitive Analysis",
  "executive-summary": "Executive Summary",
};

interface Props {
  params: Promise<{ projectId: string; documentId: string }>;
  searchParams: Promise<{ from?: string }>;
}

export default async function DocumentDetailPage({ params, searchParams }: Props) {
  const { projectId, documentId } = await params;
  const { from } = await searchParams;
  const project = getProjectById(projectId);
  const doc = getDocumentById(documentId);

  if (!project || !doc || doc.projectId !== projectId) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-heading font-bold uppercase">Document not found</h1>
        <Link
          href={`/projects/${projectId}/documents`}
          className="swiss-label text-gray-300 hover:text-black"
          style={{ marginTop: "24px" }}
        >
          &larr;&ensp;Back to documents
        </Link>
      </div>
    );
  }

  const paragraphs = doc.content.split("\n\n").filter(Boolean);

  const backHref = from === "dashboard"
    ? `/projects/${projectId}`
    : `/projects/${projectId}/documents`;
  const backLabel = from === "dashboard"
    ? "Back to Dashboard"
    : "Back to Documents";

  return (
    <div style={{ padding: "clamp(32px, 4vw, 64px) clamp(32px, 4vw, 64px)" }}>
      {/* Header */}
      <div className="animate-fade-up">
        <Link
          href={backHref}
          className="inline-flex items-center text-[13px] font-bold uppercase tracking-[0.08em] text-gray-200 hover:text-black transition-colors"
          style={{ gap: "10px" }}
        >
          <span style={{ fontSize: "16px" }}>&larr;</span>
          {backLabel}
        </Link>

        <div
          className="flex items-start justify-between"
          style={{ marginTop: "clamp(24px, 3vw, 40px)", gap: "clamp(24px, 3vw, 48px)" }}
        >
          <div>
            <p className="swiss-label text-gray-200" style={{ marginBottom: "12px" }}>
              {project.name}
            </p>
            <h1 className="text-display font-black uppercase tracking-tight leading-none">
              {DOC_TYPE_LABELS[doc.type] || doc.title}
            </h1>
          </div>

          <div className="hidden md:flex items-center flex-shrink-0" style={{ gap: "clamp(20px, 2.5vw, 32px)" }}>
            <Badge variant={doc.status}>{doc.status}</Badge>
            <span className="text-[12px] font-mono text-gray-200">
              {formatDate(doc.updatedAt)}
            </span>
          </div>
        </div>
      </div>

      {/* Hairline */}
      <div
        className="border-t hairline animate-fade-up delay-1"
        style={{ margin: "clamp(28px, 3vw, 48px) 0" }}
      />

      {/* Document content */}
      <article
        className="max-w-[720px] animate-fade-up delay-2"
      >
        {paragraphs.map((paragraph, i) => (
          <p
            key={`p-${i}`}
            className="text-[16px] text-gray-300 leading-[1.8]"
            style={{ marginBottom: "clamp(20px, 2.5vw, 32px)" }}
          >
            {paragraph}
          </p>
        ))}
      </article>

      {/* Bottom bar */}
      <div
        className="border-t hairline flex items-center justify-between animate-fade-up delay-3"
        style={{ marginTop: "clamp(40px, 5vw, 72px)", paddingTop: "20px" }}
      >
        <p className="text-[12px] text-gray-200">
          {DOC_TYPE_LABELS[doc.type] || doc.title}
        </p>
        <p className="text-[12px] text-gray-200 font-mono">
          TRACTION<span className="text-accent">.</span>
        </p>
      </div>
    </div>
  );
}
