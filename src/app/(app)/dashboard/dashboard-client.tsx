"use client";

import { useState } from "react";
import { DashboardChatPanel } from "@/components/chat/dashboard-chat-panel";
import { DeckViewer } from "@/components/deck/deck-viewer";

const MOCK_SLIDES = [
    `<div style="text-align:center; padding: 60px 40px;">
    <h1 style="font-size:2.5em; font-weight:900; margin-bottom:0.3em;">Your Startup Pitch</h1>
    <p style="font-size:1.2em; color:#666; margin-bottom:2em;">AI-Powered Innovation</p>
    <div style="width:80px; height:3px; background:#0047FF; margin:0 auto 2em;"></div>
    <p style="font-size:1em; color:#333;">Transforming the industry with intelligent automation</p>
  </div>`,

    `<div style="text-align:left; padding: 40px 60px;">
    <h2 style="font-size:2em; font-weight:800; margin-bottom:1em;">The Problem</h2>
    <ul style="font-size:1em; line-height:2; color:#333; list-style:none; padding:0;">
      <li>⚡ Manual processes consuming 40% of team productivity</li>
      <li>📉 Market fragmentation leading to missed opportunities</li>
      <li>🔍 Lack of data-driven decision making</li>
    </ul>
  </div>`,

    `<div style="text-align:left; padding: 40px 60px;">
    <h2 style="font-size:2em; font-weight:800; margin-bottom:1em;">Our Solution</h2>
    <p style="font-size:1em; color:#333; margin-bottom:1.5em;">An end-to-end platform that automates the mundane and amplifies creativity.</p>
    <div style="display:flex; gap:20px; flex-wrap:wrap;">
      <div style="flex:1; min-width:200px; padding:20px; background:#f5f5f5;">
        <h3 style="font-weight:700; margin-bottom:0.5em;">Smart Algorithms</h3>
        <p style="font-size:0.9em; color:#666;">AI that learns and adapts to your workflow</p>
      </div>
      <div style="flex:1; min-width:200px; padding:20px; background:#f5f5f5;">
        <h3 style="font-weight:700; margin-bottom:0.5em;">Easy Integration</h3>
        <p style="font-size:0.9em; color:#666;">Connect with 100+ tools in minutes</p>
      </div>
    </div>
  </div>`,

    `<div style="text-align:left; padding: 40px 60px;">
    <h2 style="font-size:2em; font-weight:800; margin-bottom:1em;">Market Opportunity</h2>
    <div style="display:flex; gap:40px; margin-top:1em;">
      <div style="text-align:center;">
        <p style="font-size:2.5em; font-weight:900; color:#0047FF;">$50B</p>
        <p style="font-size:0.85em; color:#666;">Total Addressable Market</p>
      </div>
      <div style="text-align:center;">
        <p style="font-size:2.5em; font-weight:900; color:#0047FF;">$10B</p>
        <p style="font-size:0.85em; color:#666;">Serviceable Market</p>
      </div>
      <div style="text-align:center;">
        <p style="font-size:2.5em; font-weight:900; color:#0047FF;">5%</p>
        <p style="font-size:0.85em; color:#666;">Year 1 Target</p>
      </div>
    </div>
  </div>`,

    `<div style="text-align:center; padding: 60px 40px;">
    <h2 style="font-size:2em; font-weight:800; margin-bottom:1em;">Revenue Model</h2>
    <div style="display:flex; gap:20px; justify-content:center; flex-wrap:wrap; margin-top:1.5em;">
      <div style="padding:30px 40px; background:#f5f5f5; min-width:180px;">
        <p style="font-size:0.8em; color:#666; text-transform:uppercase; letter-spacing:0.1em;">Basic</p>
        <p style="font-size:2em; font-weight:900;">$29<span style="font-size:0.4em; color:#999;">/mo</span></p>
      </div>
      <div style="padding:30px 40px; background:#000; color:#fff; min-width:180px;">
        <p style="font-size:0.8em; color:#aaa; text-transform:uppercase; letter-spacing:0.1em;">Pro</p>
        <p style="font-size:2em; font-weight:900;">$99<span style="font-size:0.4em; color:#666;">/mo</span></p>
      </div>
      <div style="padding:30px 40px; background:#f5f5f5; min-width:180px;">
        <p style="font-size:0.8em; color:#666; text-transform:uppercase; letter-spacing:0.1em;">Enterprise</p>
        <p style="font-size:2em; font-weight:900;">Custom</p>
      </div>
    </div>
  </div>`,
];

export function DashboardClient() {
    const [isPitchdeckView, setIsPitchdeckView] = useState(false);
    const [isDeckReady, setIsDeckReady] = useState(false);

    const handleDeckReady = () => {
        setIsDeckReady(true);
    };

    return (
        <div className="flex flex-col h-full">
            {/* Top bar with switch */}
            <div className="flex justify-between items-center px-8 lg:px-12 py-4 border-b hairline bg-white flex-shrink-0">
                <div>
                    <h1 className="text-[20px] font-black uppercase tracking-tight">
                        {isPitchdeckView ? "Pitchdeck" : "Dashboard"}
                    </h1>
                    <p className="text-[13px] text-gray-300 mt-0.5 leading-relaxed">
                        {isPitchdeckView
                            ? "Review and refine your generated pitchdeck."
                            : "Chat with the agent to create your pitch."}
                    </p>
                </div>

                <button
                    onClick={() => setIsPitchdeckView(!isPitchdeckView)}
                    className="group relative flex items-center gap-3 px-5 py-2.5 border border-black text-[11px] font-bold uppercase tracking-[0.08em] hover:bg-black hover:text-white transition-colors duration-200"
                >
                    <span className="relative flex h-2 w-2">
                        <span className="animate-ping absolute inline-flex h-full w-full bg-accent opacity-75" style={{ borderRadius: '50%' }} />
                        <span className="relative inline-flex h-2 w-2 bg-accent" style={{ borderRadius: '50%' }} />
                    </span>
                    {isPitchdeckView ? "Chat" : "Pitchdeck"}
                </button>
            </div>

            {/* Main content */}
            <div className="flex-1 overflow-hidden">
                {isPitchdeckView ? (
                    <div className="h-full w-full bg-[#fafafa] p-6 lg:p-10">
                        <div className="h-full max-w-[1200px] mx-auto border hairline shadow-sm bg-white overflow-hidden">
                            <DeckViewer slides={MOCK_SLIDES} />
                        </div>
                    </div>
                ) : (
                    <div className="h-full w-full">
                        <DashboardChatPanel onDeckReady={handleDeckReady} />
                    </div>
                )}
            </div>
        </div>
    );
}
