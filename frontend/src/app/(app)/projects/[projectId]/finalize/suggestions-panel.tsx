"use client";

import { useState } from "react";
import type { AiSuggestion } from "@/types";
import { Badge } from "@/components/ui/badge";

interface SuggestionsPanelProps {
  suggestions: AiSuggestion[];
}

export function SuggestionsPanel({ suggestions }: SuggestionsPanelProps) {
  const [items, setItems] = useState<AiSuggestion[]>(suggestions);

  function updateStatus(id: string, status: "applied" | "dismissed") {
    setItems((prev) =>
      prev.map((s) => (s.id === id ? { ...s, status } : s))
    );
  }

  if (items.length === 0) {
    return (
      <p className="text-[15px] text-gray-200">No suggestions available.</p>
    );
  }

  return (
    <ul>
      {items.map((suggestion) => (
        <li
          key={suggestion.id}
          className="border-b hairline first:pt-0 last:border-b-0"
          style={{ padding: "clamp(18px, 2vw, 28px) 0" }}
        >
          <p
            className="leading-relaxed"
            style={{ fontSize: "15px", lineHeight: "1.8" }}
          >
            {suggestion.description}
          </p>

          {suggestion.status === "pending" ? (
            <div className="flex" style={{ gap: "24px", marginTop: "16px" }}>
              <button
                type="button"
                className="text-[12px] font-bold uppercase tracking-[0.08em] text-black hover:text-accent transition-colors"
                onClick={() => updateStatus(suggestion.id, "applied")}
              >
                Apply
              </button>
              <button
                type="button"
                className="text-[12px] font-bold uppercase tracking-[0.08em] text-gray-200 hover:text-black transition-colors"
                onClick={() => updateStatus(suggestion.id, "dismissed")}
              >
                Dismiss
              </button>
            </div>
          ) : (
            <div style={{ marginTop: "14px" }}>
              <Badge variant={suggestion.status}>{suggestion.status}</Badge>
            </div>
          )}
        </li>
      ))}
    </ul>
  );
}
