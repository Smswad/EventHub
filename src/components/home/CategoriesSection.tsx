import Link from "next/link";
import {
  Presentation,
  Headphones,
  GraduationCap,
  Heart,
  Trophy,
  Users,
  ChevronRight,
} from "lucide-react";

const categories = [
  {
    name: "Conference",
    slug: "Conference",
    eventsCount: "1,240+ Events",
    icon: Presentation,
    bgClass: "bg-primary-fixed text-primary",
  },
  {
    name: "Concert",
    slug: "Concert",
    eventsCount: "850+ Events",
    icon: Headphones,
    bgClass: "bg-secondary-fixed text-secondary",
  },
  {
    name: "Workshop",
    slug: "Workshop",
    eventsCount: "630+ Events",
    icon: GraduationCap,
    bgClass: "bg-primary-fixed text-primary",
  },
  {
    name: "Wedding",
    slug: "Wedding",
    eventsCount: "410+ Events",
    icon: Heart,
    bgClass: "bg-secondary-fixed text-secondary",
  },
  {
    name: "Sports",
    slug: "Sports",
    eventsCount: "920+ Events",
    icon: Trophy,
    bgClass: "bg-primary-fixed text-primary",
  },
  {
    name: "Networking",
    slug: "Networking",
    eventsCount: "1,150+ Events",
    icon: Users,
    bgClass: "bg-secondary-fixed text-secondary",
  },
];

export default function CategoriesSection() {
  return (
    <section className="w-full py-16 md:py-20 lg:py-24 bg-surface">
      <div className="max-w-7xl mx-auto px-margin">
        
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 md:mb-14 gap-4">
          <div>
            <span className="text-xs uppercase tracking-wider text-secondary font-bold mb-2 block">
              CURATED SELECTIONS
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-on-surface tracking-tight">
              Browse by Category
            </h2>
          </div>
          <Link
            href="/items"
            className="inline-flex items-center gap-1 text-sm font-semibold text-primary hover:text-primary-container transition-colors group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-md"
          >
            <span>View all categories</span>
            <ChevronRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* 6 Equal-height Category Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 sm:gap-6">
          {categories.map((cat) => {
            const Icon = cat.icon;
            return (
              <Link
                key={cat.slug}
                href={`/items?category=${encodeURIComponent(cat.slug)}`}
                className="group flex flex-col items-center text-center h-full p-5 sm:p-6 rounded-xl bg-surface-container-lowest hover:bg-surface-container-high transition-all duration-200 shadow-xs hover:shadow-md hover:-translate-y-1 border border-outline-variant/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2"
              >
                <div
                  className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl ${cat.bgClass} flex items-center justify-center group-hover:scale-105 transition-transform duration-200 mb-4 shrink-0 shadow-xs`}
                >
                  <Icon className="h-6 w-6 sm:h-7 sm:w-7" />
                </div>
                <h3 className="text-sm sm:text-base font-bold text-on-surface mb-1 group-hover:text-primary transition-colors">
                  {cat.name}
                </h3>
                <span className="text-xs text-on-surface-variant font-medium mt-auto">
                  {cat.eventsCount}
                </span>
              </Link>
            );
          })}
        </div>

      </div>
    </section>
  );
}
