import Link from "next/link";
import { Ticket } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full border-t border-outline-variant/40 bg-surface-container-lowest">
      <div className="mx-auto max-w-7xl px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2 flex flex-col gap-3">
            <div className="flex items-center gap-2 text-primary font-bold text-lg">
              <Ticket className="h-5 w-5" />
              <span>EventHub</span>
            </div>
            <p className="text-on-surface-variant text-sm max-w-sm">
              Discover, host, and celebrate extraordinary events. Your complete community ticketing and organizer ecosystem.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-on-surface text-sm uppercase tracking-wider">Quick Links</h4>
            <Link href="/" className="text-on-surface-variant text-sm hover:text-primary transition-colors">
              Home
            </Link>
            <Link href="/items" className="text-on-surface-variant text-sm hover:text-primary transition-colors">
              Explore Events
            </Link>
            <Link href="/about" className="text-on-surface-variant text-sm hover:text-primary transition-colors">
              About Us
            </Link>
          </div>

          <div className="flex flex-col gap-2">
            <h4 className="font-semibold text-on-surface text-sm uppercase tracking-wider">Organizers</h4>
            <Link href="/items/add" className="text-on-surface-variant text-sm hover:text-primary transition-colors">
              Host an Event
            </Link>
            <Link href="/items/manage" className="text-on-surface-variant text-sm hover:text-primary transition-colors">
              Manage Events
            </Link>
          </div>
        </div>

        <div className="pt-6 border-t border-outline-variant/30 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-on-surface-variant">
          <p>© 2026 EventHub Inc. All rights reserved.</p>
          <p>Connecting communities through live experiences.</p>
        </div>
      </div>
    </footer>
  );
}
