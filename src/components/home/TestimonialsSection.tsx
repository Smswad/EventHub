import { Star } from "lucide-react";

const testimonials = [
  {
    quote:
      "EventHub made organizing our 3,000-person tech summit effortless. The real-time check-in and dynamic badging saved our staff hundreds of hours.",
    author: "Sarah Lin",
    role: "VP of Community, TechPulse Global",
    initials: "SL",
    avatarBg: "bg-primary-fixed text-primary",
  },
  {
    quote:
      "Finding niche indie concerts and securing verified tickets in two clicks is unmatched. By far the cleanest event discovery experience today.",
    author: "Marcus Vance",
    role: "Music Producer & Concertgoer",
    initials: "MV",
    avatarBg: "bg-secondary-fixed text-on-secondary-fixed-variant",
  },
  {
    quote:
      "From workshops to multi-day summits, EventHub’s ticket tiers and instant payouts have transformed how we monetize our community gatherings.",
    author: "Elena Rostova",
    role: "Founder, Creators Workshop Collective",
    initials: "ER",
    avatarBg: "bg-primary-fixed text-primary",
  },
];

export default function TestimonialsSection() {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-margin">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-xs uppercase tracking-wider text-secondary font-bold mb-3 block">
            COMMUNITY LOVE
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-4">
            Loved by Planners and Attendees Alike
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Discover why leading conference directors and event lovers choose EventHub for their experiences.
          </p>
        </div>

        {/* 3 Equal-height Testimonial Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              tabIndex={0}
              className="flex flex-col justify-between h-full p-6 sm:p-8 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-1 border border-outline-variant/30 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
            >
              <div>
                {/* 5-Star Row */}
                <div className="flex items-center text-secondary mb-5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-secondary text-secondary" />
                  ))}
                </div>
                <p className="text-sm sm:text-base text-on-surface leading-relaxed mb-6 italic">
                  &ldquo;{t.quote}&rdquo;
                </p>
              </div>

              <div className="flex items-center gap-3.5 pt-4 border-t border-outline-variant/20 mt-auto">
                <div
                  className={`w-11 h-11 rounded-full ${t.avatarBg} flex items-center justify-center font-bold text-sm shrink-0 shadow-xs`}
                >
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <div className="text-sm sm:text-base font-bold text-on-surface truncate">
                    {t.author}
                  </div>
                  <div className="text-xs text-on-surface-variant truncate">
                    {t.role}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
