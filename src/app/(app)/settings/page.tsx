"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";

export default function SettingsPage() {
  const [name, setName] = useState("Alex Chen");
  const [exportFormat, setExportFormat] = useState("pptx");

  return (
    <div style={{ padding: "clamp(32px, 4vw, 64px) clamp(32px, 4vw, 64px)" }}>
      {/* Header */}
      <div className="animate-fade-up">
        <p className="swiss-label text-gray-200" style={{ marginBottom: "12px" }}>
          Account
        </p>
        <h1 className="text-display font-black uppercase tracking-tight leading-none">
          Settings
        </h1>
        <p
          className="text-body-lg text-gray-300 max-w-[560px] leading-relaxed"
          style={{ marginTop: "16px" }}
        >
          Manage your account and preferences.
        </p>
      </div>

      {/* Content — two column on desktop */}
      <div className="max-w-[720px]">
        {/* Profile section */}
        <section className="animate-fade-up delay-1" style={{ marginTop: "clamp(40px, 5vw, 72px)" }}>
          <div className="flex items-center" style={{ gap: "16px", marginBottom: "clamp(24px, 3vw, 40px)" }}>
            <h2 className="swiss-label text-gray-300 flex-shrink-0">Profile</h2>
            <div className="flex-1 border-t hairline-dark" />
          </div>

          <div className="flex flex-col" style={{ gap: "clamp(24px, 3vw, 36px)" }}>
            <Input
              label="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <Input label="Email" value="alex@example.com" disabled />
          </div>

          <div style={{ marginTop: "clamp(24px, 3vw, 40px)" }}>
            <button
              className="group inline-flex items-center border border-black text-black font-bold uppercase tracking-[0.12em] hover:bg-black hover:text-white transition-colors"
              style={{ padding: "16px 32px", fontSize: "13px" }}
            >
              Update Profile
              <span
                className="inline-block ml-5 transition-transform group-hover:translate-x-1"
                style={{ fontSize: "18px" }}
              >
                &rarr;
              </span>
            </button>
          </div>
        </section>

        {/* Preferences section */}
        <section className="animate-fade-up delay-2" style={{ marginTop: "clamp(48px, 6vw, 80px)" }}>
          <div className="flex items-center" style={{ gap: "16px", marginBottom: "clamp(24px, 3vw, 40px)" }}>
            <h2 className="swiss-label text-gray-300 flex-shrink-0">Preferences</h2>
            <div className="flex-1 border-t hairline-dark" />
          </div>

          <div>
            <label
              className="block text-[12px] font-bold uppercase tracking-[0.14em] text-black"
              style={{ marginBottom: "12px" }}
            >
              Default Export Format
            </label>
            <select
              value={exportFormat}
              onChange={(e) => setExportFormat(e.target.value)}
              className="block w-full border-b-2 border-gray-100 bg-transparent text-[17px] focus:outline-none focus:border-black transition-colors"
              style={{ padding: "16px 0" }}
            >
              <option value="pptx">PowerPoint (.pptx)</option>
              <option value="pdf">PDF (.pdf)</option>
              <option value="html">HTML (.html)</option>
            </select>
          </div>
        </section>

        {/* Danger Zone */}
        <section className="animate-fade-up delay-3" style={{ marginTop: "clamp(48px, 6vw, 80px)" }}>
          <div className="flex items-center" style={{ gap: "16px", marginBottom: "clamp(24px, 3vw, 40px)" }}>
            <h2 className="swiss-label text-red-600 flex-shrink-0">Danger Zone</h2>
            <div className="flex-1 border-t border-red-600/30" />
          </div>

          <p className="text-body text-gray-300">
            Once you delete your account, there is no going back.
          </p>

          <div style={{ marginTop: "clamp(20px, 2.5vw, 32px)" }}>
            <button
              className="inline-flex items-center border border-red-600/30 text-red-600 font-bold uppercase tracking-[0.12em] hover:bg-red-600 hover:text-white transition-colors"
              style={{ padding: "16px 32px", fontSize: "13px" }}
            >
              Delete Account
            </button>
          </div>
        </section>
      </div>

      {/* Bottom bar */}
      <div
        className="border-t hairline flex items-center justify-between animate-fade-up delay-4 max-w-[720px]"
        style={{ marginTop: "clamp(48px, 6vw, 96px)", paddingTop: "20px" }}
      >
        <p className="text-[12px] text-gray-200">
          Account settings
        </p>
        <p className="text-[12px] text-gray-200 font-mono">
          TRACTION<span className="text-accent">.</span>
        </p>
      </div>
    </div>
  );
}
