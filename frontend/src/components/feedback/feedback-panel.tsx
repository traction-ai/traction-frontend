"use client";

import { useState, useCallback } from "react";
import type { Feedback } from "@/types";
import { FeedbackItem } from "./feedback-item";

interface FeedbackPanelProps {
  initialFeedback: Feedback[];
}

export function FeedbackPanel({ initialFeedback }: FeedbackPanelProps) {
  const [feedbackItems, setFeedbackItems] =
    useState<Feedback[]>(initialFeedback);

  const handleApply = useCallback((id: string) => {
    setFeedbackItems((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              status: "applied" as const,
              resolution: "Change applied by AI.",
            }
          : item
      )
    );
  }, []);

  const handleDismiss = useCallback((id: string) => {
    setFeedbackItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, status: "dismissed" as const } : item
      )
    );
  }, []);

  return (
    <div className="h-full flex flex-col">
      <div className="px-5 py-4 border-b hairline">
        <h3 className="swiss-label text-gray-200">Review Feedback</h3>
      </div>

      <div className="flex-1 overflow-y-auto">
        {feedbackItems.length > 0 ? (
          feedbackItems.map((item) => (
            <FeedbackItem
              key={item.id}
              feedback={item}
              onApply={handleApply}
              onDismiss={handleDismiss}
            />
          ))
        ) : (
          <div className="px-5 py-12 text-center">
            <p className="text-[13px] text-gray-200">No feedback yet.</p>
            <p className="text-[11px] text-gray-200 mt-2">
              Select content on a slide to leave feedback.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
