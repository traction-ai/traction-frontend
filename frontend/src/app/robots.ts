import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: ["/", "/share/"],
        disallow: ["/dashboard/", "/projects/", "/documents/", "/settings/", "/login", "/signup"],
      },
    ],
    sitemap: "https://traction-ai.me/sitemap.xml",
  };
}
