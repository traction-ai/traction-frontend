import {
  getProjectById,
  getDocumentsByProjectId,
  getChatMessages,
} from "@/lib/mock-data";
import { WorkspaceClient } from "./workspace-client";
import Link from "next/link";

interface Props {
  params: Promise<{ projectId: string }>;
}

export default async function ProjectWorkspacePage({ params }: Props) {
  const { projectId } = await params;
  const project = getProjectById(projectId);

  if (!project) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <h1 className="text-2xl font-black">Project not found</h1>
        <Link
          href="/dashboard"
          className="text-sm text-accent mt-4 hover:underline"
        >
          Back to dashboard
        </Link>
      </div>
    );
  }

  const documents = getDocumentsByProjectId(projectId);
  const messages = getChatMessages(projectId);

  return (
    <WorkspaceClient
      project={project}
      documents={documents}
      initialMessages={messages}
    />
  );
}
