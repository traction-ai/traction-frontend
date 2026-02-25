import type { MetadataRoute } from "next";
import { projects, shareLinks } from "@/lib/mock-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://traction-ai.me";

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${baseUrl}/work`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
  ];

  const sharedPitchPages: MetadataRoute.Sitemap = shareLinks.map((link) => {
    const project = projects.find((p) => p.id === link.projectId);
    return {
      url: `${baseUrl}/share/${link.projectId}`,
      lastModified: project ? new Date(project.updatedAt) : new Date(link.createdAt),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    };
  });

  return [...staticPages, ...sharedPitchPages];
}
