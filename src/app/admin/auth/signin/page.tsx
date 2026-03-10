"use client";

import { FormEvent, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function SignInPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
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
      throw new Error("Sign-in failed", { cause: error });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center-safe items-center-safe bg-gray-50 p-6">
      <div className="w-full max-w-md">
        <div className="mx-auto mb-6 bg-[url('/logos/Liphiwe_business_logo_black.svg')] bg-contain bg-center bg-no-repeat w-28 h-28" />

        <div className="bg-white rounded-lg shadow-md p-8">
          <h1 className="text-2xl font-semibold mb-2">Sign In</h1>
          <p className="text-sm text-gray-600 mb-4">
            Welcome back! Please sign in to continue.
          </p>

          {error && (
            <div className="mb-4 rounded-md bg-red-50 border border-red-200 text-red-700 px-3 py-2">
              ⚠️ {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col gap-2">
              <label
                htmlFor="email"
                className="text-sm font-medium text-gray-700">
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
                className="text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="border rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 disabled:opacity-60 disabled:cursor-not-allowed"
              disabled={loading}>
              {loading ? "⏳ Signing in..." : "Sign In"}
            </button>
          </form>

          <p className="text-center mt-4 text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href="/admin/auth/signup"
              className="text-indigo-600 hover:text-indigo-700 underline">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
