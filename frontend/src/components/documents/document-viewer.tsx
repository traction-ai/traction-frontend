"use client";

import { Modal } from "@/components/ui/modal";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";
import type { ProjectDocument } from "@/types";

interface DocumentViewerProps {
  document: ProjectDocument | null;
  open: boolean;
  onClose: () => void;
}

export function DocumentViewer({
  document,
  open,
  onClose,
}: DocumentViewerProps) {
  if (!document) return null;

  return (
    <Modal open={open} onClose={onClose} title={document.title}>
      <div className="flex items-center gap-4 mb-8">
        <Badge variant={document.status}>{document.status}</Badge>
        <span className="text-[11px] text-gray-200">
          Updated {formatDate(document.updatedAt)}
        </span>
      </div>

      <div>
        {document.content.split("\n\n").map((paragraph, i) => (
          <p
            key={`p-${i}`}
            className="text-[14px] text-gray-300 mb-5 leading-relaxed"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </Modal>
  );
}
