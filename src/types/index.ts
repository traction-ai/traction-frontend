export interface User {
  id: string;
  name: string;
  email: string;
  avatarUrl: string | null;
  createdAt: string;
}

export interface Project {
  id: string;
  userId: string;
  name: string;
  prompt: string;
  status: "generating" | "draft" | "finalized" | "shared";
  slidesHtml: string[];
  thumbnailUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

export type DocumentType =
  | "product-description"
  | "timeline"
  | "swot-analysis"
  | "market-research"
  | "financial-projections"
  | "funding-requirements"
  | "product-forecast"
  | "competitive-analysis"
  | "executive-summary";

export interface ProjectDocument {
  id: string;
  projectId: string;
  type: DocumentType;
  title: string;
  content: string;
  status: "generating" | "ready" | "error" | "pending";
  createdAt: string;
  updatedAt: string;
}

export interface ChatMessage {
  id: string;
  projectId: string;
  role: "user" | "assistant";
  content: string;
  createdAt: string;
}

export interface Feedback {
  id: string;
  projectId: string;
  slideIndex: number | null;
  documentId: string | null;
  selectedText: string;
  userComment: string;
  resolution: string | null;
  status: "pending" | "applied" | "dismissed";
  createdAt: string;
}

export interface ShareLink {
  id: string;
  projectId: string;
  slug: string;
  isPasswordProtected: boolean;
  expiresAt: string | null;
  viewCount: number;
  createdAt: string;
}

export interface AiSuggestion {
  id: string;
  projectId: string;
  target: "slide" | "document" | "general";
  targetId: string | null;
  description: string;
  status: "pending" | "applied" | "dismissed";
}
