"use client";

import { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

interface SlideStripProps {
  slideCount: number;
  activeIndex: number;
  onSelect: (index: number) => void;
}

export function SlideStrip({
  slideCount,
  activeIndex,
  onSelect,
}: SlideStripProps) {
  const scrollRef = useRef<HTMLDivElement>(null);

  const handleSelect = useCallback(
    (index: number) => {
      onSelect(index);
    },
    [onSelect]
  );

  return (
    <div
      ref={scrollRef}
      className="flex gap-2 overflow-x-auto py-4 px-5 border-t hairline bg-white"
      role="tablist"
      aria-label="Slides"
    >
      {Array.from({ length: slideCount }, (_, i) => (
        <button
          key={`strip-${i}`}
          role="tab"
          aria-selected={activeIndex === i}
          onClick={() => handleSelect(i)}
          className={cn(
            "flex-shrink-0 w-24 h-14 flex items-center justify-center text-[11px] font-mono border",
            activeIndex === i
              ? "border-2 border-black text-black font-bold"
              : "border-gray-100 text-gray-200 hover:border-black hover:text-black"
          )}
        >
          {i + 1}
        </button>
      ))}
    </div>
  );
}
