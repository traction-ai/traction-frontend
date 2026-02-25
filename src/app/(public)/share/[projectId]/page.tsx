import type { Metadata } from "next";
import {
  getProjectById,
  getDocumentsByProjectId,
  getShareLink,
} from "@/lib/mock-data";
import { ShareClient } from "./share-client";

interface Props {
  params: Promise<{ projectId: string }>;
}

const BASE_URL = "https://traction-ai.me";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { projectId } = await params;
  const project = getProjectById(projectId);

  if (!project) {
    return {
      title: "Pitch Not Found | Traction",
      description: "This pitch deck may have been removed or the link is invalid.",
    };
  }

  const documents = getDocumentsByProjectId(projectId);
  const execSummary = documents.find((d) => d.type === "executive-summary");
  const description = execSummary
    ? execSummary.content.slice(0, 155) + (execSummary.content.length > 155 ? "..." : "")
    : project.prompt.slice(0, 155) + (project.prompt.length > 155 ? "..." : "");

  const title = `${project.name} — Pitch Deck`;
  const url = `${BASE_URL}/share/${projectId}`;

  return {
    title: `${title} | Traction`,
    description,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: "Traction",
      type: "article",
      publishedTime: project.createdAt,
      modifiedTime: project.updatedAt,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function SharePage({ params }: Props) {
  const { projectId } = await params;
  const project = getProjectById(projectId);
  const shareLink = getShareLink(projectId);

  if (!project) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-heading-lg font-black uppercase">
            Link not found
          </h1>
          <p className="text-body text-gray-300 mt-4">
            This pitch deck may have been removed or the link is invalid.
          </p>
        </div>
      </div>
    );
  }

  const documents = getDocumentsByProjectId(projectId);

  const execSummary = documents.find((d) => d.type === "executive-summary");
  const description = execSummary
    ? execSummary.content.slice(0, 155)
    : project.prompt.slice(0, 155);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "PresentationDigitalDocument",
    name: `${project.name} — Pitch Deck`,
    description,
    url: `${BASE_URL}/share/${projectId}`,
    datePublished: project.createdAt,
    dateModified: project.updatedAt,
    publisher: {
      "@type": "Organization",
      name: "Traction",
      url: BASE_URL,
    },
    about: documents.map((doc) => ({
      "@type": "Thing",
      name: doc.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Crawlable content for search engines and LLM search tools */}
      <section className="sr-only" aria-label={`${project.name} pitch deck content`}>
        <h1>{project.name} — Pitch Deck</h1>
        <p>{project.prompt}</p>

        {execSummary && (
          <article>
            <h2>Executive Summary</h2>
            <p>{execSummary.content}</p>
          </article>
        )}

        {documents
          .filter((d) => d.type !== "executive-summary")
          .map((doc) => (
            <article key={doc.id}>
              <h2>{doc.title}</h2>
              <p>{doc.content.slice(0, 200)}</p>
            </article>
          ))}

        <footer>
          <p>
            View full pitch deck at{" "}
            <a href={`${BASE_URL}/share/${projectId}`}>
              {`${BASE_URL}/share/${projectId}`}
            </a>
          </p>
          <p>Generated with Traction — AI Pitch Deck Generator</p>
        </footer>
      </section>

      <ShareClient
        project={project}
        documents={documents}
        viewCount={shareLink?.viewCount ?? 0}
      />
    </>
  );
}
