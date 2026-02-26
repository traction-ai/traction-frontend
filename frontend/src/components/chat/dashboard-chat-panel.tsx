"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import type { ChatMessage as ChatMessageType } from "@/types";
import { ChatInput } from "./chat-input";

interface DashboardChatPanelProps {
  onDeckReady: () => void;
}

function AgentAvatar() {
  return (
    <div
      className="flex items-center justify-center bg-black text-white text-[14px] font-black flex-shrink-0"
      style={{ width: "48px", height: "48px" }}
    >
      T
    </div>
  );
}

function MessageBubble({
  message,
}: {
  message: ChatMessageType;
}) {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex items-start ${isUser ? "flex-row-reverse" : "flex-row"}`}
      style={{ gap: "20px" }}
    >
      {!isUser && <AgentAvatar />}
      <div
        className={`max-w-[75%] ${isUser
            ? "bg-accent/[0.06] border border-accent/20 text-black"
            : "bg-[#f4f4f5] text-black border hairline"
          }`}
        style={{ padding: "clamp(20px, 2.5vw, 32px) clamp(24px, 3vw, 36px)" }}
      >
        <p
          className="whitespace-pre-wrap"
          style={{ fontSize: "16px", lineHeight: "1.8" }}
        >
          {message.content}
        </p>
        <time
          className={`block text-[12px] ${isUser ? "text-accent/40" : "text-gray-200"
            }`}
          style={{ marginTop: "16px" }}
        >
          {new Date(message.createdAt).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
          })}
        </time>
      </div>
    </div>
  );
}

export function DashboardChatPanel({ onDeckReady }: DashboardChatPanelProps) {
  const [messages, setMessages] = useState<ChatMessageType[]>([
    {
      id: "msg-init",
      projectId: "new",
      role: "assistant",
      content:
        "Hey there! I'm your Traction pitchdeck assistant. Tell me about your startup or business idea and I'll help you craft a compelling pitch.",
      createdAt: new Date().toISOString(),
    },
  ]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 0: Ask idea, 1: Ask criteria, 2: Ask to make deck, 3: Generating deck, 4: Done
  const [flowStep, setFlowStep] = useState(0);

  useEffect(() => {
    const container = scrollRef.current;
    if (container) {
      container.scrollTop = container.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = useCallback(
    (content: string) => {
      const userMessage: ChatMessageType = {
        id: `msg-${Date.now()}`,
        projectId: "new",
        role: "user",
        content,
        createdAt: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsTyping(true);

      setTimeout(() => {
        let aiResponseContent = "";
        let nextStep = flowStep;

        if (flowStep === 0) {
          aiResponseContent =
            "That sounds exciting! To build a strong pitchdeck, I'll need a few more details.\n\nCould you tell me about:\n\n- Your target audience\n- Revenue model\n- Market size estimate\n- Key competitive advantages";
          nextStep = 1;
        } else if (flowStep === 1) {
          aiResponseContent =
            "Perfect, I have everything I need. Shall I go ahead and generate your pitchdeck now?";
          nextStep = 2;
        } else if (flowStep === 2) {
          aiResponseContent =
            "Great — generating your pitchdeck now. This will just take a moment...";
          nextStep = 3;
        }

        const aiResponse: ChatMessageType = {
          id: `msg-${Date.now() + 1}`,
          projectId: "new",
          role: "assistant",
          content: aiResponseContent,
          createdAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, aiResponse]);
        setFlowStep(nextStep);
        setIsTyping(false);

        if (nextStep === 3) {
          setIsTyping(true);
          setTimeout(() => {
            const finalResponse: ChatMessageType = {
              id: `msg-${Date.now() + 2}`,
              projectId: "new",
              role: "assistant",
              content:
                "Your pitchdeck is ready! Click the \"Pitchdeck\" button in the top-right corner to view it.",
              createdAt: new Date().toISOString(),
            };
            setMessages((prev) => [...prev, finalResponse]);
            setFlowStep(4);
            setIsTyping(false);
            onDeckReady();
          }, 2500);
        }
      }, 1200);
    },
    [flowStep, onDeckReady]
  );

  return (
    <div className="flex flex-col h-full bg-white">
      {/* Chat header — generous spacing */}
      <div
        className="border-b hairline flex items-center flex-shrink-0 bg-[#fafafa]"
        style={{
          padding: "clamp(20px, 2.5vw, 36px) clamp(32px, 4vw, 64px)",
          gap: "20px",
        }}
      >
        <AgentAvatar />
        <div>
          <p
            className="font-bold uppercase tracking-[0.08em]"
            style={{ fontSize: "16px" }}
          >
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

      {/* Messages — generous padding */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto"
        style={{
          padding: "clamp(32px, 4vw, 56px) clamp(32px, 4vw, 64px)",
        }}
      >
        <div className="flex flex-col" style={{ gap: "clamp(28px, 3vw, 44px)" }}>
          {messages.map((msg) => (
            <MessageBubble key={msg.id} message={msg} />
          ))}

          {isTyping && (
            <div className="flex items-start" style={{ gap: "20px" }}>
              <AgentAvatar />
              <div
                className="bg-[#f4f4f5] border hairline"
                style={{ padding: "24px 32px" }}
              >
                <div className="flex" style={{ gap: "10px" }}>
                  <span
                    className="bg-gray-300 animate-pulse"
                    style={{ width: "10px", height: "10px" }}
                  />
                  <span
                    className="bg-gray-300 animate-pulse"
                    style={{ width: "10px", height: "10px", animationDelay: "0.2s" }}
                  />
                  <span
                    className="bg-gray-300 animate-pulse"
                    style={{ width: "10px", height: "10px", animationDelay: "0.4s" }}
                  />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Input — generous padding */}
      <div className="border-t hairline bg-white flex-shrink-0">
        <div style={{ padding: "0 clamp(32px, 4vw, 64px)" }}>
          <ChatInput
            onSubmit={handleSend}
            disabled={isTyping || flowStep === 4}
            placeholder={
              flowStep === 4
                ? "Pitchdeck complete — switch to view it"
                : "Type your message..."
            }
          />
        </div>
      </div>
    </div>
  );
}
