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
      className="w-8 h-8 bg-black text-white flex items-center justify-center text-[11px] font-black flex-shrink-0"
      style={{ borderRadius: "50%" }}
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
      className={`flex gap-3 items-start ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {!isUser && <AgentAvatar />}
      <div
        className={`max-w-[75%] px-5 py-4 ${isUser
            ? "bg-black text-white"
            : "bg-[#f4f4f5] text-black border hairline"
          }`}
      >
        <p className="text-[14px] leading-[1.7] whitespace-pre-wrap">
          {message.content}
        </p>
        <time
          className={`block text-[10px] mt-2 ${isUser ? "text-white/40" : "text-gray-200"
            }`}
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
        "Hey there! 👋 I'm your Traction pitchdeck assistant. Tell me about your startup or business idea and I'll help you craft a compelling pitch.",
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
            "That sounds exciting! To build a strong pitchdeck, I'll need a few more details.\n\nCould you tell me about:\n• Your target audience\n• Revenue model\n• Market size estimate\n• Key competitive advantages";
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

        // If step 3, simulate generation time then finalize
        if (nextStep === 3) {
          setIsTyping(true);
          setTimeout(() => {
            const finalResponse: ChatMessageType = {
              id: `msg-${Date.now() + 2}`,
              projectId: "new",
              role: "assistant",
              content:
                "✅ Your pitchdeck is ready! Click the \"Pitchdeck\" button in the top-right corner to view it.",
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
      {/* Chat header */}
      <div className="px-8 py-4 border-b hairline flex items-center gap-3 flex-shrink-0">
        <AgentAvatar />
        <div>
          <p className="text-[13px] font-bold uppercase tracking-[0.06em]">
            Traction Agent
          </p>
          <p className="text-[11px] text-gray-200 flex items-center gap-1.5">
            <span
              className="w-1.5 h-1.5 bg-green-500 inline-block"
              style={{ borderRadius: "50%" }}
            />
            Online
          </p>
        </div>
      </div>

      {/* Messages */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-6 md:px-10 lg:px-16 py-8 space-y-6"
      >
        {messages.map((msg) => (
          <MessageBubble key={msg.id} message={msg} />
        ))}

        {isTyping && (
          <div className="flex gap-3 items-start">
            <AgentAvatar />
            <div className="px-5 py-4 bg-[#f4f4f5] border hairline">
              <div className="flex gap-1.5 py-1">
                <span className="w-2 h-2 bg-gray-300 animate-pulse" style={{ borderRadius: "50%" }} />
                <span
                  className="w-2 h-2 bg-gray-300 animate-pulse"
                  style={{ animationDelay: "0.2s", borderRadius: "50%" }}
                />
                <span
                  className="w-2 h-2 bg-gray-300 animate-pulse"
                  style={{ animationDelay: "0.4s", borderRadius: "50%" }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Input */}
      <div className="border-t hairline bg-white flex-shrink-0">
        <div className="px-6 md:px-10 lg:px-16">
          <ChatInput
            onSubmit={handleSend}
            disabled={isTyping || flowStep === 4}
            placeholder={
              flowStep === 4
                ? "Pitchdeck complete — switch to view it →"
                : "Type your message..."
            }
          />
        </div>
      </div>
    </div>
  );
}
