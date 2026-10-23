"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import {
  Ticket,
  ChevronDown,
  PlusCircle,
  CalendarCheck,
  LogOut,
  LogIn,
  UserPlus,
  Menu,
  X,
  User as UserIcon,
} from "lucide-react";
import toast from "react-hot-toast";

export default function Navbar() {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const userMenuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  // Close dropdowns on route changes
  useEffect(() => {
    setIsUserMenuOpen(false);
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        userMenuRef.current &&
        !userMenuRef.current.contains(event.target as Node)
      ) {
        setIsUserMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Signed out successfully.");
      setIsUserMenuOpen(false);
      setIsMobileMenuOpen(false);
    } catch {
      toast.error("Failed to sign out.");
    }
  };

  const getUserInitials = (): string => {
    if (!user) return "U";
    if (user.displayName) {
      const parts = user.displayName.trim().split(/\s+/);
      if (parts.length >= 2) {
        return (parts[0][0] + parts[1][0]).toUpperCase();
      }
      return parts[0].slice(0, 2).toUpperCase();
    }
    if (user.email) {
      return user.email.slice(0, 2).toUpperCase();
    }
    return "U";
  };

  const isActive = (path: string): boolean => {
    if (path === "/") return pathname === "/";
    if (path === "/items") {
      return (
        pathname.startsWith("/items") &&
        pathname !== "/items/add" &&
        pathname !== "/items/manage"
      );
    }
    return pathname.startsWith(path);
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/40">
      <div className="h-16 max-w-7xl mx-auto px-margin flex items-center justify-between gap-gutter">
        
        {/* Brand Logo */}
        <Link
          href="/"
          className="flex items-center gap-space-sm text-primary font-bold text-xl tracking-tight transition-transform active:scale-95"
        >
          <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary shadow-xs">
            <Ticket className="h-5 w-5" />
          </div>
          <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
            EventHub
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-space-lg">
          <Link
            href="/"
            className={`font-label-lg text-label-lg transition-colors ${
              isActive("/")
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Home
          </Link>
          <Link
            href="/items"
            className={`font-label-lg text-label-lg transition-colors ${
              isActive("/items")
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            Events
          </Link>
          <Link
            href="/items/manage"
            className={`font-label-lg text-label-lg transition-colors inline-flex items-center gap-1.5 ${
              pathname === "/items/manage"
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            <span>Manage Events</span>
            {!user && (
              <span className="text-[10px] bg-surface-container-high text-on-surface-variant px-1.5 py-0.5 rounded font-medium">
                Private
              </span>
            )}
          </Link>
          <Link
            href="/about"
            className={`font-label-lg text-label-lg transition-colors ${
              isActive("/about")
                ? "text-primary font-bold"
                : "text-on-surface-variant hover:text-on-surface"
            }`}
          >
            About
          </Link>
          <a
            href="#contact"
            className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface transition-colors"
          >
            Contact
          </a>
        </nav>

        {/* Right Action Area */}
        <div className="flex items-center gap-space-sm">
          {user ? (
            <div className="flex items-center gap-3">
              {/* Host Event Button matching Stitch */}
              <Link
                href="/items/add"
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-secondary-container text-on-secondary-container font-semibold text-xs shadow-xs hover:bg-secondary hover:text-on-secondary transition-all"
              >
                <PlusCircle className="h-4 w-4" />
                <span>Host Event</span>
              </Link>

              {/* Logged-In User Dropdown matching Stitch Add Event screen */}
              <div className="relative flex items-center" ref={userMenuRef}>
              <button
                type="button"
                id="user-menu-button"
                aria-expanded={isUserMenuOpen}
                aria-haspopup="true"
                onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                className="flex items-center gap-1.5 p-1 rounded-full hover:bg-surface-container transition-colors focus:outline-none ring-2 ring-primary/40 ring-offset-2 ring-offset-surface-container-lowest"
              >
                {user.photoURL ? (
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    className="w-9 h-9 rounded-full object-cover shadow-sm"
                  />
                ) : (
                  <div className="w-9 h-9 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-label-lg text-label-lg font-bold shadow-sm">
                    {getUserInitials()}
                  </div>
                )}
                <ChevronDown
                  className={`h-4 w-4 text-on-surface-variant transition-transform duration-200 ${
                    isUserMenuOpen ? "rotate-180" : ""
                  }`}
                />
              </button>

              {/* User Menu Dropdown */}
              {isUserMenuOpen && (
                <div
                  role="menu"
                  aria-labelledby="user-menu-button"
                  aria-orientation="vertical"
                  className="absolute right-0 top-full mt-2 w-64 rounded-xl bg-surface-container-lowest border border-outline-variant/40 shadow-xl py-space-xs z-50 animate-in fade-in zoom-in-95 duration-100"
                >
                  {/* User Profile Header */}
                  <div className="px-space-md py-space-sm border-b border-outline-variant/40">
                    <p className="font-label-lg text-label-lg text-on-surface font-semibold truncate">
                      {user.displayName || "Event Enthusiast"}
                    </p>
                    <p className="font-body-sm text-body-sm text-on-surface-variant truncate">
                      {user.email || ""}
                    </p>
                  </div>

                  {/* Links */}
                  <div className="py-space-xs flex flex-col">
                    <Link
                      href="/items/add"
                      role="menuitem"
                      onClick={() => setIsUserMenuOpen(false)}
                      className={`flex items-center gap-space-sm px-space-md py-2.5 font-label-lg text-label-lg transition-colors ${
                        pathname === "/items/add"
                          ? "text-primary bg-primary-fixed/40 font-semibold"
                          : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                      }`}
                    >
                      <PlusCircle className="h-5 w-5 text-primary" />
                      <div className="flex flex-col">
                        <span>Add Event</span>
                        <span className="text-[10px] text-on-surface-variant/70 -mt-0.5 font-medium">Add Product</span>
                      </div>
                    </Link>

                    <Link
                      href="/items/manage"
                      role="menuitem"
                      onClick={() => setIsUserMenuOpen(false)}
                      className={`flex items-center gap-space-sm px-space-md py-2.5 font-label-lg text-label-lg transition-colors ${
                        pathname === "/items/manage"
                          ? "text-primary bg-primary-fixed/40 font-semibold"
                          : "text-on-surface-variant hover:text-on-surface hover:bg-surface-container"
                      }`}
                    >
                      <CalendarCheck className="h-5 w-5 text-on-surface-variant" />
                      <div className="flex flex-col">
                        <span>Manage Events</span>
                        <span className="text-[10px] text-on-surface-variant/70 -mt-0.5 font-medium">Manage Products</span>
                      </div>
                    </Link>
                  </div>

                  {/* Logout Button */}
                  <div className="border-t border-outline-variant/40 pt-space-xs mt-1">
                    <button
                      type="button"
                      role="menuitem"
                      onClick={handleLogout}
                      className="w-full flex items-center gap-space-sm px-space-md py-2.5 font-label-lg text-label-lg text-error hover:bg-error-container/20 transition-colors text-left"
                    >
                      <LogOut className="h-5 w-5 text-error" />
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
              </div>
            </div>
          ) : (
            /* Logged-Out Actions */
            <div className="hidden sm:flex items-center gap-space-sm">
              <Link
                href="/items/add"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-outline-variant/40 hover:bg-surface-container text-xs font-semibold text-on-surface transition-colors"
                title="Host an event (Protected route - redirects to login)"
              >
                <PlusCircle className="h-3.5 w-3.5 text-secondary" />
                <span>Host Event</span>
              </Link>
              <Link
                href="/login"
                className="font-label-lg text-label-lg text-on-surface-variant hover:text-on-surface px-space-md py-space-xs rounded-lg transition-colors font-semibold"
              >
                Login
              </Link>
              <Link
                href="/login"
                className="font-label-lg text-label-lg bg-primary-container text-on-primary hover:bg-primary transition-colors px-space-md py-space-xs rounded-xl shadow-sm font-semibold"
              >
                Register
              </Link>
            </div>
          )}

          {/* Mobile Hamburger Toggle Button */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile navigation menu"
            className="md:hidden p-2 rounded-xl text-on-surface-variant hover:text-on-surface hover:bg-surface-container transition-colors"
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer / Panel */}
      {isMobileMenuOpen && (
        <div
          ref={mobileMenuRef}
          className="md:hidden border-t border-outline-variant/30 bg-surface-container-lowest px-margin py-4 flex flex-col gap-3 shadow-lg animate-in slide-in-from-top-2 duration-150"
        >
          <nav className="flex flex-col gap-1">
            <Link
              href="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg font-label-lg text-label-lg transition-colors ${
                isActive("/")
                  ? "bg-primary-fixed/30 text-primary font-bold"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              Home
            </Link>
            <Link
              href="/items"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg font-label-lg text-label-lg transition-colors ${
                isActive("/items")
                  ? "bg-primary-fixed/30 text-primary font-bold"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              Events
            </Link>
            <Link
              href="/items/manage"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg font-label-lg text-label-lg transition-colors flex items-center justify-between ${
                pathname === "/items/manage"
                  ? "bg-primary-fixed/30 text-primary font-bold"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <span>Manage Events</span>
              {!user && (
                <span className="text-[10px] bg-surface-container-high px-1.5 py-0.5 rounded text-on-surface-variant">
                  Private
                </span>
              )}
            </Link>
            <Link
              href="/about"
              onClick={() => setIsMobileMenuOpen(false)}
              className={`px-3 py-2 rounded-lg font-label-lg text-label-lg transition-colors ${
                isActive("/about")
                  ? "bg-primary-fixed/30 text-primary font-bold"
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              About
            </Link>
            <a
              href="#contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg font-label-lg text-label-lg text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
            >
              Contact
            </a>
          </nav>

          <div className="border-t border-outline-variant/30 pt-3">
            {user ? (
              <div className="flex flex-col gap-2">
                <div className="px-3 py-1 flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center font-bold text-xs">
                    {getUserInitials()}
                  </div>
                  <div className="flex flex-col min-w-0">
                    <span className="text-xs font-semibold text-on-surface truncate">
                      {user.displayName || "User"}
                    </span>
                    <span className="text-[11px] text-on-surface-variant truncate">
                      {user.email || ""}
                    </span>
                  </div>
                </div>

                <Link
                  href="/items/add"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold text-primary hover:bg-primary-fixed/30 transition-colors"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Add Event (Add Product)</span>
                </Link>

                <Link
                  href="/items/manage"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-on-surface-variant hover:bg-surface-container transition-colors"
                >
                  <CalendarCheck className="h-4 w-4" />
                  <span>Manage Events (Manage Products)</span>
                </Link>

                <button
                  type="button"
                  onClick={handleLogout}
                  className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm font-medium text-error hover:bg-error-container/20 transition-colors text-left"
                >
                  <LogOut className="h-4 w-4" />
                  <span>Logout</span>
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-2 pt-1">
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2 px-3 rounded-lg border border-outline-variant text-sm font-semibold text-on-surface hover:bg-surface-container transition-colors text-center"
                >
                  Login
                </Link>
                <Link
                  href="/login"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="flex items-center justify-center py-2 px-3 rounded-lg bg-primary-container text-on-primary text-sm font-semibold hover:bg-primary transition-colors text-center shadow-sm"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
