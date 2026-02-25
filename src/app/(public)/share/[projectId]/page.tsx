import {
  getProjectById,
  getDocumentsByProjectId,
  getShareLink,
} from "@/lib/mock-data";
import { ShareClient } from "./share-client";

interface Props {
  params: Promise<{ projectId: string }>;
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

  return (
    <ShareClient
      project={project}
      documents={documents}
      viewCount={shareLink?.viewCount ?? 0}
    />
  );
}
