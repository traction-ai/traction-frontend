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

    /* ── Filtered + sorted list ── */
    const filtered =
        filter === "all" ? projects : projects.filter((p) => p.status === filter);

    const sorted = [...filtered].sort((a, b) => {
        if (sort === "recent")
            return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
        if (sort === "name") return a.name.localeCompare(b.name);
        return a.status.localeCompare(b.status);
    });

    /* ── Status counts for pills ── */
    const statusCounts = projects.reduce(
        (acc, p) => {
            acc[p.status] = (acc[p.status] || 0) + 1;
            return acc;
        },
        {} as Record<string, number>
    );

    return (
        <div className="px-8 lg:px-12 py-12 lg:py-16 max-w-[1400px]">
            {/* ── Header row ── */}
            <div className="animate-fade-up">
                <div className="flex items-start justify-between gap-8">
                    <div>
                        <p className="swiss-label text-gray-200 mb-3">Portfolio</p>
                        <h1 className="text-display font-black uppercase tracking-tight leading-none">
                            Projects
                        </h1>
                    </div>

                    {/* Meta counters – top right like the reference */}
                    <div className="hidden md:flex items-start gap-12 pt-1">
                        <div>
                            <p className="text-[32px] font-black leading-none">{projects.length}</p>
                            <p className="swiss-label text-gray-200 mt-1">Total</p>
                        </div>
                        <div>
                            <p className="text-[32px] font-black leading-none">
                                {statusCounts["shared"] || 0}
                            </p>
                            <p className="swiss-label text-gray-200 mt-1">Shared</p>
                        </div>
                    </div>
                </div>

                <p className="text-body text-gray-300 mt-4 max-w-[520px] leading-relaxed">
                    All your pitch decks in one place. Click a project to open its
                    workspace.
                </p>
            </div>

            {/* ── Filter + Sort bar ── */}
            <div className="mt-10 flex flex-wrap items-center justify-between gap-4 animate-fade-up delay-1">
                {/* Filter pills */}
                <div className="flex items-center gap-2">
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
                            className={`px-4 py-2 text-[11px] font-bold uppercase tracking-[0.08em] border transition-colors duration-200 ${filter === f.value
                                    ? "bg-black text-white border-black"
                                    : "bg-white text-gray-300 border-gray-100 hover:border-black hover:text-black"
                                }`}
                        >
                            {f.label}
                            {f.value !== "all" && statusCounts[f.value]
                                ? ` (${statusCounts[f.value]})`
                                : ""}
                        </button>
                    ))}
                </div>

                {/* Sort */}
                <div className="flex items-center gap-3">
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
                            className={`text-[11px] font-bold uppercase tracking-[0.08em] transition-colors duration-200 ${sort === s.value ? "text-black" : "text-gray-200 hover:text-black"
                                }`}
                        >
                            {s.label}
                        </button>
                    ))}
                </div>
            </div>

            {/* ── Hairline ── */}
            <div className="border-t hairline mt-6 mb-10 animate-fade-up delay-2" />

            {/* ── Projects Grid — 4 columns matching reference ── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10 animate-fade-up delay-3">
                {/* New Project card */}
                <Link
                    href="/dashboard"
                    className="group block"
                >
                    <div className="aspect-[4/3] bg-[#f5f5f5] border border-dashed border-gray-100 flex flex-col items-center justify-center transition-all duration-300 group-hover:border-black group-hover:bg-[#fafafa]">
                        <span className="text-[40px] font-extralight text-gray-100 group-hover:text-black transition-colors duration-300 leading-none">
                            +
                        </span>
                        <span className="swiss-label text-gray-200 mt-4 group-hover:text-black transition-colors duration-300">
                            New Pitch
                        </span>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                        <p className="text-[13px] font-bold text-gray-200 group-hover:text-black transition-colors duration-300">
                            Create Project
                        </p>
                        <span className="text-[11px] text-gray-200">—</span>
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
                        {/* Thumbnail area */}
                        <div className="aspect-[4/3] bg-[#f2f2f2] border border-gray-100 flex items-center justify-center overflow-hidden transition-all duration-300 group-hover:border-black relative">
                            {/* Abstract pattern background unique per project */}
                            <div
                                className="absolute inset-0 opacity-[0.04] group-hover:opacity-[0.08] transition-opacity duration-500"
                                style={{
                                    backgroundImage: `repeating-linear-gradient(${45 + parseInt(project.id.replace(/\D/g, "")) * 30}deg, #000 0px, #000 1px, transparent 1px, transparent ${12 + parseInt(project.id.replace(/\D/g, "")) * 4}px)`,
                                }}
                            />
                            {/* Slide count indicator */}
                            <div className="relative z-10 flex flex-col items-center">
                                <span className="text-[28px] font-black text-gray-100 group-hover:text-black transition-colors duration-300 leading-none">
                                    {project.slidesHtml.length}
                                </span>
                                <span className="text-[10px] font-mono text-gray-200 mt-1 uppercase tracking-widest">
                                    slides
                                </span>
                            </div>

                            {/* Status badge overlay */}
                            <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <Badge variant={project.status}>{project.status}</Badge>
                            </div>
                        </div>

                        {/* Project info — name left, date right (like reference) */}
                        <div className="flex items-start justify-between mt-4 gap-4">
                            <div className="min-w-0 flex-1">
                                <p className="text-[13px] font-bold text-black truncate leading-tight">
                                    {project.name}
                                </p>
                                <p className="text-[11px] text-gray-200 mt-1 truncate">
                                    {project.prompt.length > 60
                                        ? project.prompt.slice(0, 60) + "…"
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

            {/* ── Empty state ── */}
            {sorted.length === 0 && (
                <div className="text-center py-24 animate-fade-in">
                    <p className="text-heading-sm font-bold uppercase">No projects found</p>
                    <p className="text-body-sm text-gray-300 mt-3">
                        {filter !== "all"
                            ? `No ${filter} projects. Try a different filter.`
                            : "Create your first pitch deck to get started."}
                    </p>
                </div>
            )}

            {/* ── Bottom info bar ── */}
            <div className="mt-16 pt-6 border-t hairline flex items-center justify-between animate-fade-up delay-4">
                <p className="text-[11px] text-gray-200">
                    Showing {sorted.length} of {projects.length} projects
                </p>
                <p className="text-[11px] text-gray-200 font-mono">
                    TRACTION<span className="text-accent">.</span>
                </p>
            </div>
        </div>
    );
}
