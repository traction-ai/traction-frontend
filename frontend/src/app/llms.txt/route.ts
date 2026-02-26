import { shareLinks, projects } from "@/lib/mock-data";

export function GET() {
  const baseUrl = "https://traction-ai.me";

  const pitchEntries = shareLinks
    .map((link) => {
      const project = projects.find((p) => p.id === link.projectId);
      if (!project) return null;
      return `- [${project.name} — Pitch Deck](${baseUrl}/share/${link.projectId}): ${project.prompt}`;
    })
    .filter(Boolean)
    .join("\n");

  const content = `# Traction

> AI-powered pitch deck generator. Create investor-ready pitch decks from a single prompt.

Traction helps founders, startups, and businesses generate professional pitch decks with supporting documents including executive summaries, financial projections, market research, SWOT analysis, competitive analysis, and more.

## Public Pitch Decks

The following pitch decks are publicly shared and available for viewing:

${pitchEntries}

## Links

- Homepage: ${baseUrl}
- Services: ${baseUrl}/services
- Portfolio: ${baseUrl}/work
`;

  return new Response(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
