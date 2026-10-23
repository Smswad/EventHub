"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import ItemCard from "@/components/ItemCard";
import { getEvents } from "@/lib/events";
import { Event, EventCategory } from "@/types/event";
import {
  Search,
  Filter,
  RotateCcw,
  Star,
  Tag,
  DollarSign,
  ChevronDown,
  X,
  CalendarCheck,
  SearchX,
  Compass,
  Home,
  CheckCircle2,
  SlidersHorizontal,
} from "lucide-react";

const CATEGORIES: EventCategory[] = [
  "Conference",
  "Concert",
  "Workshop",
  "Sports",
  "Networking",
  "Wedding",
];

type PriceRange = "all" | "free" | "under50" | "50-200" | "200plus";

function EventsContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters State
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedPrice, setSelectedPrice] = useState<PriceRange>("all");
  const [selectedRating, setSelectedRating] = useState<string>("all");
  const [sortBy, setSortBy] = useState<string>("upcoming");

  // Read initial ?category= from URL query params
  useEffect(() => {
    const catParam = searchParams.get("category");
    if (catParam) {
      // Find case-insensitive match
      const matched = CATEGORIES.find(
        (c) => c.toLowerCase() === catParam.toLowerCase()
      );
      if (matched) {
        setSelectedCategory(matched);
      }
    }
  }, [searchParams]);

  // Load events from Firestore
  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      setLoading(true);
      try {
        const data = await getEvents();
        if (isMounted) {
          setEvents(data);
        }
      } catch (err) {
        console.error("Failed to load events:", err);
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }
    loadData();
    return () => {
      isMounted = false;
    };
  }, []);

  // Filter and Sort Logic
  const filteredEvents = useMemo(() => {
    return events
      .filter((event) => {
        // 1. Live search in title + description
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const inTitle = event.title.toLowerCase().includes(q);
          const inShort = (event.shortDescription || "").toLowerCase().includes(q);
          const inFull = (event.fullDescription || "").toLowerCase().includes(q);
          const inLocation = (event.location || "").toLowerCase().includes(q);
          if (!inTitle && !inShort && !inFull && !inLocation) {
            return false;
          }
        }

        // 2. Category filter
        if (selectedCategory !== "all") {
          if (event.category.toLowerCase() !== selectedCategory.toLowerCase()) {
            return false;
          }
        }

        // 3. Price filter (All, Free, <50, 50-200, 200+)
        if (selectedPrice === "free" && event.price !== 0) {
          return false;
        }
        if (selectedPrice === "under50" && (event.price <= 0 || event.price >= 50)) {
          return false;
        }
        if (selectedPrice === "50-200" && (event.price < 50 || event.price > 200)) {
          return false;
        }
        if (selectedPrice === "200plus" && event.price < 200) {
          return false;
        }

        // 4. Minimum rating filter
        if (selectedRating !== "all") {
          const minRating = parseFloat(selectedRating);
          if (isNaN(minRating) || event.rating < minRating) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        if (sortBy === "rating") {
          return b.rating - a.rating;
        }
        if (sortBy === "price-low") {
          return a.price - b.price;
        }
        if (sortBy === "price-high") {
          return b.price - a.price;
        }
        // default upcoming: sort by date ascending
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      });
  }, [events, searchQuery, selectedCategory, selectedPrice, selectedRating, sortBy]);

  // Clear all filters handler
  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setSelectedPrice("all");
    setSelectedRating("all");
    setSortBy("upcoming");
    router.replace("/items");
  };

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedCategory !== "all" ||
    selectedPrice !== "all" ||
    selectedRating !== "all";

  return (
    <div className="w-full max-w-7xl mx-auto px-margin py-8">
      {/* 1. Page Header matching Stitch */}
      <section className="flex flex-col gap-2 mb-8">
        <nav
          aria-label="Breadcrumb"
          className="flex items-center gap-2 text-on-surface-variant text-xs sm:text-sm font-medium"
        >
          <Link
            href="/"
            className="hover:text-primary transition-colors flex items-center gap-1"
          >
            <Home className="h-4 w-4" />
            <span>Home</span>
          </Link>
          <span className="text-outline-variant">/</span>
          <span className="text-on-surface font-semibold">Events</span>
        </nav>

        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mt-1">
          <div>
            <span className="text-[11px] uppercase tracking-wider text-primary font-bold bg-primary-fixed px-3 py-1 rounded-full inline-block mb-2">
              Discover Community
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              Explore Events
            </h1>
            <p className="text-sm sm:text-base text-on-surface-variant mt-1.5 max-w-2xl">
              Find upcoming conferences, concerts, workshops, and gatherings tailored for your professional and creative journey.
            </p>
          </div>

          <div className="hidden lg:flex items-center gap-2.5 bg-surface-container px-4 py-2 rounded-xl self-start md:self-auto border border-outline-variant/30">
            <span className="flex h-2.5 w-2.5 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-error" />
            </span>
            <span className="text-xs font-semibold text-on-surface">
              18 events added this week
            </span>
          </div>
        </div>
      </section>

      {/* 2. Search & Filter Bar matching Stitch */}
      <section className="relative z-20 mb-8">
        <div className="bg-surface-container-lowest rounded-2xl p-4 sm:p-5 shadow-sm border border-outline-variant/30">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 sm:gap-4 items-center">
            
            {/* Live Search Input */}
            <div className="lg:col-span-4 relative flex items-center">
              <Search className="absolute left-3.5 h-4 w-4 text-on-surface-variant pointer-events-none" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by event title, keyword, or speaker..."
                className="w-full h-11 pl-10 pr-9 bg-surface-container-low text-on-surface text-sm rounded-xl focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/25 border border-outline-variant/30 transition-all placeholder:text-on-surface-variant/60"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 text-on-surface-variant hover:text-on-surface p-1 rounded-full transition-colors"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>

            {/* Category Dropdown */}
            <div className="lg:col-span-2 relative flex items-center">
              <Tag className="absolute left-3 h-4 w-4 text-on-surface-variant pointer-events-none" />
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="w-full h-11 pl-9 pr-8 bg-surface-container-low text-on-surface text-sm rounded-xl appearance-none focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/25 border border-outline-variant/30 transition-all cursor-pointer font-medium"
              >
                <option value="all">All Categories</option>
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-2.5 h-4 w-4 text-on-surface-variant pointer-events-none" />
            </div>

            {/* Price Range Dropdown */}
            <div className="lg:col-span-2 relative flex items-center">
              <DollarSign className="absolute left-3 h-4 w-4 text-on-surface-variant pointer-events-none" />
              <select
                value={selectedPrice}
                onChange={(e) => setSelectedPrice(e.target.value as PriceRange)}
                className="w-full h-11 pl-9 pr-8 bg-surface-container-low text-on-surface text-sm rounded-xl appearance-none focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/25 border border-outline-variant/30 transition-all cursor-pointer font-medium"
              >
                <option value="all">All Prices</option>
                <option value="free">Free ($0)</option>
                <option value="under50">&lt; $50</option>
                <option value="50-200">$50 - $200</option>
                <option value="200plus">$200+</option>
              </select>
              <ChevronDown className="absolute right-2.5 h-4 w-4 text-on-surface-variant pointer-events-none" />
            </div>

            {/* Minimum Rating Dropdown */}
            <div className="lg:col-span-2 relative flex items-center">
              <Star className="absolute left-3 h-4 w-4 text-secondary fill-secondary pointer-events-none" />
              <select
                value={selectedRating}
                onChange={(e) => setSelectedRating(e.target.value)}
                className="w-full h-11 pl-9 pr-8 bg-surface-container-low text-on-surface text-sm rounded-xl appearance-none focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/25 border border-outline-variant/30 transition-all cursor-pointer font-medium"
              >
                <option value="all">Any Rating</option>
                <option value="4.0">4.0+ Stars</option>
                <option value="4.5">4.5+ Stars</option>
                <option value="4.8">4.8+ Stars</option>
              </select>
              <ChevronDown className="absolute right-2.5 h-4 w-4 text-on-surface-variant pointer-events-none" />
            </div>

            {/* Clear Filters Button */}
            <div className="lg:col-span-2 flex items-center">
              <button
                type="button"
                onClick={handleClearFilters}
                disabled={!hasActiveFilters}
                className="w-full h-11 px-4 flex items-center justify-center gap-2 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface-variant hover:text-on-surface text-xs sm:text-sm font-semibold transition-all disabled:opacity-50 disabled:cursor-not-allowed border border-outline-variant/20"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Clear filters</span>
              </button>
            </div>
          </div>

          {/* Sub-bar: Result Count & Sort By */}
          <div className="mt-4 pt-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 bg-surface-container-low/50 px-4 py-2.5 rounded-xl border border-outline-variant/20">
            <div className="flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant">
              <CalendarCheck className="h-4 w-4 text-primary shrink-0" />
              <span>
                Showing{" "}
                <strong className="text-on-surface font-bold">
                  {filteredEvents.length}
                </strong>{" "}
                of <span className="font-medium">{events.length}</span> Events
              </span>
            </div>

            <div className="flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant self-end sm:self-auto">
              <label htmlFor="sort-by" className="font-medium whitespace-nowrap">
                Sort by:
              </label>
              <div className="relative inline-flex items-center">
                <select
                  id="sort-by"
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="bg-surface-container-lowest text-xs sm:text-sm text-on-surface font-semibold pl-3 pr-7 py-1.5 rounded-lg appearance-none focus:outline-none focus:ring-1 focus:ring-primary transition-all cursor-pointer shadow-xs border border-outline-variant/30"
                >
                  <option value="upcoming">Upcoming Date</option>
                  <option value="rating">Highest Rated</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-2 h-3.5 w-3.5 text-on-surface-variant pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Loading Skeletons */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, idx) => (
            <div
              key={idx}
              className="rounded-xl overflow-hidden bg-surface-container-lowest border border-outline-variant/30 p-4 flex flex-col gap-4 animate-pulse"
            >
              <div className="aspect-video w-full rounded-lg bg-surface-container" />
              <div className="h-4 w-1/3 rounded bg-surface-container" />
              <div className="h-5 w-4/5 rounded bg-surface-container" />
              <div className="h-4 w-full rounded bg-surface-container" />
              <div className="h-4 w-2/3 rounded bg-surface-container" />
              <div className="h-8 w-full rounded bg-surface-container mt-auto" />
            </div>
          ))}
        </div>
      ) : filteredEvents.length > 0 ? (
        /* 4. Responsive Event Cards Grid */
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {filteredEvents.map((event) => (
            <ItemCard key={event.id} event={event} />
          ))}
        </section>
      ) : (
        /* 5. Stitch-Matched Empty State with Reset Action */
        <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-8 sm:p-14 lg:p-20 flex flex-col items-center text-center relative overflow-hidden border border-outline-variant/30 my-6">
          {/* Decorative ambient blurs */}
          <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-96 h-96 bg-primary-fixed/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute top-1/3 -right-20 w-72 h-72 bg-secondary-fixed/30 rounded-full blur-3xl pointer-events-none" />

          {/* Central graphic composite */}
          <div className="relative mb-6">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-full bg-surface-container-low flex items-center justify-center relative shadow-sm">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-surface-container-lowest shadow-md flex items-center justify-center relative z-10 text-primary">
                <SearchX className="h-8 w-8 sm:h-10 sm:w-10 text-primary" />
              </div>
            </div>
          </div>

          {/* Empty Heading & Description */}
          <div className="max-w-xl mx-auto flex flex-col items-center gap-2 z-10">
            <span className="text-[11px] uppercase tracking-wider text-secondary font-bold bg-secondary-fixed/40 px-3 py-1 rounded-full">
              Zero Results Returned
            </span>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface">
              No events match your search
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mt-1 leading-relaxed">
              We couldn&apos;t find any events matching your current filters or query.
              Try adjusting your search terms, changing the price range, or resetting all filters.
            </p>
          </div>

          {/* Action Button Group */}
          <div className="flex flex-col sm:flex-row items-center gap-3 mt-8 z-10 w-full justify-center max-w-md">
            <button
              type="button"
              onClick={handleClearFilters}
              className="w-full sm:w-auto h-12 px-6 rounded-xl bg-primary text-on-primary font-semibold text-sm flex items-center justify-center gap-2 shadow-sm hover:bg-primary/90 transition-all active:scale-[0.98]"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Clear All Filters</span>
            </button>
            <button
              type="button"
              onClick={() => {
                handleClearFilters();
                setSelectedCategory("all");
              }}
              className="w-full sm:w-auto h-12 px-6 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-sm flex items-center justify-center gap-2 border border-outline-variant/30 transition-colors"
            >
              <Compass className="h-4 w-4 text-primary" />
              <span>Browse All Categories</span>
            </button>
          </div>

          {/* Diagnostic tips */}
          <div className="mt-10 pt-6 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left w-full max-w-2xl bg-surface-container-low/70 rounded-xl p-4 z-10 border border-outline-variant/20">
            <div className="flex items-start gap-2.5">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">Check spelling</span>
                <span className="text-[11px] text-on-surface-variant">Verify keywords and terms</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <SlidersHorizontal className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">Loosen criteria</span>
                <span className="text-[11px] text-on-surface-variant">Switch Free to Any Price</span>
              </div>
            </div>
            <div className="flex items-start gap-2.5">
              <Tag className="h-4 w-4 text-secondary shrink-0 mt-0.5" />
              <div className="flex flex-col">
                <span className="text-xs font-bold text-on-surface">Change category</span>
                <span className="text-[11px] text-on-surface-variant">Explore another domain</span>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default function EventsPage() {
  return (
    <Suspense
      fallback={
        <div className="w-full max-w-7xl mx-auto px-margin py-12 flex justify-center items-center min-h-[50vh]">
          <div className="h-8 w-8 rounded-full border-4 border-primary border-t-transparent animate-spin" />
        </div>
      }
    >
      <EventsContent />
    </Suspense>
  );
}
