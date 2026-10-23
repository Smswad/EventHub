"use client";

import React, { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import toast from "react-hot-toast";
import {
  Ticket,
  Mail,
  Lock,
  User as UserIcon,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  TrendingUp,
  Sparkles,
  Loader2,
  LogIn,
  UserPlus,
} from "lucide-react";

type AuthMode = "login" | "register";

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectParam = searchParams.get("redirect");
  const destination = redirectParam && redirectParam.startsWith("/") ? redirectParam : "/items/manage";

  const { user, loading: authLoading, login, register, googleLogin } = useAuth();

  const [mode, setMode] = useState<AuthMode>("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [role, setRole] = useState<"attendee" | "organizer">("attendee");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);

  // Redirect to destination if user is already logged in
  useEffect(() => {
    if (user && !authLoading) {
      router.push(destination);
    }
  }, [user, authLoading, router, destination]);

  const mapFirebaseError = (error: any): string => {
    const code = error?.code;
    switch (code) {
      case "auth/email-already-in-use":
        return "This email is already registered. Please log in instead.";
      case "auth/invalid-email":
        return "Please enter a valid email address.";
      case "auth/operation-not-allowed":
        return "Email/Password sign-in is not enabled in Firebase Console.";
      case "auth/weak-password":
        return "Password is too weak. Please use at least 6 characters.";
      case "auth/user-disabled":
        return "This user account has been disabled.";
      case "auth/user-not-found":
        return "No account found with this email. Please register first.";
      case "auth/wrong-password":
        return "Incorrect password. Please try again.";
      case "auth/invalid-credential":
        return "Invalid email or password. Please verify your details.";
      case "auth/too-many-requests":
        return "Too many failed attempts. Please wait a few moments and try again.";
      case "auth/popup-closed-by-user":
        return "Google sign-in popup was closed before completing.";
      case "auth/cancelled-popup-request":
        return "Sign-in operation was cancelled.";
      case "auth/popup-blocked":
        return "Popup was blocked. Redirecting to Google...";
      case "auth/unauthorized-domain":
        return "Domain not authorized: Please add your domain (e.g. eventhub-smswad.vercel.app) to Firebase Console > Authentication > Settings > Authorized domains.";
      case "auth/account-exists-with-different-credential":
        return "An account already exists with this email using another sign-in method.";
      default:
        return error?.message || "Authentication failed. Please try again.";
    }
  };

  const validateForm = (): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.trim() || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return false;
    }

    if (!password || password.length < 6) {
      toast.error("Password must be at least 6 characters long.");
      return false;
    }

    if (mode === "register") {
      if (!name.trim()) {
        toast.error("Please enter your full name.");
        return false;
      }
      if (!agreeTerms) {
        toast.error("You must agree to the Terms of Service to create an account.");
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      if (mode === "login") {
        await login(email.trim(), password);
        toast.success("Welcome back to EventHub!");
      } else {
        await register(name.trim(), email.trim(), password);
        toast.success("Account created successfully! Welcome to EventHub.");
      }
      router.push(destination);
    } catch (err: any) {
      console.error("Auth error:", err);
      toast.error(mapFirebaseError(err));
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsGoogleSubmitting(true);
    try {
      const res = await googleLogin();
      if (res) {
        toast.success("Signed in with Google!");
        router.push(destination);
      }
    } catch (err: any) {
      console.error("Google auth error:", err);
      toast.error(mapFirebaseError(err));
    } finally {
      setIsGoogleSubmitting(false);
    }
  };

  // Password strength calculation for Register
  const getPasswordStrength = () => {
    if (!password) return { level: 0, label: "Empty", color: "bg-surface-container-high" };
    if (password.length < 6) return { level: 1, label: "Too short (min 6)", color: "bg-error" };
    const hasLetters = /[a-zA-Z]/.test(password);
    const hasNumbers = /[0-9]/.test(password);
    const hasSpecial = /[^a-zA-Z0-9]/.test(password);
    const score = (hasLetters ? 1 : 0) + (hasNumbers ? 1 : 0) + (hasSpecial ? 1 : 0) + (password.length >= 8 ? 1 : 0);

    if (score <= 2) return { level: 2, label: "Fair", color: "bg-secondary" };
    if (score === 3) return { level: 3, label: "Good", color: "bg-primary" };
    return { level: 4, label: "Strong password", color: "bg-primary" };
  };

  const passwordStrength = getPasswordStrength();

  if (authLoading || user) {
    return (
      <div className="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center gap-3 bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
        <p className="text-sm font-medium text-on-surface-variant">
          {user ? "Redirecting to your dashboard..." : "Loading EventHub..."}
        </p>
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-[calc(100vh-4rem)] flex items-center justify-center p-4 sm:p-8 overflow-hidden bg-background">
      {/* Ambient background glow orbs matching Stitch design */}
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-primary-fixed/40 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-20 w-[420px] h-[420px] rounded-full bg-secondary-fixed/30 blur-3xl pointer-events-none" />

      {/* Main Form Container Card */}
      <div className="relative w-full max-w-lg z-10 my-8">
        <div className="bg-surface-container-lowest shadow-xl rounded-2xl border border-outline-variant/30 p-6 sm:p-10 flex flex-col gap-6">
          
          {/* Header & Brand Symbol */}
          <div className="flex flex-col items-center text-center gap-1.5">
            <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center shadow-sm mb-1 text-primary">
              <Ticket className="h-7 w-7" />
            </div>

            {mode === "login" ? (
              <span className="text-[11px] uppercase tracking-wider text-secondary font-bold">
                Attendee & Host Portal
              </span>
            ) : (
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-surface-container-low rounded-full">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider">
                  Start in seconds
                </span>
              </div>
            )}

            <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight mt-1">
              {mode === "login" ? "Welcome back" : "Create your account"}
            </h1>

            <p className="text-sm text-on-surface-variant max-w-sm">
              {mode === "login"
                ? "Log in to manage your tickets, access saved events, and connect with attendees worldwide."
                : "Join over 50,000+ planners and attendees discovering extraordinary live experiences."}
            </p>
          </div>

          {/* Segmented Mode Switcher Pill */}
          <div className="p-1 bg-surface-container-low rounded-xl flex items-center gap-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all duration-200 flex items-center justify-center gap-1.5 ${
                mode === "login"
                  ? "bg-surface-container-lowest text-primary shadow-sm font-semibold"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              <LogIn className="h-4 w-4" />
              <span>Log In</span>
            </button>
            <button
              type="button"
              onClick={() => setMode("register")}
              className={`flex-1 py-2 px-3 rounded-lg text-sm transition-all duration-200 flex items-center justify-center gap-1.5 ${
                mode === "register"
                  ? "bg-surface-container-lowest text-primary shadow-sm font-semibold"
                  : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
              }`}
            >
              <UserPlus className="h-4 w-4" />
              <span>Register</span>
            </button>
          </div>

          {/* Social Auth Option: Google */}
          <button
            type="button"
            onClick={handleGoogleSignIn}
            disabled={isGoogleSubmitting || isSubmitting}
            className="w-full flex items-center justify-center gap-3 py-2.5 px-4 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all text-on-surface font-semibold text-sm shadow-sm active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed border border-outline-variant/20"
          >
            {isGoogleSubmitting ? (
              <Loader2 className="h-4 w-4 animate-spin text-primary" />
            ) : (
              <svg aria-hidden="true" className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
                <path
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.14z"
                  fill="#4285F4"
                />
                <path
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"
                  fill="#34A853"
                />
                <path
                  d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.14-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.99 0 12s.45 3.82 1.25 5.42l4.03-3.15z"
                  fill="#FBBC05"
                />
                <path
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
                  fill="#EA4335"
                />
              </svg>
            )}
            <span>Continue with Google</span>
          </button>

          {/* Clean Divider */}
          <div className="relative flex items-center justify-center my-1">
            <div className="w-full h-px bg-outline-variant/30" />
            <span className="absolute bg-surface-container-lowest px-3 text-xs font-semibold text-on-surface-variant tracking-wider uppercase">
              or continue with email
            </span>
          </div>

          {/* Email / Password Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            
            {/* Full Name field (Register only) */}
            {mode === "register" && (
              <div className="flex flex-col gap-1.5">
                <label className="text-sm font-semibold text-on-surface" htmlFor="name">
                  Full Name
                </label>
                <div className="relative flex items-center">
                  <UserIcon className="absolute left-3.5 h-4 w-4 text-outline pointer-events-none" />
                  <input
                    id="name"
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Alex Morgan"
                    className="w-full h-11 pl-11 pr-4 bg-surface-container-lowest text-on-surface rounded-lg text-sm border border-outline-variant/40 placeholder:text-outline shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                  />
                </div>
              </div>
            )}

            {/* Email Address */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-on-surface" htmlFor="email">
                  Email Address
                </label>
                <span className="text-xs text-on-surface-variant">Work or personal</span>
              </div>
              <div className="relative flex items-center">
                <Mail className="absolute left-3.5 h-4 w-4 text-outline pointer-events-none" />
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@work-email.com"
                  className="w-full h-11 pl-11 pr-4 bg-surface-container-lowest text-on-surface rounded-lg text-sm border border-outline-variant/40 placeholder:text-outline shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="flex flex-col gap-1.5">
              <div className="flex items-center justify-between">
                <label className="text-sm font-semibold text-on-surface" htmlFor="password">
                  Password
                </label>
                {mode === "login" ? (
                  <button
                    type="button"
                    onClick={() =>
                      toast("Password reset link will be sent to your email.", {
                        icon: "ℹ️",
                      })
                    }
                    className="text-xs font-semibold text-primary hover:underline transition-colors"
                  >
                    Forgot password?
                  </button>
                ) : (
                  <span className="text-xs text-outline">Min. 6 characters</span>
                )}
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-3.5 h-4 w-4 text-outline pointer-events-none" />
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full h-11 pl-11 pr-11 bg-surface-container-lowest text-on-surface rounded-lg text-sm border border-outline-variant/40 placeholder:text-outline shadow-sm focus:outline-none focus:ring-2 focus:ring-primary/25 focus:border-primary transition-all"
                />
                <button
                  type="button"
                  aria-label="Toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 p-1 text-outline hover:text-on-surface transition-colors"
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>

              {/* Password Strength Indicator (Register only) */}
              {mode === "register" && password.length > 0 && (
                <div className="flex flex-col gap-1 mt-1">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-on-surface-variant font-medium">Strength:</span>
                    <span className="text-primary font-semibold">{passwordStrength.label}</span>
                  </div>
                  <div className="grid grid-cols-4 gap-1.5 w-full h-1.5 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${passwordStrength.level >= 1 ? passwordStrength.color : "bg-surface-container-high"}`} />
                    <div className={`h-full rounded-full ${passwordStrength.level >= 2 ? passwordStrength.color : "bg-surface-container-high"}`} />
                    <div className={`h-full rounded-full ${passwordStrength.level >= 3 ? passwordStrength.color : "bg-surface-container-high"}`} />
                    <div className={`h-full rounded-full ${passwordStrength.level >= 4 ? passwordStrength.color : "bg-surface-container-high"}`} />
                  </div>
                </div>
              )}
            </div>

            {/* Role / Persona Selector (Register only) */}
            {mode === "register" && (
              <div className="flex flex-col gap-2">
                <span className="text-xs font-semibold text-on-surface">I am primarily an:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setRole("attendee")}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                      role === "attendee"
                        ? "border-primary bg-primary-fixed/30 text-on-surface"
                        : "border-outline-variant/30 bg-surface-container-low hover:bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    <Ticket className="h-5 w-5 text-primary shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-on-surface">Attendee</span>
                      <span className="text-[10px] text-on-surface-variant truncate">Explore & join</span>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setRole("organizer")}
                    className={`p-3 rounded-xl border text-left transition-all flex items-center gap-2.5 ${
                      role === "organizer"
                        ? "border-primary bg-primary-fixed/30 text-on-surface"
                        : "border-outline-variant/30 bg-surface-container-low hover:bg-surface-container text-on-surface-variant"
                    }`}
                  >
                    <Sparkles className="h-5 w-5 text-secondary shrink-0" />
                    <div className="flex flex-col min-w-0">
                      <span className="text-xs font-bold text-on-surface">Organizer</span>
                      <span className="text-[10px] text-on-surface-variant truncate">Host & manage</span>
                    </div>
                  </button>
                </div>
              </div>
            )}

            {/* Checkboxes: Remember Me (Login) / Terms (Register) */}
            {mode === "login" ? (
              <label className="flex items-center gap-2 cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="w-4 h-4 rounded text-primary focus:ring-primary focus:ring-offset-0 bg-surface-container-lowest border-outline-variant cursor-pointer"
                />
                <span className="text-xs text-on-surface-variant">Remember this device for 30 days</span>
              </label>
            ) : (
              <label className="flex items-start gap-2 cursor-pointer select-none pt-1">
                <input
                  type="checkbox"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-4 h-4 rounded mt-0.5 text-primary focus:ring-primary focus:ring-offset-0 bg-surface-container-lowest border-outline-variant cursor-pointer"
                />
                <span className="text-xs text-on-surface-variant leading-tight">
                  I agree to EventHub&apos;s{" "}
                  <Link href="/about" className="text-primary font-semibold hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/about" className="text-primary font-semibold hover:underline">
                    Privacy Policy
                  </Link>
                  .
                </span>
              </label>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isSubmitting || isGoogleSubmitting}
              className="w-full h-12 bg-primary text-on-primary rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:bg-primary-container transition-all duration-200 shadow-md hover:shadow-lg active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed mt-2 group"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin text-on-primary" />
                  <span>{mode === "login" ? "Signing In..." : "Creating Account..."}</span>
                </>
              ) : (
                <>
                  <span>{mode === "login" ? "Sign In to EventHub" : "Create Free Account"}</span>
                  <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                </>
              )}
            </button>
          </form>

          {/* Stitch Highlight & Social Proof Banner */}
          {mode === "login" ? (
            <div className="bg-surface-container-low rounded-xl p-3 flex items-center justify-between border border-outline-variant/20">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2.5 w-2.5">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-secondary-container opacity-75" />
                  <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-secondary" />
                </span>
                <span className="text-xs font-semibold text-on-surface">1,420+ Live Experiences</span>
              </div>
              <span className="text-[10px] text-secondary font-bold uppercase tracking-wider bg-secondary-fixed px-2 py-0.5 rounded-full">
                NYC • SF • LDN
              </span>
            </div>
          ) : (
            <div className="bg-surface-container-low rounded-xl p-3 flex items-center justify-between border border-outline-variant/20">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-surface-container flex items-center justify-center text-secondary">
                  <Sparkles className="h-4 w-4" />
                </div>
                <div className="flex flex-col">
                  <span className="text-xs font-semibold text-on-surface">Live Worldwide</span>
                  <span className="text-[11px] text-on-surface-variant">1,240 events hosted today</span>
                </div>
              </div>
              <div className="flex items-center gap-1 text-secondary font-semibold text-xs">
                <TrendingUp className="h-3.5 w-3.5" />
                <span>+18% this week</span>
              </div>
            </div>
          )}

          {/* Footer Card Details & Toggle */}
          <div className="flex flex-col items-center gap-2 pt-1 text-center">
            <p className="text-xs text-on-surface-variant">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}{" "}
              <button
                type="button"
                onClick={() => setMode(mode === "login" ? "register" : "login")}
                className="font-semibold text-primary hover:underline underline-offset-2 transition-colors ml-1"
              >
                {mode === "login" ? "Create an account" : "Sign in"}
              </button>
            </p>

            <div className="flex items-center justify-center gap-1.5 text-on-surface-variant text-[11px]">
              <ShieldCheck className="h-3.5 w-3.5 text-secondary" />
              <span>
                {mode === "login"
                  ? "Protected by enterprise-grade 256-bit encryption"
                  : "No credit card required • Instant access"}
              </span>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-background">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
