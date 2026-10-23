import Link from "next/link";
import { EventItem } from "@/types/event";
import { Calendar, MapPin, ArrowRight } from "lucide-react";

interface ItemCardProps {
  event: EventItem;
}

export default function ItemCard({ event }: ItemCardProps) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-xl bg-surface-container-lowest shadow-sm border border-outline-variant/30 transition-all duration-200 hover:-translate-y-1 hover:shadow-md">
      <div className="relative aspect-video w-full overflow-hidden bg-surface-container">
        {event.imageUrl ? (
          <img
            src={event.imageUrl}
            alt={event.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center bg-primary-fixed text-primary font-semibold">
            {event.category || "Event"}
          </div>
        )}
        <div className="absolute top-3 left-3 rounded-full bg-primary-container px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-on-primary">
          {event.category}
        </div>
      </div>

      <div className="flex flex-1 flex-col justify-between p-4 gap-3">
        <div>
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mb-1.5">
            <Calendar className="h-3.5 w-3.5 text-primary" />
            <span>{event.date}</span>
          </div>
          <h3 className="font-bold text-lg text-on-surface line-clamp-1 group-hover:text-primary transition-colors">
            {event.title}
          </h3>
          <p className="text-sm text-on-surface-variant line-clamp-2 mt-1">
            {event.shortDescription || event.description}
          </p>
          <div className="flex items-center gap-1.5 text-xs text-on-surface-variant mt-2">
            <MapPin className="h-3.5 w-3.5" />
            <span className="truncate">{event.location}</span>
          </div>
        </div>

        <div className="flex items-center justify-between border-t border-outline-variant/20 pt-3 mt-auto">
          <div>
            <span className="text-[10px] uppercase font-bold text-on-surface-variant">Price</span>
            <p className="font-bold text-base text-on-surface">
              {event.price === 0 ? "Free" : `$${event.price}`}
            </p>
          </div>
          <Link
            href={`/items/${event.id}`}
            className="inline-flex items-center gap-1 rounded-lg bg-primary px-3 py-1.5 text-xs font-semibold text-on-primary hover:bg-primary-container transition-colors"
          >
            <span>View Details</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
