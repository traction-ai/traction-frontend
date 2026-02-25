"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
  const [loading, setLoading] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      const newErrors: { email?: string; password?: string } = {};

      if (!email.includes("@")) {
        newErrors.email = "Please enter a valid email address.";
      }
      if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters.";
      }

      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;

      setLoading(true);
      timeoutRef.current = setTimeout(() => {
        router.push("/dashboard");
      }, 1000);
    },
    [email, password, router]
  );

  return (
    <>
      <h1 className="text-heading-lg font-black uppercase tracking-tight animate-fade-up">
        Log In
      </h1>
      <p className="text-body-lg text-gray-300 animate-fade-up delay-1" style={{ marginTop: "16px" }}>
        Enter your credentials to continue.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col"
        style={{ marginTop: "clamp(32px, 4vw, 56px)", gap: "clamp(28px, 3vw, 40px)" }}
        noValidate
      >
        <div className="animate-fade-up delay-2">
          <Input
            label="Email"
            type="email"
            placeholder="e.g. you@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            autoComplete="email"
          />
        </div>

        <div className="animate-fade-up delay-3">
          <Input
            label="Password"
            type="password"
            placeholder="Min. 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            autoComplete="current-password"
          />
        </div>

        <div className="animate-fade-up delay-4" style={{ marginTop: "8px" }}>
          <button
            type="submit"
            disabled={loading}
            className="group inline-flex items-center bg-black text-white font-bold uppercase tracking-[0.12em] disabled:opacity-25 hover:bg-accent transition-colors"
            style={{ padding: "22px 44px", fontSize: "14px" }}
          >
            {loading ? "Logging in..." : "Log In"}
            <span
              className="inline-block ml-5 transition-transform group-hover:translate-x-1"
              style={{ fontSize: "18px" }}
            >
              &rarr;
            </span>
          </button>
        </div>
      </form>

      <p className="text-body text-gray-300 animate-fade-up delay-5" style={{ marginTop: "clamp(24px, 3vw, 40px)" }}>
        Don&apos;t have an account?{" "}
        <Link
          href="/signup"
          className="font-bold text-black underline underline-offset-4 decoration-gray-100 hover:decoration-black"
        >
          Sign up
        </Link>
      </p>
    </>
  );
}
