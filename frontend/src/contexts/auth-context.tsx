"use client";

import { createContext, useContext, useCallback } from "react";
import { useRouter } from "next/navigation";
import type { User } from "@/types";

interface AuthContextValue {
  user: User;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({
  user,
  children,
}: {
  user: User;
  children: React.ReactNode;
}) {
  const router = useRouter();

  const logout = useCallback(async () => {
    await fetch(
      `${process.env.NEXT_PUBLIC_API_URL || "https://api.traction-ai.me"}/api/v1/auth/logout`,
      { method: "POST", credentials: "include" }
    );
    router.push("/login");
  }, [router]);

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
