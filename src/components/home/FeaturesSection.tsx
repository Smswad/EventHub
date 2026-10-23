import { Ticket, BarChart3, Compass, Megaphone } from "lucide-react";

const features = [
  {
    icon: Ticket,
    title: "Seamless Ticketing & Fast Checkout",
    description: "Instant digital QR passes, Apple Wallet integration, and secure friction-free multi-currency payments.",
    iconBg: "bg-primary-fixed",
    iconColor: "text-primary",
  },
  {
    icon: BarChart3,
    title: "Real-time Analytics & Insights",
    description: "Track revenue velocity, door check-in rates, drop-offs, and geographic audience pacing as it unfolds.",
    iconBg: "bg-secondary-fixed",
    iconColor: "text-on-secondary-fixed-variant",
  },
  {
    icon: Compass,
    title: "Smart Discovery & Recommendations",
    description: "Contextual algorithmic matching connecting attendees directly to preferred creators, summits, and scenes.",
    iconBg: "bg-primary-fixed",
    iconColor: "text-primary",
  },
  {
    icon: Megaphone,
    title: "Integrated Promotion & Community",
    description: "Native referral incentives, automated broadcast email tools, and interactive attendee chat lounges.",
    iconBg: "bg-secondary-fixed",
    iconColor: "text-on-secondary-fixed-variant",
  },
];

export default function FeaturesSection() {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-surface-container-lowest">
      <div className="max-w-7xl mx-auto px-margin">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <span className="text-xs uppercase tracking-wider text-secondary font-bold mb-3 block">
            POWERFUL PLATFORM
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight mb-4">
            Why EventHub
          </h2>
          <p className="text-sm sm:text-base text-on-surface-variant leading-relaxed">
            Built for precision, community scale, and instant operations from first click to venue entry.
          </p>
        </div>

        {/* 4 Equal-height Feature Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <div
                key={idx}
                tabIndex={0}
                className="group flex flex-col h-full p-6 rounded-xl bg-surface-container-low hover:bg-surface-container transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-1 border border-outline-variant/30 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <div
                  className={`w-12 h-12 rounded-xl ${feature.iconBg} flex items-center justify-center ${feature.iconColor} mb-5 group-hover:scale-105 transition-transform duration-200 shrink-0`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-base sm:text-lg font-bold text-on-surface mb-2.5">
                  {feature.title}
                </h3>
                <p className="text-xs sm:text-sm text-on-surface-variant leading-relaxed mt-auto">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
