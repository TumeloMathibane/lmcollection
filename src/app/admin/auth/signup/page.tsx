// app/auth/signup/page.jsx
"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignUpPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");

    // Validate passwords match
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    // Validate password length
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setLoading(true);

    try {
      // Create account
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to create account");
        setLoading(false);
        return;
      }

      // Sign in automatically after signup
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
      });

      if (result?.error) {
        setError(result.error);
      } else {
        router.push("/admin");
        router.refresh();
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
      throw new Error("Sign-up failed", { cause: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center-safe bg-gray-50 px-6">
      <div className="bg-[url('/logos/Liphiwe_business_logo_black.svg')] bg-origin-border bg-contain bg-center bg-no-repeat w-45 h-45" />

      <div className="w-full max-w-md bg-white rounded-lg shadow-md p-8">
        <h1 className="text-2xl font-semibold mb-2">Create Account</h1>
        <p className="text-sm text-gray-600 mb-4">Sign up to start shopping</p>

        {error && (
          <div className="mb-4 rounded-md bg-red-50 border border-red-200 text-red-700 px-3 py-2">
            ⚠️ {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-sm font-medium text-gray-700">
              Full Name
            </label>
            <input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="email"
              className="text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              required
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="password"
              className="text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              minLength={8}
              required
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <small className="text-sm text-gray-500">
              Must be at least 8 characters
            </small>
          </div>

          <div className="flex flex-col gap-2">
            <label
              htmlFor="confirmPassword"
              className="text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="••••••••"
              required
              className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
            disabled={loading}
          >
            {loading ? "⏳ Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="text-center mt-4 text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/admin/auth/signin"
            className="text-indigo-600 hover:text-indigo-700 underline"
            prefetch={false}
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
