import {
  getProjectById,
  getDocumentsByProjectId,
  getChatMessages,
  getSuggestions,
} from "@/lib/mock-data";
import { FinalizeClient } from "./finalize-client";
import Link from "next/link";

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function FinalizePage({ params }: Props) {
  const { projectId } = await params;
  const project = getProjectById(projectId);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-heading font-bold uppercase">Project not found</h1>
        <Link
          href="/projects"
          className="swiss-label text-gray-300 hover:text-black"
          style={{ marginTop: "24px" }}
        >
          &larr;&ensp;Back to projects
        </Link>
      </div>
    );
  }

  const documents = getDocumentsByProjectId(projectId);
  const messages = getChatMessages(projectId);
  const suggestions = getSuggestions(projectId);

  return (
    <FinalizeClient
      project={project}
      documents={documents}
      messages={messages}
      suggestions={suggestions}
    />
  );
}
