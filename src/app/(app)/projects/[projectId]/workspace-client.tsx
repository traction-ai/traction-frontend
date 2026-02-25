"use client";

import { useState, useCallback } from "react";
import type {
  Project,
  ProjectDocument,
  ChatMessage as ChatMessageType,
  Feedback as FeedbackType,
} from "@/types";
import { DeckViewer } from "@/components/deck/deck-viewer";
import { SlideStrip } from "@/components/deck/slide-strip";
import { Tabs } from "@/components/ui/tabs";
import { DocumentList } from "@/components/documents/document-list";
import { DocumentViewer } from "@/components/documents/document-viewer";
import { ChatPanel } from "@/components/chat/chat-panel";
import { FeedbackPanel } from "@/components/feedback/feedback-panel";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

const WORKSPACE_TABS = [
  { id: "documents", label: "Documents" },
  { id: "chat", label: "AI Chat" },
  { id: "review", label: "Review" },
];

interface WorkspaceClientProps {
  project: Project;
  documents: ProjectDocument[];
  initialMessages: ChatMessageType[];
  feedback: FeedbackType[];
}

export function WorkspaceClient({
  project,
  documents,
  initialMessages,
  feedback,
}: WorkspaceClientProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDoc, setSelectedDoc] = useState<ProjectDocument | null>(null);

  const handleSlideChange = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  const handleDocSelect = useCallback((doc: ProjectDocument) => {
    setSelectedDoc(doc);
  }, []);

  const handleDocClose = useCallback(() => {
    setSelectedDoc(null);
  }, []);

  return (
    <div className="flex flex-col h-full">
      {/* Workspace header — generous spacing matching projects page */}
      <div
        className="flex items-center justify-between border-b hairline bg-white flex-shrink-0"
        style={{
          padding: "clamp(24px, 3vw, 40px) clamp(32px, 4vw, 64px)",
        }}
      >
        <div className="flex items-center" style={{ gap: "clamp(20px, 2.5vw, 36px)" }}>
          <div>
            <p
              className="swiss-label text-gray-200"
              style={{ marginBottom: "10px" }}
            >
              Project
            </p>
            <h1 className="text-[22px] font-black uppercase tracking-tight leading-none">
              {project.name}
            </h1>
            <p
              className="text-body-lg text-gray-300 leading-relaxed"
              style={{ marginTop: "10px" }}
            >
              Chat with the agent to create your pitch.
            </p>
          </div>
          <Badge variant={project.status}>{project.status}</Badge>
        </div>
        <Link
          href={`/projects/${project.id}/finalize`}
          className="group inline-flex items-center bg-accent text-white font-bold uppercase tracking-[0.1em] hover:bg-black transition-colors flex-shrink-0"
          style={{ padding: "18px 36px", fontSize: "13px", gap: "12px" }}
        >
          Pitchdeck
          <span
            className="inline-block transition-transform group-hover:translate-x-0.5"
            style={{ fontSize: "16px" }}
          >
            &rarr;
          </span>
        </Link>
      </div>

      {/* Main workspace */}
      <div className="flex flex-1 min-h-0">
        {/* Left: Deck (60%) */}
        <div className="flex flex-col w-full lg:w-[60%] border-r hairline">
          <div className="flex-1 min-h-0">
            <DeckViewer
              slides={project.slidesHtml}
              onSlideChange={handleSlideChange}
            />
          </div>
          <SlideStrip
            slideCount={project.slidesHtml.length}
            activeIndex={currentSlide}
            onSelect={handleSlideChange}
          />
        </div>

        {/* Right: Tabs (40%) — generous room for chat */}
        <div className="hidden lg:flex lg:flex-col lg:w-[40%]">
          <Tabs tabs={WORKSPACE_TABS} defaultTab="chat">
            {(activeTab) => {
              if (activeTab === "documents") {
                return (
                  <DocumentList
                    documents={documents}
                    onSelect={handleDocSelect}
                  />
                );
              }
              if (activeTab === "chat") {
                return (
                  <ChatPanel
                    initialMessages={initialMessages}
                    projectId={project.id}
                  />
                );
              }
              if (activeTab === "review") {
                return <FeedbackPanel initialFeedback={feedback} />;
              }
              return null;
            }}
          </Tabs>
        </div>
      </div>

      <DocumentViewer
        document={selectedDoc}
        open={selectedDoc !== null}
        onClose={handleDocClose}
      />
    </div>
  );
}
