import Link from "next/link";
import { Star, ArrowRight, CalendarPlus, Users, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="relative w-full overflow-hidden bg-surface-container-low pt-8 pb-16 md:pt-14 md:pb-24 lg:pb-28">
      {/* Ambient subtle background glows matching Stitch */}
      <div className="pointer-events-none absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[380px] bg-primary/10 rounded-full blur-3xl opacity-70" />
      <div className="pointer-events-none absolute top-1/3 -right-24 w-96 h-96 bg-secondary-container/20 rounded-full blur-3xl opacity-60" />

      <div className="max-w-7xl mx-auto px-margin relative z-10 flex flex-col items-center text-center">
        
        {/* Trust badge row */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-surface-container-lowest shadow-sm mb-6 border border-outline-variant/30 animate-in fade-in duration-300">
          <div className="flex items-center text-secondary-container">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-secondary-container text-secondary-container" />
            ))}
          </div>
          <span className="font-semibold text-xs text-on-surface">4.9/5 satisfaction</span>
          <span className="text-outline-variant text-xs">•</span>
          <span className="text-xs text-on-surface-variant font-medium">Over 50,000+ events hosted worldwide</span>
        </div>

        {/* Main Headline */}
        <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-on-surface max-w-4xl tracking-tight mb-5 leading-[1.15]">
          Discover Unforgettable Experiences & Host{" "}
          <span className="text-primary-container">World-Class</span>{" "}
          <span className="text-secondary-container">Events</span>
        </h1>

        {/* Subtitle */}
        <p className="text-base sm:text-lg md:text-xl text-on-surface-variant max-w-2xl mx-auto mb-8 leading-relaxed">
          EventHub is the premier ecosystem to unlock verified tickets, connect with passionate communities, and execute effortless ticketing and check-in logistics.
        </p>

        {/* Dual CTAs */}
        <div className="flex flex-col sm:flex-row items-center gap-4 mb-12 w-full sm:w-auto">
          <Link
            href="/items"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-primary-container text-on-primary hover:bg-primary transition-all duration-200 shadow-sm font-semibold text-sm group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <span>Explore Events</span>
            <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Link>
          <Link
            href="/items/add"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-surface-container-lowest text-on-surface hover:bg-surface-container transition-all duration-200 shadow-sm font-semibold text-sm border border-outline-variant/40 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
          >
            <CalendarPlus className="h-4 w-4 text-primary" />
            <span>Host an Event</span>
          </Link>
        </div>

        {/* High-Impact Hero Showcase Card */}
        <div className="relative w-full max-w-5xl mx-auto">
          <div className="relative rounded-2xl overflow-hidden shadow-xl bg-surface-container-lowest aspect-[16/9] max-h-[520px] border border-outline-variant/30">
            <img
              alt="Packed auditorium cheering at keynote conference"
              className="w-full h-full object-cover"
              src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80"
            />
            {/* Scrim Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

            {/* Floating Badge 1: Live Status & Attendees (Bottom Left) */}
            <div className="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 p-3 sm:p-4 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-md flex items-center gap-3 sm:gap-4 text-left border border-outline-variant/30">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-lg bg-primary-fixed flex items-center justify-center text-primary shrink-0">
                <Users className="h-5 w-5 sm:h-6 sm:w-6" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                  <span className="text-[10px] sm:text-xs uppercase tracking-wider text-secondary font-bold">
                    Live Stream Active
                  </span>
                </div>
                <div className="text-base sm:text-lg font-bold text-on-surface">12,480+ Attendees</div>
              </div>
            </div>

            {/* Floating Badge 2: Quick Booking Metric (Top Right) */}
            <div className="absolute top-4 right-4 sm:top-6 sm:right-6 hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl bg-surface-container-lowest/95 backdrop-blur-md shadow-md text-on-surface border border-outline-variant/30">
              <Zap className="h-4 w-4 text-secondary fill-secondary" />
              <span className="text-xs sm:text-sm font-semibold">98% Tickets Reserved</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
