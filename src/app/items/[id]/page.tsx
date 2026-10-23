import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getEventById, getRelatedEvents } from "@/lib/events";
import ItemCard from "@/components/ItemCard";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Users,
  Star,
  CheckCircle,
  Share2,
  Bookmark,
  Layers,
  Sparkles,
  Ticket,
  Lock,
  QrCode,
  ShieldCheck,
  Wallet,
} from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    return {
      title: "Event Not Found — EventHub",
      description: "The requested event could not be located on EventHub.",
    };
  }

  return {
    title: `${event.title} — EventHub`,
    description: event.shortDescription || event.fullDescription.slice(0, 160),
    openGraph: {
      title: event.title,
      description: event.shortDescription || event.fullDescription.slice(0, 160),
      images: event.imageUrl ? [{ url: event.imageUrl }] : [],
    },
  };
}

export default async function ItemDetailsPage({ params }: PageProps) {
  const { id } = await params;
  const event = await getEventById(id);

  if (!event) {
    notFound();
  }

  const relatedEvents = await getRelatedEvents(event.category, event.id);

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto px-margin py-8">
      {/* 1. Breadcrumbs & Top Utilities matching Stitch */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-3 min-w-0">
          <Link
            href="/items"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs sm:text-sm transition-colors group shadow-xs border border-outline-variant/30"
          >
            <ArrowLeft className="h-4 w-4 text-on-surface-variant group-hover:-translate-x-0.5 transition-transform" />
            <span>Back to Events</span>
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-on-surface-variant text-xs sm:text-sm truncate">
            <span>/</span>
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <span>/</span>
            <Link href="/items" className="hover:text-primary transition-colors">
              Events
            </Link>
            <span>/</span>
            <span className="text-on-surface font-semibold truncate max-w-[200px] md:max-w-xs">
              {event.title}
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs sm:text-sm transition-colors border border-outline-variant/20 shadow-xs"
            title="Share event"
          >
            <Share2 className="h-4 w-4 text-on-surface-variant" />
            <span className="hidden sm:inline">Share</span>
          </button>
          <button
            type="button"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs sm:text-sm transition-colors border border-outline-variant/20 shadow-xs"
            title="Save to bookmarks"
          >
            <Bookmark className="h-4 w-4 text-on-surface-variant" />
            <span className="hidden sm:inline">Save</span>
          </button>
        </div>
      </div>

      {/* 2. Hero Media Banner matching Stitch */}
      <section className="flex flex-col gap-4 mb-8">
        <div className="relative w-full aspect-[21/9] min-h-[280px] max-h-[460px] rounded-2xl overflow-hidden shadow-sm bg-surface-container border border-outline-variant/30">
          {event.imageUrl ? (
            <Image
              src={event.imageUrl}
              alt={event.title}
              fill
              priority
              sizes="(max-width: 1280px) 100vw, 1280px"
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-primary-fixed text-primary font-bold text-xl">
              {event.title}
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />

          {/* Floating Badges */}
          <div className="absolute top-4 left-4 flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface text-xs font-semibold shadow-sm">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
              <span>Verified Community Event</span>
            </span>
            <span className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface text-xs font-semibold shadow-sm">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              <span>{event.category}</span>
            </span>
          </div>

          <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full bg-primary text-on-primary text-xs font-bold uppercase tracking-wider shadow-sm">
                {event.category}
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 px-3 py-1 rounded-full bg-surface-container-lowest/90 backdrop-blur-md text-on-surface text-xs font-semibold">
                <CheckCircle className="h-3.5 w-3.5 text-primary" />
                <span>Verified Host</span>
              </span>
            </div>
            <span className="text-white/90 text-xs sm:text-sm font-medium hidden md:inline truncate max-w-sm">
              {event.location}
            </span>
          </div>
        </div>

        {/* Title & Ratings Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-3 pt-2">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold uppercase">
                {event.category}
              </span>
              <span className="flex items-center gap-1 text-secondary text-sm font-bold">
                <Star className="h-4 w-4 fill-secondary text-secondary" />
                <span className="text-on-surface font-extrabold text-base leading-none">
                  {event.rating ? event.rating.toFixed(1) : "5.0"}
                </span>
                <span className="text-on-surface-variant font-normal text-xs">
                  (Verified Attendee Reviews)
                </span>
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mt-1">
              {event.title}
            </h1>
          </div>
        </div>
      </section>

      {/* 3. Main Content & Sticky Booking Layout (8 cols / 4 cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
        
        {/* LEFT COLUMN: Main Event Details */}
        <div className="lg:col-span-8 flex flex-col gap-8">
          
          {/* Quick Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-4 sm:p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30">
            {/* Date & Time */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                <Calendar className="h-5 w-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">
                  Date & Time
                </span>
                <span className="text-sm font-bold text-on-surface mt-0.5">
                  {formatDate(event.date)}
                </span>
                <span className="text-xs text-on-surface-variant">Scheduled Start</span>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-secondary flex items-center justify-center shrink-0">
                <MapPin className="h-5 w-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">
                  Venue Location
                </span>
                <span className="text-sm font-bold text-on-surface truncate mt-0.5">
                  {event.location}
                </span>
                <span className="text-xs text-on-surface-variant truncate">Physical presence</span>
              </div>
            </div>

            {/* Capacity */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low">
              <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
                <Users className="h-5 w-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">
                  Capacity & Seats
                </span>
                <span className="text-sm font-bold text-on-surface mt-0.5">
                  {event.capacity ? `${event.capacity.toLocaleString()} Attendees Max` : "Open Capacity"}
                </span>
                <span className="text-xs text-secondary font-medium">Spots filling quickly</span>
              </div>
            </div>

            {/* Category / Format */}
            <div className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low">
              <div className="w-10 h-10 rounded-xl bg-secondary-fixed text-on-secondary-fixed-variant flex items-center justify-center shrink-0">
                <Layers className="h-5 w-5" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">
                  Format
                </span>
                <span className="text-sm font-bold text-on-surface mt-0.5">
                  {event.category} Gathering
                </span>
                <span className="text-xs text-on-surface-variant">Live Experience</span>
              </div>
            </div>
          </div>

          {/* Organizer Profile Strip */}
          <div className="flex items-center justify-between p-4 sm:p-5 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 gap-4">
            <div className="flex items-center gap-3.5 min-w-0">
              <div className="w-12 h-12 rounded-2xl bg-primary-container text-on-primary flex items-center justify-center font-bold text-lg shrink-0 shadow-xs">
                {event.organizer ? event.organizer.charAt(0).toUpperCase() : "O"}
              </div>
              <div className="flex flex-col min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="font-bold text-sm sm:text-base text-on-surface truncate">
                    {event.organizer}
                  </span>
                  <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                </div>
                <span className="text-xs text-on-surface-variant truncate">
                  Verified Event Organizer • EventHub Community Host
                </span>
              </div>
            </div>

            <a
              href="#contact"
              className="shrink-0 px-4 py-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface font-semibold text-xs sm:text-sm transition-colors border border-outline-variant/20 shadow-xs"
            >
              Contact
            </a>
          </div>

          {/* Full Event Description */}
          <div className="flex flex-col gap-4 bg-surface-container-lowest p-6 sm:p-8 rounded-2xl shadow-sm border border-outline-variant/30">
            <h2 className="text-xl sm:text-2xl font-extrabold text-on-surface">
              About the Experience
            </h2>
            <div className="text-on-surface-variant text-sm sm:text-base leading-relaxed whitespace-pre-line space-y-4">
              <p>{event.fullDescription || event.shortDescription}</p>
            </div>
          </div>

          {/* Specifications & Logistics */}
          {event.specifications && event.specifications.length > 0 && (
            <div className="p-6 sm:p-8 rounded-2xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 flex flex-col gap-5">
              <h2 className="text-xl sm:text-2xl font-extrabold text-on-surface">
                Event Logistics &amp; Specifications
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {event.specifications.map((spec, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 p-3.5 rounded-xl bg-surface-container-low border border-outline-variant/20"
                  >
                    <CheckCircle className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                    <span className="text-xs sm:text-sm font-medium text-on-surface">
                      {spec}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* RIGHT COLUMN: Sticky Ticket Reservation Card */}
        <aside className="lg:col-span-4 lg:sticky lg:top-20 flex flex-col gap-4">
          <div className="bg-surface-container-lowest p-6 rounded-2xl shadow-md border border-outline-variant/30 flex flex-col gap-5">
            {/* Price Header */}
            <div className="flex items-baseline justify-between border-b pb-4 border-outline-variant/20">
              <div>
                <span className="text-xs text-on-surface-variant font-medium block">
                  Registration passes
                </span>
                <div className="flex items-baseline gap-1 mt-1">
                  <span className="text-3xl sm:text-4xl font-extrabold text-on-surface">
                    {event.price === 0 ? "Free" : `$${event.price}`}
                  </span>
                  {event.price > 0 && (
                    <span className="text-xs text-on-surface-variant font-medium">
                      / attendee
                    </span>
                  )}
                </div>
              </div>
              <span className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold uppercase tracking-wider">
                Registration Open
              </span>
            </div>

            {/* Event Summary Highlights */}
            <div className="flex flex-col gap-2.5 text-xs text-on-surface-variant bg-surface-container-low p-3.5 rounded-xl">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-primary shrink-0" />
                <span className="font-medium text-on-surface">{formatDate(event.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary shrink-0" />
                <span className="truncate font-medium text-on-surface">{event.location}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary shrink-0" />
                <span>{event.capacity ? `${event.capacity} total seats` : "General admission"}</span>
              </div>
            </div>

            {/* Action CTA */}
            <button
              type="button"
              className="w-full py-3.5 px-4 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 group active:scale-[0.99]"
            >
              <Ticket className="h-4 w-4" />
              <span>Get Tickets Now</span>
            </button>

            {/* Trust Badges */}
            <div className="flex flex-col gap-2.5 pt-2 text-on-surface-variant text-xs border-t border-outline-variant/20">
              <div className="flex items-center gap-2">
                <QrCode className="h-4 w-4 text-secondary shrink-0" />
                <span>Instant digital QR tickets sent via email</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-secondary shrink-0" />
                <span>100% Guaranteed admission &amp; flexible refunds</span>
              </div>
              <div className="flex items-center gap-2">
                <Wallet className="h-4 w-4 text-secondary shrink-0" />
                <span>Instant confirmation on verified checkout</span>
              </div>
            </div>
          </div>
        </aside>

      </div>

      {/* 4. Related Events Section (up to 3) */}
      {relatedEvents.length > 0 && (
        <section className="mt-12 pt-10 border-t border-outline-variant/30 flex flex-col gap-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3">
            <div>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                Related Events You Might Like
              </h2>
              <p className="text-sm text-on-surface-variant mt-1">
                Explore similar {event.category.toLowerCase()}s and community experiences.
              </p>
            </div>
            <Link
              href={`/items?category=${encodeURIComponent(event.category)}`}
              className="font-bold text-sm text-primary hover:underline inline-flex items-center gap-1 shrink-0"
            >
              <span>Explore All {event.category}s</span>
              <ArrowLeft className="h-4 w-4 rotate-180" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {relatedEvents.map((relEvent) => (
              <ItemCard key={relEvent.id} event={relEvent} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
