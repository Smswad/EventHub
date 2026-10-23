import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

export default function CalloutBanner() {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-margin">
        <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-primary-container p-8 sm:p-12 md:p-16 text-center text-on-primary shadow-xl">
          
          {/* Ambient decorative blur shapes matching Stitch */}
          <div className="pointer-events-none absolute -top-20 -left-20 w-80 h-80 rounded-full bg-secondary-container/20 blur-2xl" />
          <div className="pointer-events-none absolute -bottom-20 -right-20 w-80 h-80 rounded-full bg-on-primary-container/20 blur-2xl" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center">
            
            {/* Pill Tag */}
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-sm text-xs text-secondary-fixed mb-5 uppercase tracking-wider font-bold">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Scale Your Community</span>
            </span>

            {/* Headline */}
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4 text-on-primary">
              Hosting an event? List it on EventHub
            </h2>

            {/* Subtitle */}
            <p className="text-sm sm:text-base md:text-lg text-on-primary-container max-w-2xl mb-8 leading-relaxed">
              Join over 15,000 organizers selling tickets, growing communities, and executing seamless events with zero upfront friction.
            </p>

            {/* Banner CTA */}
            <div className="flex flex-col items-center gap-2">
              <Link
                href="/items/add"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl bg-surface-container-lowest text-primary hover:bg-surface-container-low transition-all duration-200 text-sm sm:text-base font-bold shadow-lg hover:shadow-xl active:scale-[0.99] group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-offset-2 focus-visible:ring-offset-primary"
              >
                <span>Create Your Event Now</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
              <span className="text-xs text-on-primary-container/80 mt-1">
                No credit card required • Setup in under 5 minutes
              </span>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
