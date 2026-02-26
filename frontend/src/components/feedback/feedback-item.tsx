import { Badge } from "@/components/ui/badge";
import { truncate } from "@/lib/utils";
import type { Feedback } from "@/types";

interface FeedbackItemProps {
  feedback: Feedback;
  onApply?: (id: string) => void;
  onDismiss?: (id: string) => void;
}

export function FeedbackItem({
  feedback,
  onApply,
  onDismiss,
}: FeedbackItemProps) {
  return (
    <div className="px-5 py-4 border-b hairline last:border-b-0">
      {feedback.selectedText && (
        <div className="bg-[#f7f7f7] px-4 py-3 mb-3">
          <p className="text-[11px] text-gray-300 italic">
            &ldquo;{truncate(feedback.selectedText, 100)}&rdquo;
          </p>
        </div>
      )}

      <p className="text-[13px]">{feedback.userComment}</p>

      {feedback.resolution && feedback.status === "applied" && (
        <p className="text-[11px] text-gray-300 mt-2">
          Resolution: {feedback.resolution}
        </p>
      )}

      <div className="flex items-center gap-3 mt-3">
        <Badge variant={feedback.status}>{feedback.status}</Badge>

        {feedback.status === "pending" && (
          <div className="flex gap-4 ml-auto">
            <button
              onClick={() => onApply?.(feedback.id)}
              className="text-[11px] font-bold uppercase tracking-[0.08em] text-black hover:underline underline-offset-2"
            >
              Apply
            </button>
            <button
              onClick={() => onDismiss?.(feedback.id)}
              className="text-[11px] font-bold uppercase tracking-[0.08em] text-gray-200 hover:underline underline-offset-2"
            >
              Dismiss
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
