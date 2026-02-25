"use client";

import { useState, useCallback, useEffect, useMemo } from "react";
import type {
  Project,
  ProjectDocument,
  ChatMessage as ChatMessageType,
} from "@/types";
import Link from "next/link";
import { DeckViewer } from "@/components/deck/deck-viewer";
import { SlideStrip } from "@/components/deck/slide-strip";
import { DocumentList } from "@/components/documents/document-list";
import { ChatPanel } from "@/components/chat/chat-panel";
import { Badge } from "@/components/ui/badge";

interface WorkspaceClientProps {
  project: Project;
  documents: ProjectDocument[];
  initialMessages: ChatMessageType[];
}

export function WorkspaceClient({
  project,
  documents,
  initialMessages,
}: WorkspaceClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [deckFullscreen, setDeckFullscreen] = useState(false);

  // Document readiness state — start from any docs already "ready" in data
  const [readyDocIds, setReadyDocIds] = useState<Set<string>>(() => {
    const initial = new Set<string>();
    for (const doc of documents) {
      if (doc.status === "ready") initial.add(doc.id);
    }
    return initial;
  });

  const allReady = readyDocIds.size >= documents.length;

  const pendingDocuments = useMemo(
    () => documents.filter((d) => !readyDocIds.has(d.id)),
    [documents, readyDocIds]
  );

  const handleDocumentsReady = useCallback((docIds: string[]) => {
    setReadyDocIds((prev) => {
      const next = new Set(prev);
      for (const id of docIds) next.add(id);
      return next;
    });
  }, []);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Close fullscreen on Escape key
  useEffect(() => {
    if (!deckFullscreen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDeckFullscreen(false);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [deckFullscreen]);

  return (
    <div className="flex flex-col h-full">
      {/* Workspace header */}
      <div
        className="flex items-center justify-between border-b hairline bg-white flex-shrink-0"
        style={{
          padding: "clamp(20px, 2.5vw, 32px) clamp(28px, 3.5vw, 48px)",
        }}
      >
        <div className="flex items-center" style={{ gap: "clamp(16px, 2vw, 28px)" }}>
          <div>
            <p
              className="swiss-label text-gray-200"
              style={{ marginBottom: "8px" }}
            >
              Project
            </p>
            <h1 className="text-[20px] font-black uppercase tracking-tight leading-none">
              {project.name}
            </h1>
          </div>
          <Badge variant={project.status}>{project.status}</Badge>
        </div>
        <div className="flex items-center" style={{ gap: "16px" }}>
          <span className="text-[13px] font-mono text-gray-300">
            {readyDocIds.size} / {documents.length} ready
          </span>
          <button
            onClick={() => allReady && setDeckFullscreen(true)}
            disabled={!allReady}
            className={
              allReady
                ? "group inline-flex items-center bg-accent text-white font-bold uppercase tracking-[0.1em] hover:bg-black transition-colors flex-shrink-0"
                : "inline-flex items-center bg-gray-100 text-gray-300 font-bold uppercase tracking-[0.1em] cursor-not-allowed flex-shrink-0"
            }
            style={{ padding: "14px 28px", fontSize: "12px", gap: "10px" }}
          >
            Pitchdeck
            <span
              className={allReady ? "inline-block transition-transform group-hover:translate-x-0.5" : "inline-block"}
              style={{ fontSize: "15px" }}
            >
              &rarr;
            </span>
          </button>
          {allReady ? (
            <Link
              href={`/share/${project.id}`}
              className="group inline-flex items-center border border-black text-black font-bold uppercase tracking-[0.1em] hover:bg-black hover:text-white transition-colors flex-shrink-0"
              style={{ padding: "14px 28px", fontSize: "12px", gap: "10px" }}
            >
              Share
              <span
                className="inline-block transition-transform group-hover:translate-x-0.5"
                style={{ fontSize: "15px" }}
              >
                &rarr;
              </span>
            </Link>
          ) : (
            <span
              className="inline-flex items-center border border-gray-200 text-gray-300 font-bold uppercase tracking-[0.1em] cursor-not-allowed flex-shrink-0"
              style={{ padding: "14px 28px", fontSize: "12px", gap: "10px" }}
            >
              Share
              <span className="inline-block" style={{ fontSize: "15px" }}>
                &rarr;
              </span>
            </span>
          )}
        </div>
      </div>

      {/* Main workspace — Chat 2/3, Documents 1/3 */}
      <div className="flex flex-1 min-h-0">
        {/* Chat — 2/3 */}
        <div className="flex flex-col w-full lg:w-2/3 min-h-0">
          <ChatPanel
            initialMessages={initialMessages}
            projectId={project.id}
            onDocumentsReady={handleDocumentsReady}
            pendingDocuments={pendingDocuments}
          />
        </div>

        {/* Documents checklist — 1/3 */}
        <div className="hidden lg:flex lg:flex-col lg:w-1/3 border-l hairline min-h-0">
          {/* Checklist header */}
          <div
            className="flex-shrink-0 border-b hairline bg-[#fafafa]"
            style={{ padding: "clamp(18px, 2vw, 28px) clamp(20px, 2.5vw, 32px)" }}
          >
            <div className="flex items-center justify-between">
              <p className="font-bold uppercase tracking-[0.08em]" style={{ fontSize: "13px" }}>
                Documents
              </p>
              <span className="text-[12px] font-mono text-gray-300">
                {readyDocIds.size}/{documents.length}
              </span>
            </div>
            {/* Progress bar */}
            <div
              className="w-full bg-gray-100 overflow-hidden"
              style={{ height: "3px", marginTop: "14px" }}
            >
              <div
                className="h-full bg-black transition-all duration-500 ease-out"
                style={{ width: `${(readyDocIds.size / documents.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Scrollable checklist */}
          <div className="flex-1 overflow-y-auto">
            <DocumentList
              documents={documents}
              readyDocIds={readyDocIds}
            />
          </div>
        </div>
      </div>

      {/* Fullscreen pitchdeck overlay */}
      {deckFullscreen && (
        <div className="fixed inset-0 z-50 bg-white flex flex-col">
          <div className="flex-1 min-h-0">
            <DeckViewer
              slides={project.slidesHtml}
              onSlideChange={handleSlideChange}
            />
          </div>

          {/* Bottom hover zone — slide strip appears on hover */}
          <div className="absolute bottom-0 left-0 right-0 z-10 group/bottom" style={{ height: "80px" }}>
            <div className="absolute bottom-0 left-0 right-0 opacity-0 group-hover/bottom:opacity-100 transition-opacity duration-200">
              <SlideStrip
                slideCount={project.slidesHtml.length}
                activeIndex={currentSlide}
                onSelect={handleSlideChange}
              />
            </div>
          </div>

          {/* Top-left hover zone — back button appears on hover */}
          <div className="absolute top-0 left-0 z-10 group/back" style={{ width: "160px", height: "80px" }}>
            <button
              onClick={() => setDeckFullscreen(false)}
              className="absolute top-6 left-6 inline-flex items-center bg-black text-white font-bold uppercase tracking-[0.1em] hover:bg-accent transition-all opacity-0 group-hover/back:opacity-100 duration-200"
              style={{ padding: "14px 28px", fontSize: "12px", gap: "10px" }}
            >
              <span style={{ fontSize: "16px" }}>&larr;</span>
              Back
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
