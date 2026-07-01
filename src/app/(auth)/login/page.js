"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { signIn } from "@/lib/auth-client";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const callbackUrl = searchParams.get("callbackUrl") || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const { error: authError } = await signIn.email({
      email: formData.email,
      password: formData.password,
    });

    setLoading(false);

    if (authError) {
      setError(authError.message || "Invalid email or password.");
      toast.error(authError.message || "Login Failed!");
    } else {
      toast.success("Login Successful!");
      router.push(callbackUrl);
      router.refresh();
    }
  };

  const handleGoogleLogin = async () => {
    await signIn.social({
      provider: "google",
      callbackURL: callbackUrl,
    });
  };

  return (
    <main className="min-h-screen bg-[#0b0f19] flex items-center justify-center px-4 pt-20">
      <div className="max-w-md w-full bg-[#111625] border border-gray-800 p-8 rounded-2xl space-y-6">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-white">Welcome Back</h2>
          <p className="text-sm text-gray-400 mt-2">Sign in to continue your curriculum</p>
        </div>

        {error && <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-xl text-sm text-red-400 text-center">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Email Address</label>
            <input type="email" required onChange={(e) => setFormData({...formData, email: e.target.value})} className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500" placeholder="you@example.com" />
          </div>
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Password</label>
            <input type="password" required onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full bg-[#0b0f19] border border-gray-800 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-cyan-500" placeholder="••••••••" />
          </div>
          <button type="submit" disabled={loading} className="w-full py-3 bg-gradient-to-r from-cyan-600 to-violet-600 font-bold rounded-xl text-white transition hover:shadow-[0_0_20px_rgba(6,182,212,0.3)] disabled:opacity-50">
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="relative flex items-center justify-center my-4">
          <div className="absolute w-full border-t border-gray-800"></div>
          <span className="relative bg-[#111625] px-3 text-xs text-gray-500 uppercase tracking-wider">Or continue with</span>
        </div>

        <button onClick={handleGoogleLogin} className="w-full py-3 bg-[#0b0f19] border border-gray-800 rounded-xl font-semibold flex items-center justify-center gap-2 hover:bg-gray-900 transition text-sm">
          <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-4 h-4" />Sign in with Google
        </button>

        <p className="text-center text-sm text-gray-400">New to SkillSphere? <Link href="/register" className="text-cyan-400 hover:underline">Register</Link></p>
      </div>
    </main>
  );
}