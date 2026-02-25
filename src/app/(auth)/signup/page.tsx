"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Input } from "@/components/ui/input";

interface SignupErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

export default function SignupPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState<SignupErrors>({});
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
      const newErrors: SignupErrors = {};

      if (name.trim().length < 1) {
        newErrors.name = "Full name is required.";
      }
      if (!email.includes("@")) {
        newErrors.email = "Please enter a valid email address.";
      }
      if (password.length < 8) {
        newErrors.password = "Password must be at least 8 characters.";
      } else if (!/[A-Z]/.test(password)) {
        newErrors.password =
          "Password must contain at least 1 uppercase letter.";
      } else if (!/[0-9]/.test(password)) {
        newErrors.password = "Password must contain at least 1 number.";
      }
      if (confirmPassword !== password) {
        newErrors.confirmPassword = "Passwords do not match.";
      }

      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) return;

      setLoading(true);
      timeoutRef.current = setTimeout(() => {
        router.push("/projects");
      }, 1000);
    },
    [name, email, password, confirmPassword, router]
  );

  return (
    <>
      <h1 className="text-heading-lg font-black uppercase tracking-tight animate-fade-up">
        Create
        <br />
        Account
      </h1>
      <p className="text-body-lg text-gray-300 animate-fade-up delay-1" style={{ marginTop: "16px" }}>
        Start building investor-ready pitch decks.
      </p>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col"
        style={{ marginTop: "clamp(32px, 4vw, 56px)", gap: "clamp(28px, 3vw, 40px)" }}
        noValidate
      >
        <div className="animate-fade-up delay-2">
          <Input
            label="Full Name"
            type="text"
            placeholder="e.g. Jane Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
            error={errors.name}
            autoComplete="name"
          />
        </div>

        <div className="animate-fade-up delay-3">
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

        <div className="animate-fade-up delay-4">
          <Input
            label="Password"
            type="password"
            placeholder="Min. 8 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            autoComplete="new-password"
          />
        </div>

        <div className="animate-fade-up delay-5">
          <Input
            label="Confirm Password"
            type="password"
            placeholder="Re-enter password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            error={errors.confirmPassword}
            autoComplete="new-password"
          />
        </div>

        <div className="animate-fade-up delay-6" style={{ marginTop: "8px" }}>
          <button
            type="submit"
            disabled={loading}
            className="group inline-flex items-center bg-black text-white font-bold uppercase tracking-[0.12em] disabled:opacity-25 hover:bg-accent transition-colors"
            style={{ padding: "22px 44px", fontSize: "14px" }}
          >
            {loading ? "Creating..." : "Create Account"}
            <span
              className="inline-block ml-5 transition-transform group-hover:translate-x-1"
              style={{ fontSize: "18px" }}
            >
              &rarr;
            </span>
          </button>
        </div>
      </form>

      <p className="text-body text-gray-300 animate-fade-up delay-7" style={{ marginTop: "clamp(24px, 3vw, 40px)" }}>
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-bold text-black underline underline-offset-4 decoration-gray-100 hover:decoration-black"
        >
          Log in
        </Link>
      </p>
    </>
  );
}
