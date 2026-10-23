import Link from "next/link";
import Image from "next/image";
import { Event } from "@/types/event";
import {
  Calendar,
  MapPin,
  ArrowRight,
  Star,
  Presentation,
  Headphones,
  GraduationCap,
  Heart,
  Trophy,
  Users,
} from "lucide-react";

interface ItemCardProps {
  event: Event;
}

export default function ItemCard({ event }: ItemCardProps) {
  // Format date nicely if valid ISO string
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const getCategoryIcon = (cat: string) => {
    switch ((cat || "").toLowerCase()) {
      case "conference":
        return <Presentation className="h-3 w-3" />;
      case "concert":
        return <Headphones className="h-3 w-3" />;
      case "workshop":
        return <GraduationCap className="h-3 w-3" />;
      case "wedding":
        return <Heart className="h-3 w-3" />;
      case "sports":
        return <Trophy className="h-3 w-3" />;
      case "networking":
        return <Users className="h-3 w-3" />;
      default:
        return null;
    }
  };

  return (
    <article className="group bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full transform hover:-translate-y-1 border border-outline-variant/30 focus-within:ring-2 focus-within:ring-primary">
      {/* Thumbnail with next/image */}
      <div className="relative aspect-video w-full overflow-hidden bg-surface-container">
        {event.imageUrl ? (
          <Image
            src={event.imageUrl}
            alt={event.title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary-fixed text-primary font-bold text-sm">
            {event.category || "Event"}
          </div>
        )}

        {/* Category Badge */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-primary-container text-on-primary px-2.5 py-1 rounded-full shadow-sm text-[11px] font-bold uppercase tracking-wider">
          {getCategoryIcon(event.category)}
          <span>{event.category}</span>
        </div>

        {/* Rating Badge */}
        {event.rating && (
          <div className="absolute bottom-3 right-3 bg-inverse-surface/80 backdrop-blur-md text-inverse-on-surface px-2 py-0.5 rounded-md flex items-center gap-1 text-[11px] font-semibold">
            <Star className="h-3 w-3 fill-secondary text-secondary" />
            <span>{event.rating.toFixed(1)}</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 sm:p-5 flex flex-col flex-1 justify-between gap-3">
        <div className="flex flex-col gap-1.5">
          {/* Date info */}
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant font-medium">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            <span>{formatDate(event.date)}</span>
          </div>

          {/* Title */}
          <h2 className="font-bold text-base sm:text-lg text-on-surface group-hover:text-primary transition-colors line-clamp-1">
            {event.title}
          </h2>

          {/* 2-line clamped description */}
          <p className="text-xs sm:text-sm text-on-surface-variant line-clamp-2 leading-relaxed">
            {event.shortDescription || event.fullDescription}
          </p>

          {/* Location */}
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mt-1">
            <MapPin className="h-3.5 w-3.5 shrink-0" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        {/* Footer info: Price & CTA */}
        <div className="pt-3 border-t border-outline-variant/20 flex items-center justify-between mt-auto">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-bold tracking-wider text-on-surface-variant">
              {event.price === 0 ? "Admission" : "Starts at"}
            </span>
            <span
              className={`font-bold text-base sm:text-lg ${
                event.price === 0 ? "text-secondary" : "text-on-surface"
              }`}
            >
              {event.price === 0 ? "Free" : `$${event.price}`}
            </span>
          </div>

          <Link
            href={`/items/${event.id}`}
            className="inline-flex items-center gap-1.5 bg-primary text-on-primary hover:bg-primary-container px-3.5 py-2 rounded-lg font-semibold text-xs sm:text-sm transition-colors shadow-sm focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-1"
          >
            <span>View Details</span>
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
