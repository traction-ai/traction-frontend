"use client";

import { useState, useEffect } from "react";
import { getPublicProject } from "@/lib/api";
import type { PublicProjectResponse, ProjectDocument } from "@/types";

type Phase = "deck" | "documents" | "document";

const DOC_TYPE_ABBREV: Record<string, string> = {
  "product-description": "PD",
  "timeline": "TL",
  "swot-analysis": "SW",
  "market-research": "MR",
  "financial-projections": "FP",
  "funding-requirements": "FR",
  "product-forecast": "PF",
  "competitive-analysis": "CA",
  "executive-summary": "ES",
};

export function PublicShareClient({ username, projectName }: { username: string; projectName: string }) {
  const [data, setData] = useState<PublicProjectResponse | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [phase, setPhase] = useState<Phase>("deck");
  const [selectedDoc, setSelectedDoc] = useState<ProjectDocument | null>(null);

  useEffect(() => {
    getPublicProject(username, projectName)
      .then(setData)
      .catch(() => setError("Project not found"))
      .finally(() => setLoading(false));
  }, [username, projectName]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-[13px] text-white/40 uppercase tracking-[0.08em]">Loading...</p>
      </div>
    );
  }

  if (error || !data) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-black">
        <p className="text-[16px] text-white/60">{error || "Not found"}</p>
      </div>
    );
  }

  const { project, documents, user: owner } = data;

  // Deck phase
  if (phase === "deck") {
    return (
      <div className="min-h-screen bg-black relative">
        {project.full_html ? (
          <div
            className="w-full h-screen"
            dangerouslySetInnerHTML={{ __html: project.full_html }}
          />
        ) : (
          <div className="flex items-center justify-center h-screen">
            <p className="text-white/40 text-[14px]">No deck generated yet.</p>
          </div>
        )}
        {/* Documents button */}
        {documents.length > 0 && (
          <button
            onClick={() => setPhase("documents")}
            className="fixed bottom-8 right-8 z-20 text-white/80 hover:text-white text-[12px] font-bold uppercase tracking-[0.1em] transition-colors"
            style={{
              padding: "16px 32px",
              background: "rgba(255,255,255,0.08)",
              backdropFilter: "blur(24px) saturate(1.4)",
              border: "1px solid rgba(255,255,255,0.12)",
            }}
          >
            View Documents &rarr;
          </button>
        )}
        {/* Branding */}
        <div className="fixed top-6 right-6 z-20">
          <p className="text-white/30 text-[11px] uppercase tracking-[0.1em]">
            Shared via Traction
          </p>
        </div>
      </div>
    );
  }

  // Documents phase
  if (phase === "documents") {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b hairline" style={{ padding: "clamp(24px, 3vw, 40px) clamp(32px, 4vw, 64px)" }}>
          <div className="flex items-center justify-between">
            <button
              onClick={() => setPhase("deck")}
              className="text-[12px] text-gray-200 uppercase tracking-[0.08em] font-bold hover:text-black transition-colors"
            >
              &larr; Back to Deck
            </button>
            <p className="text-[11px] text-gray-200 uppercase tracking-[0.1em]">
              {owner.display_name || owner.username} &middot; {project.name}
            </p>
          </div>
        </div>

        {/* Document grid */}
        <div style={{ padding: "clamp(32px, 4vw, 64px)" }}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" style={{ gap: "1px", background: "#e5e5e5" }}>
            {documents.filter((d) => d.status === "ready").map((doc) => (
              <button
                key={doc.id}
                onClick={() => { setSelectedDoc(doc); setPhase("document"); }}
                className="bg-white text-left hover:bg-[#fafafa] transition-colors group"
                style={{ padding: "clamp(24px, 3vw, 40px)" }}
              >
                <span className="text-[10px] font-mono text-gray-200 tracking-wider">
                  {DOC_TYPE_ABBREV[doc.type] || "??"}
                </span>
                <p className="text-[14px] font-bold text-black" style={{ marginTop: "12px" }}>
                  {doc.title}
                </p>
                <p className="text-[12px] text-gray-300 line-clamp-2" style={{ marginTop: "8px" }}>
                  {doc.content.slice(0, 120)}...
                </p>
                <span className="block text-[11px] text-gray-200 group-hover:text-black transition-colors" style={{ marginTop: "16px" }}>
                  Read &rarr;
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t hairline" style={{ padding: "20px clamp(32px, 4vw, 64px)" }}>
          <div className="flex items-center justify-between">
            <p className="text-[11px] text-gray-200">
              {documents.filter((d) => d.status === "ready").length} documents
            </p>
            <p className="text-[14px] font-black tracking-tight">
              TRACTION<span className="text-accent">.</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Single document phase
  if (phase === "document" && selectedDoc) {
    return (
      <div className="min-h-screen bg-white">
        {/* Header */}
        <div className="border-b hairline" style={{ padding: "clamp(24px, 3vw, 40px) clamp(32px, 4vw, 64px)" }}>
          <div className="flex items-center justify-between">
            <button
              onClick={() => { setPhase("documents"); setSelectedDoc(null); }}
              className="text-[12px] text-gray-200 uppercase tracking-[0.08em] font-bold hover:text-black transition-colors"
            >
              &larr; Back to Documents
            </button>
            <span className="text-[10px] font-mono text-gray-200 tracking-wider">
              {DOC_TYPE_ABBREV[selectedDoc.type] || "??"}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="max-w-[720px] mx-auto" style={{ padding: "clamp(32px, 4vw, 64px)" }}>
          <h1 className="text-[24px] font-bold">{selectedDoc.title}</h1>
          <div className="prose" style={{ marginTop: "32px" }}>
            {selectedDoc.content.split("\n\n").map((paragraph, i) => (
              <p key={i} className="text-[15px] text-gray-400 leading-relaxed" style={{ marginBottom: "24px" }}>
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="border-t hairline" style={{ padding: "20px clamp(32px, 4vw, 64px)" }}>
          <div className="flex items-center justify-between">
            <p className="text-[12px] text-gray-200">{selectedDoc.title}</p>
            <p className="text-[14px] font-black tracking-tight">
              TRACTION<span className="text-accent">.</span>
            </p>
          </div>
        </div>
      </div>
    );
  }

  return null;
}
