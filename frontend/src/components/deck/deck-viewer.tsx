"use client";

import dynamic from "next/dynamic";

const DeckViewerClient = dynamic(
  () =>
    import("./deck-viewer-client").then((mod) => ({
      default: mod.DeckViewerClient,
    })),
  {
    ssr: false,
    loading: () => <DeckViewerSkeleton />,
  }
);

function DeckViewerSkeleton() {
  return (
    <div className="w-full h-full bg-white flex items-center justify-center border border-black">
      <div className="w-16 h-0.5 bg-black animate-pulse" />
    </div>
  );
}

interface DeckViewerProps {
  slides: string[];
  fullHtml?: string;
  readOnly?: boolean;
  onSlideChange?: (index: number) => void;
}

export function DeckViewer(props: DeckViewerProps) {
  if (props.fullHtml) {
    return (
      <iframe
        srcDoc={props.fullHtml}
        className="w-full h-full border-0"
        title="Pitch Deck"
        sandbox="allow-scripts allow-same-origin"
      />
    );
  }

  return <DeckViewerClient slides={props.slides} readOnly={props.readOnly} onSlideChange={props.onSlideChange} />;
}
