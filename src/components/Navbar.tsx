"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Ticket, PlusCircle, LogIn, LogOut, User as UserIcon } from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const { user, logout } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Signed out successfully.");
    } catch {
      toast.error("Failed to sign out.");
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-outline-variant/40 bg-surface-container-lowest/90 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-margin">
        <Link href="/" className="flex items-center gap-2 text-primary font-bold text-xl tracking-tight">
          <Ticket className="h-6 w-6 text-primary" />
          <span>EventHub</span>
        </Link>

        <nav className="hidden md:flex items-center gap-6">
          <Link href="/" className="text-on-surface hover:text-primary transition-colors font-medium">
            Home
          </Link>
          <Link href="/items" className="text-on-surface-variant hover:text-primary transition-colors font-medium">
            Events
          </Link>
          <Link href="/about" className="text-on-surface-variant hover:text-primary transition-colors font-medium">
            About
          </Link>
          {user && (
            <Link href="/items/manage" className="text-on-surface-variant hover:text-primary transition-colors font-medium">
              Manage Events
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-3">
              <Link
                href="/items/add"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-xl bg-secondary-container px-3.5 py-1.5 text-on-secondary-container font-semibold text-sm hover:opacity-90 transition-opacity shadow-sm"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Host Event</span>
              </Link>

              <div className="flex items-center gap-2 bg-surface-container-low py-1 px-2.5 rounded-full border border-outline-variant/30">
                <div className="w-7 h-7 rounded-full bg-primary text-on-primary flex items-center justify-center font-bold text-xs overflow-hidden">
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover" />
                  ) : user.displayName ? (
                    user.displayName.charAt(0).toUpperCase()
                  ) : (
                    <UserIcon className="h-3.5 w-3.5" />
                  )}
                </div>
                <span className="hidden lg:inline text-xs font-semibold text-on-surface max-w-[120px] truncate">
                  {user.displayName || user.email?.split("@")[0] || "User"}
                </span>
              </div>

              <button
                onClick={handleLogout}
                className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant/50 px-2.5 py-1.5 text-xs font-medium text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
                title="Sign out"
              >
                <LogOut className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-xl bg-primary px-4 py-2 text-on-primary font-semibold text-sm hover:bg-primary/90 transition-colors shadow-sm"
            >
              <LogIn className="h-4 w-4" />
              <span>Login</span>
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
