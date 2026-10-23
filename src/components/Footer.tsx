import Link from "next/link";
import { Ticket, Globe, Share2, Camera, Video } from "lucide-react";

export default function Footer() {
  return (
    <footer id="contact" className="w-full bg-surface-container-lowest border-t border-outline-variant/40">
      <div className="max-w-7xl mx-auto px-margin py-space-xl">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl pb-space-xl border-b border-outline-variant/40">
          
          {/* Brand Info & Social Icons */}
          <div className="lg:col-span-2 flex flex-col gap-space-md">
            <Link href="/" className="flex items-center gap-space-sm text-primary font-bold text-xl tracking-tight">
              <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center text-primary">
                <Ticket className="h-5 w-5" />
              </div>
              <span className="font-headline-sm text-headline-sm text-on-surface tracking-tight font-bold">
                EventHub
              </span>
            </Link>

            <p className="font-body-md text-body-md text-on-surface-variant max-w-sm">
              Discover, host, and celebrate extraordinary events. Your complete community ticketing and organizer discovery ecosystem.
            </p>

            <div className="flex items-center gap-space-sm text-on-surface-variant mt-1">
              <a
                href="https://eventhub.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Global Web"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high hover:text-on-surface transition-colors"
              >
                <Globe className="h-4 w-4" />
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Community Hub"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high hover:text-on-surface transition-colors"
              >
                <Share2 className="h-4 w-4" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Photo Moments"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high hover:text-on-surface transition-colors"
              >
                <Camera className="h-4 w-4" />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noreferrer"
                aria-label="Video Stream"
                className="w-9 h-9 rounded-full bg-surface-container flex items-center justify-center hover:bg-surface-container-high hover:text-on-surface transition-colors"
              >
                <Video className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Product Links */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-lg text-label-lg text-on-surface font-semibold">Product</span>
            <Link href="/items" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Explore Events
            </Link>
            <Link href="/items/add" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Host an Event
            </Link>
            <span className="font-body-md text-body-md text-on-surface-variant/60 cursor-not-allowed">
              Pricing & Fees
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant/60 cursor-not-allowed">
              Event Check-in
            </span>
          </div>

          {/* Company Links */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-lg text-label-lg text-on-surface font-semibold">Company</span>
            <Link href="/about" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
              About Us
            </Link>
            <span className="font-body-md text-body-md text-on-surface-variant/60 cursor-not-allowed">
              Careers
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant/60 cursor-not-allowed">
              Press & Media
            </span>
            <a href="#contact" className="font-body-md text-body-md text-on-surface-variant hover:text-primary transition-colors">
              Contact
            </a>
          </div>

          {/* Resources & Legal */}
          <div className="flex flex-col gap-space-sm">
            <span className="font-label-lg text-label-lg text-on-surface font-semibold">Resources & Legal</span>
            <span className="font-body-md text-body-md text-on-surface-variant/60 cursor-not-allowed">
              Help Center
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant/60 cursor-not-allowed">
              Community Guidelines
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant/60 cursor-not-allowed">
              Privacy Policy
            </span>
            <span className="font-body-md text-body-md text-on-surface-variant/60 cursor-not-allowed">
              Terms of Service
            </span>
          </div>
        </div>

        {/* Bottom Copyright & Mission Line */}
        <div className="pt-space-lg flex flex-col md:flex-row items-center justify-between gap-space-sm">
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            © 2026 EventHub Inc. All rights reserved.
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant">
            Connecting communities through unforgettable live experiences.
          </p>
        </div>
      </div>
    </footer>
  );
}
