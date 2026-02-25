"use client";

import { useState } from "react";
import type {
  Project,
  ProjectDocument,
  ChatMessage as ChatMessageType,
  AiSuggestion,
} from "@/types";
import { Badge } from "@/components/ui/badge";
import { ChatPanel } from "@/components/chat/chat-panel";
import { SuggestionsPanel } from "./suggestions-panel";
import Link from "next/link";

interface FinalizeClientProps {
  project: Project;
  documents: ProjectDocument[];
  messages: ChatMessageType[];
  suggestions: AiSuggestion[];
}

export function FinalizeClient({
  project,
  documents,
  messages,
  suggestions,
}: FinalizeClientProps) {
  const [chatOpen, setChatOpen] = useState(false);
  const slides = project.slidesHtml;

  return (
    <div className="flex h-full">
      {/* Main content — scrollable */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          padding: "clamp(32px, 4vw, 64px) clamp(32px, 4vw, 64px)",
        }}
      >
        {/* Header */}
        <header className="animate-fade-up">
          <div className="flex items-start justify-between">
            <div>
              <Link
                href={`/projects/${project.id}`}
                className="inline-flex items-center text-[13px] font-bold uppercase tracking-[0.08em] text-gray-200 hover:text-black transition-colors"
                style={{ gap: "10px" }}
              >
                <span style={{ fontSize: "16px" }}>&larr;</span>
                Back to Workspace
              </Link>
              <h1
                className="text-display font-black uppercase tracking-tight leading-none"
                style={{ marginTop: "20px" }}
              >
                Finalization
              </h1>
              <p
                className="text-body-lg text-gray-300 leading-relaxed max-w-[560px]"
                style={{ marginTop: "12px" }}
              >
                Review your slides, documents, and AI suggestions before sharing.
              </p>
            </div>

            <button
              className="group inline-flex items-center bg-accent text-white font-bold uppercase tracking-[0.1em] hover:bg-black transition-colors flex-shrink-0"
              style={{ padding: "20px 40px", fontSize: "14px", gap: "14px" }}
            >
              Finalize &amp; Share
              <span
                className="inline-block transition-transform group-hover:translate-x-0.5"
                style={{ fontSize: "18px" }}
              >
                &rarr;
              </span>
            </button>
          </div>
        </header>

        {/* Hairline */}
        <div
          className="border-t hairline animate-fade-up delay-1"
          style={{ margin: "clamp(28px, 3vw, 48px) 0" }}
        />

        {/* Slides */}
        <section className="animate-fade-up delay-1">
          <div className="flex items-center" style={{ gap: "16px", marginBottom: "clamp(20px, 2.5vw, 36px)" }}>
            <p className="swiss-label text-gray-200 flex-shrink-0">Slides</p>
            <div className="flex-1 border-t hairline" />
            <p className="text-[13px] text-gray-200 font-mono flex-shrink-0">
              {slides.length} total
            </p>
          </div>
          <div
            className="grid grid-cols-2 md:grid-cols-4"
            style={{ gap: "clamp(12px, 1.5vw, 24px)" }}
          >
            {slides.map((_, index) => (
              <Link
                key={index}
                href={`/projects/${project.id}`}
                className="group block border border-gray-100 aspect-video bg-[#f7f7f7] flex items-center justify-center hover:border-black hover:bg-[#f0f0f0] transition-all duration-200"
              >
                <div className="flex flex-col items-center">
                  <span
                    className="font-black text-gray-100 group-hover:text-black transition-colors leading-none"
                    style={{ fontSize: "28px" }}
                  >
                    {index + 1}
                  </span>
                  <span
                    className="text-[10px] font-mono text-gray-200 uppercase tracking-widest"
                    style={{ marginTop: "6px" }}
                  >
                    slide
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Documents + Suggestions — two-column */}
        <section
          className="grid grid-cols-1 lg:grid-cols-2 animate-fade-up delay-2"
          style={{
            gap: "clamp(32px, 4vw, 64px)",
            marginTop: "clamp(40px, 5vw, 72px)",
          }}
        >
          {/* Documents */}
          <div>
            <div
              className="flex items-center"
              style={{ gap: "16px", marginBottom: "clamp(20px, 2.5vw, 36px)" }}
            >
              <p className="swiss-label text-gray-200 flex-shrink-0">Documents</p>
              <div className="flex-1 border-t hairline" />
              <p className="text-[13px] text-gray-200 font-mono flex-shrink-0">
                {documents.length}
              </p>
            </div>
            {documents.length === 0 ? (
              <p className="text-[15px] text-gray-200">No documents yet.</p>
            ) : (
              <ul>
                {documents.map((doc) => (
                  <li
                    key={doc.id}
                    className="flex items-center border-b hairline last:border-b-0"
                    style={{ padding: "18px 0", gap: "20px" }}
                  >
                    <span
                      className="flex-shrink-0 flex items-center justify-center text-center"
                      style={{ width: "24px" }}
                    >
                      {doc.status === "ready" && (
                        <span className="text-green-600 font-bold" style={{ fontSize: "16px" }}>
                          &#10003;
                        </span>
                      )}
                      {doc.status === "generating" && (
                        <span className="text-amber-500" style={{ fontSize: "16px" }}>
                          &#10227;
                        </span>
                      )}
                      {doc.status === "error" && (
                        <span className="text-red-600 font-bold" style={{ fontSize: "16px" }}>
                          &#10007;
                        </span>
                      )}
                    </span>
                    <span className="text-[15px] flex-1 min-w-0 truncate">
                      {doc.title}
                    </span>
                    <Badge variant={doc.status}>{doc.status}</Badge>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* AI Suggestions */}
          <div>
            <div
              className="flex items-center"
              style={{ gap: "16px", marginBottom: "clamp(20px, 2.5vw, 36px)" }}
            >
              <p className="swiss-label text-gray-200 flex-shrink-0">AI Suggestions</p>
              <div className="flex-1 border-t hairline" />
            </div>
            <SuggestionsPanel suggestions={suggestions} />
          </div>
        </section>

        {/* Bottom bar */}
        <div
          className="border-t hairline flex items-center justify-between animate-fade-up delay-3"
          style={{ marginTop: "clamp(40px, 5vw, 72px)", paddingTop: "20px" }}
        >
          <p className="text-[13px] text-gray-200">
            {slides.length} slides &middot; {documents.length} documents
          </p>
          <p className="text-[13px] text-gray-200 font-mono">
            TRACTION<span className="text-accent">.</span>
          </p>
        </div>
      </div>

      {/* Chat toggle button — fixed on right edge */}
      {!chatOpen && (
        <button
          onClick={() => setChatOpen(true)}
          className="fixed z-40 bg-black text-white font-bold uppercase tracking-[0.1em] hover:bg-accent transition-colors flex items-center"
          style={{
            right: "0",
            top: "50%",
            transform: "translateY(-50%)",
            writingMode: "vertical-rl",
            padding: "28px 16px",
            fontSize: "12px",
            gap: "12px",
          }}
        >
          <span
            className="inline-block"
            style={{ width: "8px", height: "8px", background: "#22c55e" }}
          />
          Agent Chat
        </button>
      )}

      {/* Chat side panel — slides in from right */}
      <div
        className="flex-shrink-0 border-l hairline bg-white flex flex-col transition-all duration-300 overflow-hidden"
        style={{
          width: chatOpen ? "clamp(380px, 30vw, 520px)" : "0px",
        }}
      >
        {chatOpen && (
          <>
            {/* Close button bar */}
            <div
              className="flex items-center justify-end border-b hairline bg-[#fafafa] flex-shrink-0"
              style={{ padding: "10px clamp(20px, 2.5vw, 32px)" }}
            >
              <button
                onClick={() => setChatOpen(false)}
                className="text-gray-200 hover:text-black transition-colors font-bold flex items-center"
                style={{ fontSize: "12px", padding: "8px", gap: "8px", letterSpacing: "0.08em", textTransform: "uppercase" as const }}
              >
                Close
                <span style={{ fontSize: "18px" }}>&times;</span>
              </button>
            </div>

            {/* Embedded chat panel (has its own header, messages, input) */}
            <div className="flex-1 min-h-0">
              <ChatPanel
                initialMessages={messages}
                projectId={project.id}
              />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
