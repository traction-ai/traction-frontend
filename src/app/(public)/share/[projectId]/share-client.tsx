"use client";

import { useState, useCallback } from "react";
import type { Project, ProjectDocument, DocumentType } from "@/types";
import { DeckViewer } from "@/components/deck/deck-viewer";

interface ShareClientProps {
  project: Project;
  documents: ProjectDocument[];
  viewCount: number;
}

type Phase = "deck" | "documents" | "document";

const DOC_TYPE_ABBREV: Record<DocumentType, string> = {
  "product-description": "PD",
  timeline: "TL",
  "swot-analysis": "SW",
  "market-research": "MR",
  "financial-projections": "FP",
  "funding-requirements": "FR",
  "product-forecast": "PF",
  "competitive-analysis": "CA",
  "executive-summary": "ES",
};

const DOC_TYPE_LABELS: Record<DocumentType, string> = {
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

export function ShareClient({
  project,
  documents,
  viewCount,
}: ShareClientProps) {
  const [phase, setPhase] = useState<Phase>("deck");
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState<ProjectDocument | null>(null);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const isLastSlide = currentSlide === project.slidesHtml.length - 1;

  // ── Phase 1: Fullscreen Deck ──
  if (phase === "deck") {
    return (
      <div className="fixed inset-0 z-50 bg-white flex flex-col">
        {/* Subtle top bar */}
        <div
          className="absolute top-0 left-0 right-0 z-10 flex items-center justify-between"
          style={{ padding: "20px 28px" }}
        >
          <span className="text-[11px] font-mono uppercase tracking-widest text-gray-300">
            Shared via Traction
          </span>
          <span className="text-[11px] font-mono text-gray-200">
            {viewCount} views
          </span>
        </div>

        {/* Deck */}
        <div className="flex-1 min-h-0">
          <DeckViewer
            slides={project.slidesHtml}
            onSlideChange={handleSlideChange}
          />
        </div>

        {/* "View Documents" button — appears on last slide */}
        {isLastSlide && (
          <div className="absolute bottom-8 left-0 right-0 z-10 flex justify-center">
            <button
              onClick={() => setPhase("documents")}
              className="inline-flex items-center bg-black text-white font-bold uppercase tracking-[0.1em] hover:bg-accent transition-colors animate-in fade-in slide-in-from-bottom-2 duration-300"
              style={{ padding: "16px 36px", fontSize: "12px", gap: "10px" }}
            >
              View Documents
              <span style={{ fontSize: "15px" }}>&rarr;</span>
            </button>
          </div>
        )}
      </div>
    );
  }

  // ── Phase 2: Documents Menu Grid ──
  if (phase === "documents") {
    return (
      <div className="fixed inset-0 z-50 bg-white overflow-y-auto">
        {/* Header */}
        <div
          className="flex items-center justify-between border-b hairline"
          style={{ padding: "20px 28px" }}
        >
          <button
            onClick={() => {
              setCurrentSlide(0);
              setPhase("deck");
            }}
            className="inline-flex items-center text-[12px] font-bold uppercase tracking-[0.1em] hover:opacity-60 transition-opacity"
            style={{ gap: "8px" }}
          >
            <span style={{ fontSize: "15px" }}>&larr;</span>
            Back to Deck
          </button>
          <span className="text-[11px] font-mono uppercase tracking-widest text-gray-300">
            Shared via Traction
          </span>
        </div>

        {/* Content */}
        <div
          className="max-w-[1200px] mx-auto"
          style={{ padding: "clamp(32px, 5vw, 64px) clamp(20px, 4vw, 48px)" }}
        >
          <p className="text-[11px] font-mono uppercase tracking-widest text-gray-300">
            {project.name}
          </p>
          <h1
            className="font-black uppercase tracking-tight leading-[0.95]"
            style={{ fontSize: "clamp(28px, 4vw, 48px)", marginTop: "12px" }}
          >
            Documents
          </h1>
          <hr className="border-black" style={{ marginTop: "24px" }} />

          {/* Grid */}
          <div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            style={{ gap: "1px", marginTop: "32px", background: "#e5e5e5" }}
          >
            {documents.map((doc) => {
              const abbrev = DOC_TYPE_ABBREV[doc.type] || "??";
              const label = DOC_TYPE_LABELS[doc.type] || doc.type;
              const preview =
                doc.content.length > 100
                  ? doc.content.slice(0, 100) + "..."
                  : doc.content;

              return (
                <button
                  key={doc.id}
                  onClick={() => {
                    setSelectedDoc(doc);
                    setPhase("document");
                  }}
                  className="bg-white text-left hover:bg-[#fafafa] transition-colors group"
                  style={{ padding: "clamp(20px, 2.5vw, 32px)" }}
                >
                  <span className="text-[11px] font-mono tracking-wider text-gray-300">
                    {abbrev}
                  </span>
                  <p
                    className="font-bold leading-tight"
                    style={{
                      fontSize: "15px",
                      marginTop: "10px",
                    }}
                  >
                    {doc.title}
                  </p>
                  <p
                    className="text-[13px] text-gray-300 leading-relaxed"
                    style={{ marginTop: "8px" }}
                  >
                    {preview}
                  </p>
                  <span className="inline-block text-[11px] font-mono text-gray-200 opacity-0 group-hover:opacity-100 transition-opacity" style={{ marginTop: "12px" }}>
                    Read &rarr;
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  // ── Phase 3: Document Detail ──
  if (phase === "document" && selectedDoc) {
    const label = DOC_TYPE_LABELS[selectedDoc.type] || selectedDoc.type;

    return (
      <div className="fixed inset-0 z-50 bg-white overflow-y-auto flex flex-col">
        {/* Header */}
        <div
          className="flex items-center justify-between border-b hairline flex-shrink-0"
          style={{ padding: "20px 28px" }}
        >
          <button
            onClick={() => {
              setSelectedDoc(null);
              setPhase("documents");
            }}
            className="inline-flex items-center text-[12px] font-bold uppercase tracking-[0.1em] hover:opacity-60 transition-opacity"
            style={{ gap: "8px" }}
          >
            <span style={{ fontSize: "15px" }}>&larr;</span>
            Back to Documents
          </button>
          <span className="text-[11px] font-mono uppercase tracking-widest text-gray-300">
            {label}
          </span>
        </div>

        {/* Document content */}
        <div
          className="flex-1"
          style={{
            padding: "clamp(32px, 5vw, 64px) clamp(20px, 4vw, 48px)",
          }}
        >
          <div style={{ maxWidth: "720px", margin: "0 auto" }}>
            <p className="text-[11px] font-mono uppercase tracking-widest text-gray-300">
              {project.name}
            </p>
            <h1
              className="font-black uppercase tracking-tight leading-[0.95]"
              style={{
                fontSize: "clamp(24px, 3.5vw, 40px)",
                marginTop: "12px",
              }}
            >
              {selectedDoc.title}
            </h1>
            <hr className="border-black" style={{ marginTop: "24px", marginBottom: "32px" }} />

            {selectedDoc.content.split("\n\n").map((paragraph, i) => (
              <p
                key={`p-${i}`}
                className="text-[15px] text-gray-400 leading-relaxed"
                style={{ marginBottom: "20px" }}
              >
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="flex items-center justify-between border-t hairline flex-shrink-0"
          style={{ padding: "16px 28px" }}
        >
          <span className="text-[11px] font-mono text-gray-200">
            {selectedDoc.title}
          </span>
          <span className="text-[11px] font-black uppercase tracking-[0.15em]">
            TRACTION.
          </span>
        </div>
      </div>
    );
  }

  return null;
}
