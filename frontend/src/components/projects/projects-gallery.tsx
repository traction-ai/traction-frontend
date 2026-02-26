"use client";

import Link from "next/link";
import { useState } from "react";
import type { Project } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

type SortOption = "recent" | "name" | "status";
type FilterStatus = "all" | "generating" | "draft" | "finalized" | "shared";

interface ProjectsGalleryProps {
    projects: Project[];
}

export function ProjectsGallery({ projects }: ProjectsGalleryProps) {
    const [sort, setSort] = useState<SortOption>("recent");
    const [filter, setFilter] = useState<FilterStatus>("all");

    const filtered =
        filter === "all" ? projects : projects.filter((p) => p.status === filter);

    const sorted = [...filtered].sort((a, b) => {
        if (sort === "recent")
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        if (sort === "name") return a.name.localeCompare(b.name);
        return a.status.localeCompare(b.status);
    });

    const statusCounts = projects.reduce(
        (acc, p) => {
            acc[p.status] = (acc[p.status] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>
    );

    return (
        <div style={{ padding: "clamp(32px, 4vw, 64px) clamp(32px, 4vw, 64px)" }}>
            {/* Header row */}
            <div className="animate-fade-up">
                <div className="flex items-start justify-between" style={{ gap: "clamp(24px, 3vw, 48px)" }}>
                    <div>
                        <p className="swiss-label text-gray-200" style={{ marginBottom: "12px" }}>
                            Portfolio
                        </p>
                        <h1 className="text-display font-black uppercase tracking-tight leading-none">
                            Projects
                        </h1>
                    </div>

                    <div className="hidden md:flex items-start pt-1" style={{ gap: "clamp(32px, 4vw, 56px)" }}>
                        <div>
                            <p className="text-[36px] font-black leading-none">{projects.length}</p>
                            <p className="swiss-label text-gray-200" style={{ marginTop: "6px" }}>Total</p>
                        </div>
                        <div>
                            <p className="text-[36px] font-black leading-none">
                                {statusCounts["shared"] || 0}
                            </p>
                            <p className="swiss-label text-gray-200" style={{ marginTop: "6px" }}>Shared</p>
                        </div>
                    </div>
                </div>

                <p
                    className="text-body-lg text-gray-300 max-w-[560px] leading-relaxed"
                    style={{ marginTop: "16px" }}
                >
                    All your pitch decks in one place. Click a project to open its
                    workspace.
                </p>
            </div>

            {/* Filter + Sort bar */}
            <div
                className="flex flex-wrap items-center justify-between animate-fade-up delay-1"
                style={{ marginTop: "clamp(28px, 3vw, 48px)", gap: "16px" }}
            >
                <div className="flex items-center" style={{ gap: "8px" }}>
                    {(
                        [
                            { value: "all", label: "All" },
                            { value: "draft", label: "Draft" },
                            { value: "finalized", label: "Finalized" },
                            { value: "shared", label: "Shared" },
                            { value: "generating", label: "Generating" },
                        ] as { value: FilterStatus; label: string }[]
                    ).map((f) => (
                        <button
                            key={f.value}
                            onClick={() => setFilter(f.value)}
                            className={`text-[12px] font-bold uppercase tracking-[0.08em] border transition-colors duration-200 ${filter === f.value
                                ? "bg-black text-white border-black"
                                : "bg-white text-gray-300 border-gray-100 hover:border-black hover:text-black"
                                }`}
                            style={{ padding: "10px 18px" }}
                        >
                            {f.label}
                            {f.value !== "all" && statusCounts[f.value]
                                ? ` (${statusCounts[f.value]})`
                                : ""}
                        </button>
                    ))}
                </div>

                <div className="flex items-center" style={{ gap: "16px" }}>
                    <span className="swiss-label text-gray-200">Sort</span>
                    {(
                        [
                            { value: "recent", label: "Recent" },
                            { value: "name", label: "Name" },
                            { value: "status", label: "Status" },
                        ] as { value: SortOption; label: string }[]
                    ).map((s) => (
                        <button
                            key={s.value}
                            onClick={() => setSort(s.value)}
                            className={`text-[12px] font-bold uppercase tracking-[0.08em] transition-colors duration-200 ${sort === s.value ? "text-black" : "text-gray-200 hover:text-black"
                                }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* Hairline */}
            <div
                className="border-t hairline animate-fade-up delay-2"
                style={{ margin: "20px 0 clamp(28px, 3vw, 48px)" }}
            />

            {/* Projects Grid */}
            <div
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 animate-fade-up delay-3"
                style={{ columnGap: "clamp(20px, 2.5vw, 40px)", rowGap: "clamp(32px, 4vw, 56px)" }}
            >
                {/* New Project card */}
                <Link href="/dashboard" className="group block">
                    <div className="aspect-[4/3] bg-[#f5f5f5] border border-dashed border-gray-100 flex flex-col items-center justify-center transition-all duration-300 group-hover:border-black group-hover:bg-[#fafafa]">
                        <span className="text-[44px] font-extralight text-gray-100 group-hover:text-black transition-colors duration-300 leading-none">
                            +
                        </span>
                        <span className="swiss-label text-gray-200 group-hover:text-black transition-colors duration-300" style={{ marginTop: "16px" }}>
                            New Pitch
                        </span>
                    </div>
                    <div className="flex items-center justify-between" style={{ marginTop: "16px" }}>
                        <p className="text-[14px] font-bold text-gray-200 group-hover:text-black transition-colors duration-300">
                            Create Project
                        </p>
                        <span className="text-[12px] text-gray-200">&mdash;</span>
                    </div>
                </Link>

                {/* Project cards */}
                {sorted.map((project, i) => (
                    <Link
                        key={project.id}
                        href={`/projects/${project.id}`}
                        className="group block"
                        style={{ animationDelay: `${0.35 + i * 0.08}s` }}
                    >
                        <div className="aspect-[4/3] bg-[#f2f2f2] border border-gray-100 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-black relative">
                            <div
                                className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
                                style={{
                                    backgroundImage: `repeating-linear-gradient(${45 + parseInt(project.id.replace(/\D/g, "")) * 30}deg, #000 0px, #000 1px, transparent 1px, transparent ${12 + parseInt(project.id.replace(/\D/g, "")) * 4}px)`,
                                }}
                            />
                            <div className="relative z-10 flex flex-col items-center">
                                <span className="text-[32px] font-black text-gray-100 group-hover:text-black transition-colors duration-300 leading-none">
                                    {project.fullHtml ? "FULL" : project.slidesHtml.length}
                                </span>
                                <span className="text-[11px] font-mono text-gray-200 uppercase tracking-widest" style={{ marginTop: "6px" }}>
                                    {project.fullHtml ? "html" : "slides"}
                                </span>
                            </div>

                            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Badge variant={project.status}>{project.status}</Badge>
                            </div>
                        </div>

                        <div className="flex items-start justify-between" style={{ marginTop: "16px", gap: "16px" }}>
                            <div className="min-w-0 flex-1">
                                <p className="text-[15px] font-bold text-black truncate leading-tight">
                                    {project.name}
                                </p>
                                <p className="text-[12px] text-gray-200 truncate" style={{ marginTop: "6px" }}>
                                    {project.prompt.length > 60
                                        ? project.prompt.slice(0, 60) + "\u2026"
                                        : project.prompt}
                                </p>
                            </div>
                            <span className="text-[11px] text-gray-200 flex-shrink-0 pt-[2px] font-mono">
                                {formatDate(project.updatedAt)}
                            </span>
                        </div>
                    </Link>
                ))}
            </div>

            {/* Empty state */}
            {sorted.length === 0 && (
                <div className="text-center animate-fade-in" style={{ padding: "80px 0" }}>
                    <p className="text-heading-sm font-bold uppercase">No projects found</p>
                    <p className="text-body text-gray-300" style={{ marginTop: "12px" }}>
                        {filter !== "all"
                            ? `No ${filter} projects. Try a different filter.`
                            : "Create your first pitch deck to get started."}
                    </p>
                </div>
            )}

            {/* Bottom info bar */}
            <div
                className="border-t hairline flex items-center justify-between animate-fade-up delay-4"
                style={{ marginTop: "clamp(40px, 5vw, 72px)", paddingTop: "20px" }}
            >
                <p className="text-[12px] text-gray-200">
                    Showing {sorted.length} of {projects.length} projects
                </p>
                <p className="text-[12px] text-gray-200 font-mono">
                    TRACTION<span className="text-accent">.</span>
                </p>
            </div>
        </div>
    );
}
