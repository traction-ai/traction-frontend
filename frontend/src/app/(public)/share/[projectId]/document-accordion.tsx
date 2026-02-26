"use client";

import { useState, useCallback } from "react";
import type { ProjectDocument } from "@/types";

interface DocumentAccordionProps {
  documents: ProjectDocument[];
}

export function DocumentAccordion({ documents }: DocumentAccordionProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const toggle = useCallback((id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  }, []);

  return (
    <div className="divide-y divide-gray-100 border-t border-b hairline">
      {documents.map((doc) => {
        const isExpanded = expandedId === doc.id;

        return (
          <div key={doc.id}>
            <button
              onClick={() => toggle(doc.id)}
              className="w-full flex items-center justify-between px-0 py-5 text-left hover:opacity-70"
              aria-expanded={isExpanded}
            >
              <span className="text-[15px] font-bold">{doc.title}</span>
              <span className="text-[18px] leading-none text-gray-200 ml-4">
                {isExpanded ? "\u2212" : "+"}
              </span>
            </button>

            {isExpanded && (
              <div className="pb-8">
                {doc.content.split("\n\n").map((paragraph, i) => (
                  <p
                    key={`${doc.id}-p-${i}`}
                    className="text-[14px] text-gray-300 mb-4 leading-relaxed max-w-prose"
                  >
                    {paragraph}
                  </p>
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
