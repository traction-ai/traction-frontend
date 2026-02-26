const API_URL = process.env.NEXT_PUBLIC_API_URL || "https://api.traction-ai.me";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    ...options,
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
  });
  return res;
}

export function getGoogleLoginUrl() {
  return `${API_URL}/api/v1/auth/google/login`;
}
