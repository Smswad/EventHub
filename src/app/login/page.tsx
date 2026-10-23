"use client";

import { useState } from "react";
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { LogIn, UserPlus } from "lucide-react";

export default function LoginPage() {
  const [isRegister, setIsRegister] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
        toast.success("Account created successfully!");
      } else {
        await signInWithEmailAndPassword(auth, email, password);
        toast.success("Signed in successfully!");
      }
      router.push("/items");
    } catch (err: unknown) {
      const error = err as { message?: string };
      toast.error(error.message || "Authentication failed. Please check credentials.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md rounded-2xl bg-surface-container-lowest p-8 shadow-sm border border-outline-variant/30">
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold text-on-surface">
            {isRegister ? "Create an Account" : "Welcome back"}
          </h1>
          <p className="text-sm text-on-surface-variant mt-1">
            {isRegister
              ? "Join EventHub to discover and host events"
              : "Log in to manage your tickets and events"}
          </p>
        </div>

        <div className="flex rounded-lg bg-surface-container-low p-1 mb-6 text-sm font-semibold">
          <button
            type="button"
            onClick={() => setIsRegister(false)}
            className={`flex-1 py-2 rounded-md transition-all ${
              !isRegister ? "bg-surface-container-lowest text-primary shadow-sm" : "text-on-surface-variant"
            }`}
          >
            Log In
          </button>
          <button
            type="button"
            onClick={() => setIsRegister(true)}
            className={`flex-1 py-2 rounded-md transition-all ${
              isRegister ? "bg-surface-container-lowest text-primary shadow-sm" : "text-on-surface-variant"
            }`}
          >
            Register
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              className="w-full h-11 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full h-11 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-primary font-bold text-sm text-on-primary hover:bg-primary-container disabled:opacity-50 transition-colors"
          >
            {isRegister ? <UserPlus className="h-4 w-4" /> : <LogIn className="h-4 w-4" />}
            <span>{loading ? "Processing..." : isRegister ? "Create Account" : "Sign In"}</span>
          </button>
        </form>
      </div>
    </div>
  );
}
