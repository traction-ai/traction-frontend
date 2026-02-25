"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";

export function PromptInput() {
  const router = useRouter();
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (!value.trim()) return;
      router.push("/projects/proj-1");
    },
    [value, router]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="border border-gray-100 hover:border-black focus-within:border-black transition-colors bg-[#fafafa]"
      style={{ padding: "clamp(24px, 3vw, 40px)" }}
    >
      <input
        type="text"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder="e.g. A fintech app for cross-border payments..."
        className="w-full bg-transparent text-[17px] placeholder:text-gray-200 focus:outline-none"
        style={{ padding: "0 0 20px 0" }}
      />
      <div className="border-t hairline" style={{ paddingTop: "20px" }}>
        <div className="flex items-center justify-between">
          <p className="text-[12px] text-gray-200">
            Describe your startup idea and we&apos;ll generate everything.
          </p>
          <button
            type="submit"
            disabled={!value.trim()}
            className="group inline-flex items-center bg-black text-white font-bold uppercase tracking-[0.12em] disabled:opacity-15 hover:bg-accent transition-colors flex-shrink-0"
            style={{ padding: "14px 28px", fontSize: "12px" }}
          >
            Initialize
            <span
              className="inline-block ml-3 transition-transform group-hover:translate-x-1"
              style={{ fontSize: "16px" }}
            >
              &rarr;
            </span>
          </button>
        </div>
      </div>
    </form>
  );
}
