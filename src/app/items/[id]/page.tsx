import Link from "next/link";
import { ArrowLeft, Calendar, MapPin, Users, Ticket } from "lucide-react";

export default async function ItemDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="mx-auto max-w-7xl px-margin py-10">
      <Link
        href="/items"
        className="inline-flex items-center gap-2 text-sm text-on-surface-variant hover:text-primary transition-colors mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        <span>Back to Events</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="aspect-[21/9] w-full rounded-2xl overflow-hidden bg-surface-container flex items-center justify-center text-on-surface-variant">
            <span>Event Hero Image Placeholder (ID: {id})</span>
          </div>

          <div className="p-6 rounded-2xl bg-surface-container-lowest border border-outline-variant/30">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface mb-3">
              Event Details (ID: {id})
            </h1>
            <p className="text-on-surface-variant leading-relaxed">
              This is a placeholder for event details. Event content and full description will be loaded from Firestore.
            </p>
          </div>
        </div>

        <aside className="lg:col-span-4 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 p-6 shadow-sm flex flex-col gap-4">
          <div className="border-b border-outline-variant/20 pb-4">
            <span className="text-xs uppercase font-bold text-on-surface-variant">Registration</span>
            <div className="text-3xl font-extrabold text-on-surface mt-1">$299.00</div>
          </div>

          <div className="flex flex-col gap-2.5 text-sm text-on-surface-variant">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-primary" />
              <span>Nov 14, 2026 • 9:00 AM PST</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-primary" />
              <span>Moscone West, San Francisco</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-primary" />
              <span>1,500 Attendees Max</span>
            </div>
          </div>

          <button className="w-full h-11 inline-flex items-center justify-center gap-2 rounded-lg bg-primary font-bold text-sm text-on-primary hover:bg-primary-container transition-colors shadow-sm mt-2">
            <Ticket className="h-4 w-4" />
            <span>Get Tickets</span>
          </button>
        </aside>
      </div>
    </div>
  );
}
