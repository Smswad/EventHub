import { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Sparkles,
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  Compass,
  Ticket,
  BarChart3,
  ArrowRight,
  ShieldCheck,
  HeartHandshake,
  Lock,
  PlusCircle,
  Globe2,
  Star,
} from "lucide-react";

export const metadata: Metadata = {
  title: "About Us | EventHub",
  description:
    "Learn about EventHub's mission to bridge visionary creators and attendees worldwide through trusted, transparent ticketing and live event discovery.",
};

export default function AboutPage() {
  return (
    <div className="w-full min-h-screen bg-background">
      {/* 1. Hero Section */}
      <section className="relative w-full overflow-hidden bg-background pt-12 pb-16">
        {/* Subtle Ambient Glows */}
        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[720px] h-[340px] bg-primary-fixed opacity-40 blur-3xl pointer-events-none rounded-full" />
        <div className="absolute top-48 right-10 w-72 h-72 bg-secondary-fixed opacity-30 blur-2xl pointer-events-none rounded-full" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Badge Pill */}
          <div className="flex items-center justify-center">
            <div className="inline-flex items-center gap-2 bg-primary-fixed/60 text-primary px-4 py-1.5 rounded-full shadow-xs">
              <Sparkles className="h-4 w-4" />
              <span className="text-xs tracking-wider uppercase font-bold">
                Our Mission & Story
              </span>
            </div>
          </div>

          {/* Headline & Mission Statement */}
          <div className="text-center max-w-3xl mx-auto mt-6">
            <h1 className="text-3xl sm:text-5xl font-extrabold text-on-surface tracking-tight leading-tight">
              Empowering communities through{" "}
              <span className="text-primary-container">unforgettable live experiences</span>
            </h1>
            <p className="text-base sm:text-lg text-on-surface-variant mt-5 leading-relaxed">
              At EventHub, we bridge visionary creators, local organizers, and curious attendees worldwide. We strip away the friction of ticketing and event discovery, fostering genuine connection through technology built on absolute trust, speed, and real-time community engagement.
            </p>
          </div>

          {/* Trust Credentials Bar */}
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 mt-8 text-on-surface-variant">
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-secondary" />
              <span className="text-sm font-semibold text-on-surface">Founded in 2022</span>
            </div>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-outline-variant" />
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary-container" />
              <span className="text-sm font-semibold text-on-surface">50k+ Active Hosts</span>
            </div>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-outline-variant" />
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-secondary" />
              <span className="text-sm font-semibold text-on-surface">350+ Global Cities</span>
            </div>
            <span className="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-outline-variant" />
            <div className="flex items-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-primary-container" />
              <span className="text-sm font-semibold text-on-surface">100% Guaranteed Passes</span>
            </div>
          </div>

          {/* Hero Visual Showcase Bento Mosaic */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
            {/* Main Large Showcase */}
            <div className="md:col-span-7 relative group overflow-hidden rounded-2xl shadow-sm bg-surface-container-lowest h-[320px] sm:h-[380px] border border-outline-variant/30">
              <Image
                src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80"
                alt="Dynamic tech summit keynotes and audience"
                fill
                className="object-cover transition-transform duration-700 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 60vw"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-inverse-surface/30 to-transparent flex flex-col justify-end p-6 text-inverse-on-surface">
                <span className="text-xs uppercase tracking-widest text-secondary-fixed font-bold">
                  Keynotes & Summits
                </span>
                <h3 className="text-xl font-bold mt-1 text-white">
                  Global Innovation Forum
                </h3>
                <p className="text-xs sm:text-sm text-inverse-on-surface/90 mt-1 max-w-lg">
                  Connecting over 4,200 tech visionaries and startup founders under one roof.
                </p>
              </div>
            </div>

            {/* Stacked Column Right */}
            <div className="md:col-span-5 grid grid-rows-2 gap-6">
              {/* Top Card: Live Concerts */}
              <div className="relative group overflow-hidden rounded-2xl shadow-sm bg-surface-container-lowest h-[178px] border border-outline-variant/30">
                <Image
                  src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80"
                  alt="Outdoor live music gathering"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-transparent to-transparent flex flex-col justify-end p-5 text-inverse-on-surface">
                  <span className="text-[11px] uppercase tracking-widest text-secondary-fixed font-bold">
                    Live Performances
                  </span>
                  <h4 className="text-lg font-bold text-white">
                    Acoustic Sunset Series
                  </h4>
                </div>
              </div>

              {/* Bottom Card: Workshops */}
              <div className="relative group overflow-hidden rounded-2xl shadow-sm bg-surface-container-lowest h-[178px] border border-outline-variant/30">
                <Image
                  src="https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=800&q=80"
                  alt="Interactive hands-on design workshop"
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 40vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/90 via-transparent to-transparent flex flex-col justify-end p-5 text-inverse-on-surface">
                  <span className="text-[11px] uppercase tracking-widest text-secondary-fixed font-bold">
                    Local Masterclasses
                  </span>
                  <h4 className="text-lg font-bold text-white">
                    Design Systems In Practice
                  </h4>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. "How It Works" Section (3-Step Grid) */}
      <section className="w-full py-20 bg-surface-container-low border-y border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-1.5 text-primary-container mb-2">
              <span className="text-xs uppercase tracking-wider font-extrabold">
                The EventHub Architecture
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
              How EventHub Works
            </h2>
            <p className="text-sm sm:text-base text-on-surface-variant mt-2">
              A seamless platform built with deep empathy for organizers and attendees alike.
            </p>
          </div>

          {/* 3-Step Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Step 01 */}
            <div className="group relative flex flex-col justify-between bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-fixed/50 flex items-center justify-center text-primary-container">
                    <Compass className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-black text-primary-container/80 tracking-tight">
                    01
                  </span>
                </div>
                <h3 className="text-lg font-bold text-on-surface">
                  Discover & Connect
                </h3>
                <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
                  Explore curated conferences, workshops, concerts, and community meetups tailored to your interests and location with intelligent multi-tag filters and personalized alert feeds.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-surface-container flex items-center gap-1.5 text-primary-container text-xs font-bold">
                <span>Personalized curation</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>

            {/* Step 02 */}
            <div className="group relative flex flex-col justify-between bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-secondary-fixed/50 flex items-center justify-center text-secondary">
                    <Ticket className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-black text-secondary tracking-tight">
                    02
                  </span>
                </div>
                <h3 className="text-lg font-bold text-on-surface">
                  Instant & Secure Ticketing
                </h3>
                <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
                  Seamless 1-click checkout with guaranteed pass verification, native digital wallet passes, frictionless group transfers, and comprehensive refund guarantees.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-surface-container flex items-center gap-1.5 text-secondary text-xs font-bold">
                <span>Zero hidden processing fees</span>
                <CheckCircle2 className="h-3.5 w-3.5" />
              </div>
            </div>

            {/* Step 03 */}
            <div className="group relative flex flex-col justify-between bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-xs transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-xl bg-primary-fixed/50 flex items-center justify-center text-primary-container">
                    <BarChart3 className="h-6 w-6" />
                  </div>
                  <span className="text-2xl font-black text-primary-container/80 tracking-tight">
                    03
                  </span>
                </div>
                <h3 className="text-lg font-bold text-on-surface">
                  Host, Manage & Grow
                </h3>
                <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
                  Comprehensive host operations suite featuring ultra-fast QR gate scanning, real-time ticket sales breakdowns, audience segmentation, and automated instant payouts.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-surface-container flex items-center gap-1.5 text-primary-container text-xs font-bold">
                <span>Enterprise-grade host tools</span>
                <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Key Stats / Impact Row */}
      <section className="w-full py-16 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Tag Header */}
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12">
            <div>
              <span className="text-xs uppercase tracking-wider text-secondary font-extrabold">
                Platform Reach
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-on-surface mt-1">
                Scale that speaks for itself
              </h2>
            </div>
            <p className="text-sm text-on-surface-variant max-w-md">
              Our global infrastructure powers everything from grassroots community gatherings to premier multi-day conventions.
            </p>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Stat 1 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-primary-fixed/60 flex items-center justify-center text-primary-container mb-4">
                  <Calendar className="h-5 w-5" />
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold text-primary-container tracking-tight">
                  25,000+
                </span>
                <h4 className="text-base font-bold text-on-surface mt-1">
                  Events Hosted
                </h4>
              </div>
              <p className="text-xs text-on-surface-variant mt-4">
                Organized across 120+ countries worldwide
              </p>
            </div>

            {/* Stat 2 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-secondary-fixed/70 flex items-center justify-center text-secondary mb-4">
                  <Ticket className="h-5 w-5" />
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold text-secondary tracking-tight">
                  1.2M+
                </span>
                <h4 className="text-base font-bold text-on-surface mt-1">
                  Attendees Connected
                </h4>
              </div>
              <p className="text-xs text-on-surface-variant mt-4">
                Tickets delivered with zero fraud rate
              </p>
            </div>

            {/* Stat 3 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-primary-fixed/60 flex items-center justify-center text-primary-container mb-4">
                  <Globe2 className="h-5 w-5" />
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                  350+
                </span>
                <h4 className="text-base font-bold text-on-surface mt-1">
                  Active Global Cities
                </h4>
              </div>
              <p className="text-xs text-on-surface-variant mt-4">
                Thriving metropolitan and regional hubs
              </p>
            </div>

            {/* Stat 4 */}
            <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-9 h-9 rounded-xl bg-secondary-fixed/70 flex items-center justify-center text-secondary mb-4">
                  <Star className="h-5 w-5 fill-current" />
                </div>
                <span className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight">
                  99.4%
                </span>
                <h4 className="text-base font-bold text-on-surface mt-1">
                  Satisfaction Rating
                </h4>
              </div>
              <p className="text-xs text-on-surface-variant mt-4">
                Average 4.9★ rating from active hosts
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Values & Core Principles */}
      <section className="w-full py-20 bg-surface-container-low border-t border-outline-variant/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Section Heading */}
          <div className="max-w-3xl mb-12">
            <span className="text-xs uppercase tracking-wider text-primary-container font-extrabold">
              Why Choose EventHub
            </span>
            <h2 className="text-3xl font-extrabold text-on-surface tracking-tight mt-1">
              Built on principles that protect creators & audiences
            </h2>
            <p className="text-sm text-on-surface-variant mt-2 leading-relaxed">
              We reject predatory fee structures, secondary scalping bots, and clunky interfaces. Here is how we do things differently.
            </p>
          </div>

          {/* 3 Pillars Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Pillar 1 */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-fixed/50 flex items-center justify-center text-primary-container mb-6">
                  <ShieldCheck className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-on-surface">
                  Verified & Transparent
                </h3>
                <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
                  Every organizer undergoes identity verification. Every ticket purchase displays full itemized costs upfront—no surprise service fees at checkout, no hidden markups.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-surface-container flex items-center gap-2 text-on-surface text-xs font-semibold">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                <span>Guaranteed authentic admissions</span>
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-secondary-fixed/50 flex items-center justify-center text-secondary mb-6">
                  <HeartHandshake className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-on-surface">
                  Community First
                </h3>
                <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
                  We empower grassroots initiatives, non-profit benefit galas, and intimate cultural sessions with lower rates, dedicated marketing spotlight programs, and free community tiers.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-surface-container flex items-center gap-2 text-on-surface text-xs font-semibold">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                <span>Free ticket distribution for non-profits</span>
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-surface-container-lowest p-8 rounded-2xl border border-outline-variant/30 shadow-xs flex flex-col justify-between">
              <div>
                <div className="w-12 h-12 rounded-xl bg-primary-fixed/50 flex items-center justify-center text-primary-container mb-6">
                  <Lock className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-bold text-on-surface">
                  World-Class Reliability
                </h3>
                <p className="text-sm text-on-surface-variant mt-3 leading-relaxed">
                  High-concurrency drops engineered to process 50,000+ requests per second without downtime. Offline-ready check-in apps ensure venues never stall at the door.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-surface-container flex items-center gap-2 text-on-surface text-xs font-semibold">
                <CheckCircle2 className="h-4 w-4 text-secondary" />
                <span>99.99% gateway uptime SLA</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Closing Call to Action (CTA to /items) */}
      <section className="w-full py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-primary via-primary-container to-primary text-on-primary p-8 sm:p-12 lg:p-16 shadow-xl">
            {/* Subtle Pattern Decorator */}
            <div className="absolute -right-16 -top-16 w-80 h-80 rounded-full bg-on-primary/10 blur-2xl pointer-events-none" />
            <div className="absolute -left-12 -bottom-12 w-64 h-64 rounded-full bg-secondary-fixed/20 blur-xl pointer-events-none" />

            <div className="relative z-10 max-w-2xl">
              <div className="inline-flex items-center gap-2 bg-on-primary/15 text-on-primary px-4 py-1.5 rounded-full mb-6">
                <Sparkles className="h-4 w-4" />
                <span className="text-xs uppercase tracking-wider font-bold">
                  Join Our Community Today
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-on-primary">
                Ready to experience what's next?
              </h2>
              <p className="text-base sm:text-lg text-primary-fixed mt-4 leading-relaxed">
                Explore thousands of live gatherings, tech summits, workshops, and music festivals happening near you, or launch your own ticketed event in under 5 minutes.
              </p>

              {/* Dual Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 mt-8">
                <Link
                  href="/items"
                  className="inline-flex items-center gap-2 bg-secondary-container hover:bg-secondary-fixed-dim text-on-secondary-container text-sm font-bold px-6 py-3.5 rounded-xl shadow-sm transition-all transform active:scale-95"
                >
                  <span>Browse All Events</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  href="/items/add"
                  className="inline-flex items-center gap-2 bg-surface-container-lowest text-on-surface hover:bg-surface-container text-sm font-bold px-6 py-3.5 rounded-xl shadow-sm transition-all transform active:scale-95"
                >
                  <PlusCircle className="h-4 w-4" />
                  <span>Host an Event</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
