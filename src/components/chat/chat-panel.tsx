"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { ChatMessage as ChatMessageType } from "@/types";
import { ChatMessage } from "./chat-message";
import { ChatInput } from "./chat-input";

const MOCK_RESPONSES = [
  "I've updated the slide to reflect your feedback. The changes should be visible now.",
  "Good suggestion. I've adjusted the content and formatting accordingly.",
  "I've made that change. Would you like me to modify anything else?",
  "Done. The document has been updated with the new information.",
  "I've refined the section based on your input. Let me know if it looks right.",
];

interface ChatPanelProps {
  initialMessages: ChatMessageType[];
  projectId: string;
}

export function ChatPanel({ initialMessages, projectId }: ChatPanelProps) {
  const [messages, setMessages] =
    useState<ChatMessageType[]>(initialMessages);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isTyping]);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSend = useCallback(
    (content: string) => {
      const userMessage: ChatMessageType = {
        id: `msg-${Date.now()}`,
        projectId,
        role: "user",
        content,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      timeoutRef.current = setTimeout(() => {
        const aiResponse: ChatMessageType = {
          id: `msg-${Date.now() + 1}`,
          projectId,
          role: "assistant",
          content:
            MOCK_RESPONSES[
              Math.floor(Math.random() * MOCK_RESPONSES.length)
            ],
          createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, aiResponse]);
        setIsTyping(false);
      }, 1500);
    },
    [projectId]
  );

  return (
    <div className="flex flex-col h-full">
      {/* Agent header — generous */}
      <div
        className="flex-shrink-0 border-b hairline bg-[#fafafa]"
        style={{ padding: "clamp(20px, 2.5vw, 32px) clamp(24px, 3vw, 36px)" }}
      >
        <div className="flex items-center" style={{ gap: "18px" }}>
          <div
            className="flex items-center justify-center bg-black text-white text-[14px] font-bold flex-shrink-0"
            style={{ width: "44px", height: "44px" }}
          >
            T
          </div>
          <div>
            <p className="font-bold uppercase tracking-[0.08em]" style={{ fontSize: "15px" }}>
              Traction Agent
            </p>
            <p
              className="text-[12px] text-green-600 flex items-center"
              style={{ gap: "8px", marginTop: "6px" }}
            >
              <span
                className="inline-block bg-green-500 flex-shrink-0"
                style={{ width: "8px", height: "8px" }}
              />
              Online
            </p>
          </div>
        </div>
      </div>

      {/* Messages — generous padding */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
        style={{ padding: "clamp(28px, 3vw, 48px) clamp(24px, 3vw, 36px)" }}
      >
        <div className="flex flex-col" style={{ gap: "clamp(24px, 3vw, 40px)" }}>
          {messages.map((msg) => (
            <ChatMessage key={msg.id} message={msg} />
          ))}

          {isTyping && (
            <div className="flex justify-start" style={{ paddingLeft: "62px" }}>
              <div
                className="bg-[#f2f2f2]"
                style={{ padding: "22px 28px" }}
              >
                <div className="flex" style={{ gap: "10px" }}>
                  <span
                    className="bg-gray-200 animate-pulse"
                    style={{ width: "9px", height: "9px" }}
                  />
                  <span
                    className="bg-gray-200 animate-pulse"
                    style={{ width: "9px", height: "9px", animationDelay: "0.2s" }}
                  />
                  <span
                    className="bg-gray-200 animate-pulse"
                    style={{ width: "9px", height: "9px", animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input */}
      <div className="border-t hairline flex-shrink-0">
        <div style={{ padding: "0 clamp(24px, 3vw, 36px)" }}>
          <ChatInput onSubmit={handleSend} disabled={isTyping} />
        </div>
      </div>
    </div>
  );
}
