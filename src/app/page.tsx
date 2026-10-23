import Link from "next/link";
import { ArrowRight, Calendar, Users, Sparkles } from "lucide-react";

export default function HomePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-surface-container-low py-16 sm:py-24">
        <div className="mx-auto max-w-7xl px-margin text-center flex flex-col items-center">
          <div className="inline-flex items-center gap-2 rounded-full bg-surface-container-lowest px-4 py-1.5 shadow-sm text-xs font-semibold text-on-surface mb-6">
            <Sparkles className="h-4 w-4 text-secondary" />
            <span>Discover over 50,000+ verified events worldwide</span>
          </div>

          <h1 className="max-w-4xl text-4xl sm:text-5xl font-extrabold tracking-tight text-on-surface">
            Discover Unforgettable Experiences & Host{" "}
            <span className="text-primary">World-Class Events</span>
          </h1>

          <p className="mt-4 max-w-2xl text-base sm:text-lg text-on-surface-variant">
            EventHub is the premier ecosystem to unlock verified tickets, connect with passionate communities, and execute effortless event check-in logistics.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-4 w-full sm:w-auto justify-center">
            <Link
              href="/items"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3.5 text-sm font-bold text-on-primary shadow-sm hover:bg-primary-container transition-all"
            >
              <span>Explore Events</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/items/add"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-surface-container-lowest border border-outline-variant/40 px-6 py-3.5 text-sm font-bold text-on-surface hover:bg-surface-container transition-all"
            >
              <Calendar className="h-4 w-4 text-primary" />
              <span>Host an Event</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
