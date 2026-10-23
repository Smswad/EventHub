"use client";

import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { Ticket, User as UserIcon, PlusCircle, LogIn, LogOut } from "lucide-react";

export default function Navbar() {
  const { user, signOut } = useAuth();

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
          <Link href="/items" className="text-on-surface-variant hover:text-primary transition-colors">
            Events
          </Link>
          <Link href="/about" className="text-on-surface-variant hover:text-primary transition-colors">
            About
          </Link>
          {user && (
            <Link href="/items/manage" className="text-on-surface-variant hover:text-primary transition-colors">
              Manage Events
            </Link>
          )}
        </nav>

        <div className="flex items-center gap-3">
          {user ? (
            <>
              <Link
                href="/items/add"
                className="hidden sm:inline-flex items-center gap-1.5 rounded-lg bg-secondary-container px-3.5 py-1.5 text-on-secondary-container font-semibold text-sm hover:opacity-90 transition-opacity"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Host Event</span>
              </Link>
              <button
                onClick={() => signOut()}
                className="inline-flex items-center gap-1.5 rounded-lg border border-outline-variant px-3 py-1.5 text-sm text-on-surface-variant hover:bg-surface-container transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-4 py-2 text-on-primary font-semibold text-sm hover:bg-primary-container transition-colors"
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
