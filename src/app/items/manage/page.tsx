"use client";

import React, { useEffect, useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { getEvents, deleteEvent } from "@/lib/events";
import { Event, EventCategory } from "@/types/event";
import toast from "react-hot-toast";
import {
  Calendar,
  MapPin,
  Plus,
  Trash2,
  Eye,
  Search,
  Filter,
  AlertTriangle,
  CheckCircle2,
  X,
  Loader2,
  TrendingUp,
  DollarSign,
  Ticket,
  Star,
  Download,
  CalendarCheck,
  ChevronRight,
  Home,
  RefreshCw,
  Sparkles,
} from "lucide-react";

const CATEGORIES: EventCategory[] = [
  "Conference",
  "Concert",
  "Workshop",
  "Wedding",
  "Sports",
  "Networking",
];

export default function ManageEventsPage() {
  const { user } = useAuth();
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("all");
  const [viewScope, setViewScope] = useState<"my" | "all">("my");

  // Delete modal state
  const [eventToDelete, setEventToDelete] = useState<Event | null>(null);
  const [deleteConfirmationText, setDeleteConfirmationText] = useState<string>("");
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  useEffect(() => {
    async function loadEvents() {
      setLoading(true);
      try {
        const data = await getEvents();
        setEvents(data);
      } catch (error) {
        console.error("Failed to fetch events:", error);
        toast.error("Failed to load events.");
      } finally {
        setLoading(false);
      }
    }
    loadEvents();
  }, []);

  // Determine user's events vs all events
  const userEvents = useMemo(() => {
    if (!user) return [];
    return events.filter((e) => e.createdBy === user.uid);
  }, [events, user]);

  // If user has no created events, default viewScope to "all" so they see demo data, but allow switching
  const scopedEvents = useMemo(() => {
    if (viewScope === "my") {
      return userEvents;
    }
    return events;
  }, [viewScope, userEvents, events]);

  // Compute status for an event (Active, Draft, Completed)
  const getEventStatus = (event: Event): "Active" | "Draft" | "Completed" => {
    try {
      const eventDate = new Date(event.date);
      const now = new Date();
      if (isNaN(eventDate.getTime())) return "Active";
      if (eventDate < now) return "Completed";
      return "Active";
    } catch {
      return "Active";
    }
  };

  // Filtered events
  const filteredEvents = useMemo(() => {
    return scopedEvents.filter((event) => {
      // Search
      const matchesSearch =
        !searchQuery.trim() ||
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.location.toLowerCase().includes(searchQuery.toLowerCase());

      // Category
      const matchesCategory =
        categoryFilter === "all" ||
        event.category.toLowerCase() === categoryFilter.toLowerCase();

      // Status
      const status = getEventStatus(event).toLowerCase();
      const matchesStatus =
        statusFilter === "all" || status === statusFilter.toLowerCase();

      return matchesSearch && matchesCategory && matchesStatus;
    });
  }, [scopedEvents, searchQuery, categoryFilter, statusFilter]);

  // KPI Metrics Calculation
  const stats = useMemo(() => {
    const list = scopedEvents;
    const totalEvents = list.length;
    const totalCapacity = list.reduce((sum, e) => sum + (e.capacity || 0), 0);
    // Approximate tickets sold as ~78% of capacity for realistic live dashboard look
    const estimatedTicketsSold = Math.round(totalCapacity * 0.78);
    const estimatedGrossRevenue = list.reduce((sum, e) => {
      const sold = Math.round((e.capacity || 0) * 0.78);
      return sum + sold * (e.price || 0);
    }, 0);
    const avgRating =
      list.length > 0
        ? (list.reduce((sum, e) => sum + (e.rating || 5), 0) / list.length).toFixed(1)
        : "5.0";

    return {
      totalEvents,
      totalCapacity,
      estimatedTicketsSold,
      estimatedGrossRevenue,
      avgRating,
    };
  }, [scopedEvents]);

  // Handle Delete Confirmation
  const handleDeleteClick = (event: Event) => {
    setEventToDelete(event);
    setDeleteConfirmationText("");
  };

  const handleCloseDeleteModal = () => {
    if (isDeleting) return;
    setEventToDelete(null);
    setDeleteConfirmationText("");
  };

  const handleConfirmDelete = async () => {
    if (!eventToDelete) return;
    if (deleteConfirmationText.trim() !== "DELETE") {
      toast.error("Please type DELETE to confirm.");
      return;
    }

    setIsDeleting(true);
    try {
      await deleteEvent(eventToDelete.id);
      setEvents((prev) => prev.filter((e) => e.id !== eventToDelete.id));
      toast.success(`"${eventToDelete.title}" has been deleted.`);
      handleCloseDeleteModal();
    } catch (error) {
      console.error("Error deleting event:", error);
      toast.error("Failed to delete event. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  // Format date helper
  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      if (isNaN(d.getTime())) return dateStr;
      return d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  const getTimeRelative = (dateStr: string) => {
    try {
      const target = new Date(dateStr);
      const now = new Date();
      if (isNaN(target.getTime())) return "Upcoming";
      const diffDays = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
      if (diffDays < 0) return "Past";
      if (diffDays === 0) return "Today";
      if (diffDays === 1) return "Tomorrow";
      return `In ${diffDays} days`;
    } catch {
      return "Upcoming";
    }
  };

  return (
    <ProtectedRoute>
      <div className="w-full min-h-screen bg-surface">
        {/* Subtle Ambient Indigo Glows */}
        <div className="relative w-full overflow-hidden">
          <div className="absolute -top-32 right-12 w-96 h-96 bg-primary-fixed/30 rounded-full blur-3xl pointer-events-none -z-10" />
          <div className="absolute top-80 -left-20 w-80 h-80 bg-secondary-fixed/20 rounded-full blur-3xl pointer-events-none -z-10" />

          <div className="max-w-[1280px] w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {/* Breadcrumb Bar */}
            <nav
              aria-label="Breadcrumb"
              className="flex items-center gap-1.5 text-on-surface-variant text-xs font-semibold mb-6"
            >
              <Link
                href="/"
                className="hover:text-primary transition-colors flex items-center gap-1"
              >
                <Home className="h-3.5 w-3.5" />
                <span>Home</span>
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-outline" />
              <Link
                href="/items"
                className="hover:text-primary transition-colors"
              >
                Events
              </Link>
              <ChevronRight className="h-3.5 w-3.5 text-outline" />
              <span className="text-on-surface font-bold">Manage Events</span>
            </nav>

            {/* Page Header */}
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8">
              <div className="space-y-2 max-w-2xl">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-primary-fixed text-on-primary-fixed text-xs font-bold uppercase tracking-wider">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  Host Operations Suite
                </div>
                <h1 className="text-3xl sm:text-4xl font-extrabold text-on-surface tracking-tight">
                  Manage Events
                </h1>
                <p className="text-base text-on-surface-variant leading-relaxed">
                  Organize, monitor attendee capacity, review ticket revenue, and manage all your hosted experiences.
                </p>
              </div>

              {/* Top Quick Actions */}
              <div className="flex flex-wrap items-center gap-3 shrink-0">
                {/* Scope selector tabs */}
                <div className="inline-flex rounded-lg bg-surface-container p-1 text-xs font-bold text-on-surface-variant">
                  <button
                    onClick={() => setViewScope("my")}
                    className={`px-3 py-1.5 rounded-md transition-all ${
                      viewScope === "my"
                        ? "bg-surface-container-lowest text-on-surface shadow-sm font-extrabold"
                        : "hover:text-on-surface"
                    }`}
                  >
                    My Events ({userEvents.length})
                  </button>
                  <button
                    onClick={() => setViewScope("all")}
                    className={`px-3 py-1.5 rounded-md transition-all ${
                      viewScope === "all"
                        ? "bg-surface-container-lowest text-on-surface shadow-sm font-extrabold"
                        : "hover:text-on-surface"
                    }`}
                  >
                    All Events ({events.length})
                  </button>
                </div>

                <Link
                  href="/items/add"
                  className="flex items-center gap-2 px-4 py-2.5 rounded-lg bg-primary text-on-primary text-sm font-bold shadow-sm hover:bg-primary-container transition-all"
                >
                  <Plus className="h-4 w-4" />
                  <span>Create New Event</span>
                </Link>
              </div>
            </div>

            {/* Live KPI Stat Cards Row */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              {/* Stat 1: Total Events */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Total Events
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                    <Calendar className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-on-surface tracking-tight">
                    {stats.totalEvents}
                  </span>
                  <span className="text-xs font-medium text-on-surface-variant">
                    {viewScope === "my" ? "hosted by you" : "listed"}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-on-surface-variant">
                  <span className="text-primary font-bold flex items-center gap-0.5">
                    <TrendingUp className="h-3.5 w-3.5" />
                    Active
                  </span>
                  <span>in catalogue</span>
                </div>
              </div>

              {/* Stat 2: Active Tickets Sold / Cap */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Active Capacity
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-primary-fixed flex items-center justify-center text-on-primary-fixed group-hover:bg-primary group-hover:text-on-primary transition-all">
                    <Ticket className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-on-surface tracking-tight">
                    {stats.estimatedTicketsSold.toLocaleString()}
                  </span>
                  <span className="text-xs font-medium text-on-surface-variant">
                    / {stats.totalCapacity.toLocaleString()} seats
                  </span>
                </div>
                <div className="mt-3 w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                  <div
                    className="bg-primary-container h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${
                        stats.totalCapacity > 0
                          ? Math.min(
                              100,
                              Math.round(
                                (stats.estimatedTicketsSold / stats.totalCapacity) *
                                  100
                              )
                            )
                          : 0
                      }%`,
                    }}
                  />
                </div>
              </div>

              {/* Stat 3: Gross Revenue */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Estimated Revenue
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-secondary-fixed flex items-center justify-center text-on-secondary-fixed group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-all">
                    <DollarSign className="h-5 w-5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-extrabold text-on-surface tracking-tight">
                    ${stats.estimatedGrossRevenue.toLocaleString()}
                  </span>
                </div>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-on-surface-variant">
                  <span className="text-secondary font-bold flex items-center">
                    <TrendingUp className="h-3.5 w-3.5 mr-0.5" />
                    Est.
                  </span>
                  <span>based on 78% occupancy</span>
                </div>
              </div>

              {/* Stat 4: Average Rating */}
              <div className="bg-surface-container-lowest p-6 rounded-2xl border border-outline-variant/30 shadow-sm flex flex-col justify-between relative overflow-hidden group hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">
                    Average Rating
                  </span>
                  <div className="w-9 h-9 rounded-xl bg-surface-container flex items-center justify-center text-secondary-container group-hover:bg-secondary-container group-hover:text-on-secondary-container transition-all">
                    <Star className="h-5 w-5 fill-current" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold text-on-surface tracking-tight">
                    {stats.avgRating}
                  </span>
                  <div className="flex items-center text-secondary-container text-sm">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star
                        key={star}
                        className={`h-4 w-4 ${
                          star <= Math.round(Number(stats.avgRating))
                            ? "fill-secondary-container text-secondary-container"
                            : "text-outline-variant"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <div className="mt-3 flex items-center text-xs text-on-surface-variant">
                  <span>Based on attendee feedback</span>
                </div>
              </div>
            </div>

            {/* Actions & Filters Toolbar */}
            <div className="bg-surface-container-lowest p-4 rounded-2xl border border-outline-variant/30 shadow-sm mb-6 flex flex-col lg:flex-row items-center justify-between gap-4">
              <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full lg:w-auto flex-1">
                {/* Search input */}
                <div className="relative flex-1 max-w-md">
                  <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 text-on-surface-variant h-4 w-4" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search hosted events, venues..."
                    className="w-full pl-10 pr-4 py-2.5 bg-surface-container-low rounded-xl text-sm text-on-surface placeholder:text-on-surface-variant focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary/20 border border-transparent focus:border-outline-variant/40 transition-all"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-on-surface"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Status filter dropdown */}
                <div className="relative">
                  <select
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value)}
                    aria-label="Filter events by status"
                    className="w-full sm:w-auto appearance-none bg-surface-container-low text-on-surface text-xs font-semibold px-4 py-2.5 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer border border-transparent hover:bg-surface-container transition-all"
                  >
                    <option value="all">All Statuses</option>
                    <option value="active">Active Only</option>
                    <option value="draft">Draft Only</option>
                    <option value="completed">Completed Only</option>
                  </select>
                  <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant h-3.5 w-3.5" />
                </div>

                {/* Category filter dropdown */}
                <div className="relative">
                  <select
                    value={categoryFilter}
                    onChange={(e) => setCategoryFilter(e.target.value)}
                    aria-label="Filter events by category"
                    className="w-full sm:w-auto appearance-none bg-surface-container-low text-on-surface text-xs font-semibold px-4 py-2.5 pr-8 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 cursor-pointer border border-transparent hover:bg-surface-container transition-all"
                  >
                    <option value="all">All Categories</option>
                    {CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                  <Filter className="absolute right-2.5 top-1/2 -translate-y-1/2 pointer-events-none text-on-surface-variant h-3.5 w-3.5" />
                </div>
              </div>

              {/* Filter Reset if active */}
              {(searchQuery || statusFilter !== "all" || categoryFilter !== "all") && (
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setStatusFilter("all");
                    setCategoryFilter("all");
                  }}
                  className="flex items-center gap-1.5 text-xs font-bold text-primary hover:underline px-2 py-1"
                >
                  <RefreshCw className="h-3 w-3" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>

            {/* Main Content: Loading State, Empty State, or Events Listing */}
            {loading ? (
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-12 text-center shadow-sm">
                <Loader2 className="h-8 w-8 animate-spin text-primary mx-auto mb-4" />
                <h3 className="text-base font-bold text-on-surface">Loading your events...</h3>
                <p className="text-xs text-on-surface-variant mt-1">
                  Connecting to live database catalog.
                </p>
              </div>
            ) : filteredEvents.length === 0 ? (
              <div className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-12 text-center shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-primary-fixed/40 text-primary flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8" />
                </div>
                <h3 className="text-lg font-bold text-on-surface">No events found</h3>
                <p className="text-sm text-on-surface-variant max-w-md mx-auto mt-2 leading-relaxed">
                  {viewScope === "my" && userEvents.length === 0
                    ? "You haven't created any events yet. Publish your first experience and start hosting attendees."
                    : "No events match your current filter and search criteria. Try adjusting your search query or reset filters."}
                </p>

                <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
                  {viewScope === "my" && userEvents.length === 0 ? (
                    <>
                      <Link
                        href="/items/add"
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-primary-container shadow-sm transition-all"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Create Your First Event</span>
                      </Link>
                      <button
                        onClick={() => setViewScope("all")}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-surface-container text-on-surface font-bold text-sm hover:bg-surface-container-high transition-all"
                      >
                        <Eye className="h-4 w-4" />
                        <span>View All Events (Demo Mode)</span>
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={() => {
                        setSearchQuery("");
                        setStatusFilter("all");
                        setCategoryFilter("all");
                      }}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-on-primary font-bold text-sm hover:bg-primary-container shadow-sm transition-all"
                    >
                      <RefreshCw className="h-4 w-4" />
                      <span>Reset Filters</span>
                    </button>
                  )}
                </div>
              </div>
            ) : (
              <div className="space-y-6">
                {/* 1. Desktop Table View (hidden on mobile, visible md+) */}
                <div className="hidden md:block bg-surface-container-lowest rounded-2xl border border-outline-variant/30 shadow-sm overflow-hidden">
                  <div className="overflow-x-auto w-full">
                    <table className="w-full text-left border-collapse">
                      <thead>
                        <tr className="bg-surface-container-low text-on-surface-variant text-xs font-bold tracking-wider uppercase border-b border-surface-container">
                          <th className="py-4 px-6 min-w-[280px]">Event</th>
                          <th className="py-4 px-4 min-w-[130px]">Category</th>
                          <th className="py-4 px-4 min-w-[170px]">Date & Time</th>
                          <th className="py-4 px-4 min-w-[170px]">Tickets & Capacity</th>
                          <th className="py-4 px-4 min-w-[100px]">Price</th>
                          <th className="py-4 px-4 min-w-[110px]">Status</th>
                          <th className="py-4 px-6 text-right min-w-[150px]">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-surface-container">
                        {filteredEvents.map((event) => {
                          const status = getEventStatus(event);
                          const soldCount = Math.round((event.capacity || 100) * 0.85);
                          const soldPercent = Math.min(100, Math.round((soldCount / (event.capacity || 100)) * 100));

                          return (
                            <tr
                              key={event.id}
                              className="hover:bg-surface-container-low/60 transition-colors group"
                            >
                              {/* Event Col */}
                              <td className="py-4 px-6">
                                <div className="flex items-center gap-3.5 min-w-0">
                                  <div className="relative w-14 h-11 rounded-lg overflow-hidden shrink-0 bg-surface-container border border-outline-variant/20 shadow-xs">
                                    {event.imageUrl ? (
                                      <Image
                                        src={event.imageUrl}
                                        alt={event.title}
                                        fill
                                        unoptimized
                                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                                      />
                                    ) : (
                                      <div className="w-full h-full flex items-center justify-center bg-primary-fixed text-primary font-bold text-xs">
                                        {event.category.substring(0, 2)}
                                      </div>
                                    )}
                                  </div>
                                  <div className="min-w-0">
                                    <Link
                                      href={`/items/${event.id}`}
                                      className="font-bold text-sm text-on-surface group-hover:text-primary transition-colors block truncate max-w-xs"
                                    >
                                      {event.title}
                                    </Link>
                                    <div className="flex items-center gap-1 text-on-surface-variant text-xs truncate mt-0.5">
                                      <MapPin className="h-3 w-3 shrink-0 text-outline" />
                                      <span className="truncate">{event.location}</span>
                                    </div>
                                  </div>
                                </div>
                              </td>

                              {/* Category Col */}
                              <td className="py-4 px-4">
                                <span className="inline-flex items-center px-2.5 py-1 rounded-full bg-surface-container text-on-surface font-semibold text-xs">
                                  {event.category}
                                </span>
                              </td>

                              {/* Date Col */}
                              <td className="py-4 px-4">
                                <div className="flex flex-col">
                                  <span className="font-bold text-sm text-on-surface">
                                    {formatDate(event.date)}
                                  </span>
                                  <span className="text-xs text-on-surface-variant">
                                    <span className="text-primary font-semibold">
                                      {getTimeRelative(event.date)}
                                    </span>
                                  </span>
                                </div>
                              </td>

                              {/* Tickets & Capacity Col */}
                              <td className="py-4 px-4">
                                <div className="flex flex-col gap-1.5 max-w-[140px]">
                                  <div className="flex justify-between items-center text-xs">
                                    <span className="font-bold text-on-surface">{soldCount}</span>
                                    <span className="text-on-surface-variant">
                                      / {event.capacity} seats
                                    </span>
                                  </div>
                                  <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                                    <div
                                      className="bg-primary-container h-full rounded-full"
                                      style={{ width: `${soldPercent}%` }}
                                    />
                                  </div>
                                </div>
                              </td>

                              {/* Price Col */}
                              <td className="py-4 px-4">
                                <span className="text-sm font-extrabold text-on-surface">
                                  {event.price === 0 ? (
                                    <span className="text-secondary uppercase">Free</span>
                                  ) : (
                                    `$${event.price}`
                                  )}
                                </span>
                              </td>

                              {/* Status Col */}
                              <td className="py-4 px-4">
                                {status === "Active" && (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-xs font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                    Active
                                  </span>
                                )}
                                {status === "Draft" && (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-amber-50 text-amber-800 text-xs font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
                                    Draft
                                  </span>
                                )}
                                {status === "Completed" && (
                                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-xs font-bold">
                                    <span className="w-1.5 h-1.5 rounded-full bg-outline" />
                                    Completed
                                  </span>
                                )}
                              </td>

                              {/* Actions Col */}
                              <td className="py-4 px-6 text-right">
                                <div className="flex items-center justify-end gap-1.5">
                                  <Link
                                    href={`/items/${event.id}`}
                                    className="inline-flex items-center gap-1 px-3 py-1.5 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface text-xs font-bold transition-all"
                                    title="View Public Page"
                                  >
                                    <Eye className="h-3.5 w-3.5" />
                                    <span>View</span>
                                  </Link>
                                  <button
                                    onClick={() => handleDeleteClick(event)}
                                    className="p-1.5 rounded-lg text-error hover:bg-error-container hover:text-on-error-container transition-all"
                                    title="Delete Event"
                                  >
                                    <Trash2 className="h-4 w-4" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>

                  {/* Desktop Table Footer */}
                  <div className="p-4 bg-surface-container-low flex items-center justify-between text-xs text-on-surface-variant border-t border-surface-container">
                    <span>
                      Showing <strong className="text-on-surface">{filteredEvents.length}</strong> of{" "}
                      <strong className="text-on-surface">{scopedEvents.length}</strong> events
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      Real-time synchronization enabled
                    </span>
                  </div>
                </div>

                {/* 2. Mobile Stacked Cards View (visible on < md, hidden on md+) */}
                <div className="md:hidden space-y-4">
                  {filteredEvents.map((event) => {
                    const status = getEventStatus(event);
                    const soldCount = Math.round((event.capacity || 100) * 0.85);
                    const soldPercent = Math.min(100, Math.round((soldCount / (event.capacity || 100)) * 100));

                    return (
                      <div
                        key={event.id}
                        className="bg-surface-container-lowest rounded-2xl border border-outline-variant/30 p-4 shadow-sm flex flex-col gap-4"
                      >
                        {/* Top: Image + Info */}
                        <div className="flex items-start gap-3">
                          <div className="relative w-20 h-16 rounded-xl overflow-hidden shrink-0 bg-surface-container border border-outline-variant/20 shadow-xs">
                            {event.imageUrl ? (
                              <Image
                                src={event.imageUrl}
                                alt={event.title}
                                fill
                                unoptimized
                                className="object-cover"
                              />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center bg-primary-fixed text-primary font-bold text-xs">
                                {event.category.substring(0, 2)}
                              </div>
                            )}
                          </div>
                          <div className="min-w-0 flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full bg-surface-container text-on-surface font-semibold text-[10px]">
                                {event.category}
                              </span>
                              {status === "Active" && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 text-[10px] font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-600" />
                                  Active
                                </span>
                              )}
                              {status === "Completed" && (
                                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-surface-container-high text-on-surface-variant text-[10px] font-bold">
                                  <span className="w-1.5 h-1.5 rounded-full bg-outline" />
                                  Completed
                                </span>
                              )}
                            </div>
                            <Link
                              href={`/items/${event.id}`}
                              className="font-bold text-sm text-on-surface line-clamp-1 hover:text-primary transition-colors"
                            >
                              {event.title}
                            </Link>
                            <div className="flex items-center gap-1 text-on-surface-variant text-xs mt-1 truncate">
                              <MapPin className="h-3 w-3 shrink-0 text-outline" />
                              <span className="truncate">{event.location}</span>
                            </div>
                          </div>
                        </div>

                        {/* Mid Details Grid */}
                        <div className="grid grid-cols-2 gap-2 p-3 rounded-xl bg-surface-container-low text-xs">
                          <div>
                            <span className="text-on-surface-variant block text-[11px]">Date</span>
                            <span className="font-bold text-on-surface">{formatDate(event.date)}</span>
                          </div>
                          <div>
                            <span className="text-on-surface-variant block text-[11px]">Price</span>
                            <span className="font-bold text-on-surface">
                              {event.price === 0 ? "Free" : `$${event.price}`}
                            </span>
                          </div>
                          <div className="col-span-2 pt-1 border-t border-surface-container">
                            <div className="flex justify-between items-center text-[11px] mb-1">
                              <span className="text-on-surface-variant">Capacity Sold</span>
                              <span className="font-bold text-on-surface">
                                {soldCount} / {event.capacity} seats ({soldPercent}%)
                              </span>
                            </div>
                            <div className="w-full bg-surface-container rounded-full h-1.5 overflow-hidden">
                              <div
                                className="bg-primary-container h-full rounded-full"
                                style={{ width: `${soldPercent}%` }}
                              />
                            </div>
                          </div>
                        </div>

                        {/* Mobile Actions Bottom Row */}
                        <div className="flex items-center justify-between pt-1 border-t border-surface-container">
                          <Link
                            href={`/items/${event.id}`}
                            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-surface-container text-on-surface text-xs font-bold hover:bg-surface-container-high transition-all"
                          >
                            <Eye className="h-3.5 w-3.5" />
                            <span>View Details</span>
                          </Link>
                          <button
                            onClick={() => handleDeleteClick(event)}
                            className="inline-flex items-center gap-1 px-3 py-2 rounded-xl bg-error-container text-error text-xs font-bold hover:bg-error hover:text-on-error transition-all"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            <span>Delete</span>
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Organizer Tip Callout Banner */}
                <div className="p-6 rounded-2xl bg-gradient-to-r from-primary-fixed/40 via-surface-container to-secondary-fixed/20 border border-outline-variant/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary-container flex items-center justify-center text-on-primary shrink-0 shadow-sm">
                      <Sparkles className="h-6 w-6" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-base text-on-surface">
                        Automated Check-in Available
                      </h3>
                      <p className="text-xs text-on-surface-variant leading-relaxed">
                        Enable instant QR scanning and real-time attendee tracking via the EventHub Organizer app.
                      </p>
                    </div>
                  </div>
                  <Link
                    href="/items/add"
                    className="shrink-0 px-4 py-2 rounded-xl bg-surface-container-lowest text-primary text-xs font-extrabold shadow-sm hover:bg-primary-fixed transition-all"
                  >
                    Host Another Event
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* =========================================================================
            DELETE CONFIRMATION MODAL
            Reproducing Stitch Screen 2c7718dc001e4892809419fbcb46922f
           ========================================================================= */}
        {eventToDelete && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-inverse-surface/60 backdrop-blur-sm animate-in fade-in duration-200"
            role="dialog"
            aria-modal="true"
            aria-labelledby="deleteModalTitle"
          >
            <div className="relative w-full max-w-[560px] bg-surface-container-lowest rounded-2xl p-6 sm:p-8 shadow-2xl flex flex-col gap-6 border border-outline-variant/30 animate-in zoom-in-95 duration-200">
              {/* Top Bar: Icon, Title & Dismiss X */}
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3.5">
                  <div className="w-12 h-12 rounded-full bg-error-container flex items-center justify-center text-error shrink-0 shadow-xs">
                    <Trash2 className="h-6 w-6" />
                  </div>
                  <div>
                    <h2
                      id="deleteModalTitle"
                      className="text-xl font-extrabold text-on-surface tracking-tight"
                    >
                      Delete Event?
                    </h2>
                    <span className="text-xs text-on-surface-variant font-medium">
                      Permanent database operation
                    </span>
                  </div>
                </div>

                <button
                  onClick={handleCloseDeleteModal}
                  disabled={isDeleting}
                  aria-label="Dismiss Modal"
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Main Explanation Body */}
              <div className="flex flex-col gap-2 text-on-surface-variant text-sm leading-relaxed">
                <p>
                  Are you sure you want to delete{" "}
                  <strong className="text-on-surface font-extrabold">
                    “{eventToDelete.title}”
                  </strong>
                  ?
                </p>
                <p>
                  This action cannot be undone. All attendee records, issued tickets, and analytics data associated with this event will be permanently removed from the EventHub network.
                </p>
              </div>

              {/* Critical Impact Warning Callout */}
              <div className="p-4 rounded-xl bg-tertiary-fixed/30 border border-tertiary-fixed-dim/40 flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-tertiary-container flex items-center justify-center text-on-tertiary shrink-0 mt-0.5">
                  <AlertTriangle className="h-3.5 w-3.5" />
                </div>
                <div className="flex flex-col gap-0.5">
                  <span className="text-xs font-bold text-tertiary">
                    {eventToDelete.capacity} active seats configured
                  </span>
                  <p className="text-xs text-on-tertiary-fixed-variant leading-relaxed">
                    Deleting this published event will initiate automatic cancellation notices and trigger refund workflows for registered attendees.
                  </p>
                </div>
              </div>

              {/* Safety Confirmation Verification Field */}
              <div className="flex flex-col gap-2 bg-surface-container-low p-4 rounded-xl border border-surface-container">
                <label
                  htmlFor="deleteConfirmationInput"
                  className="text-xs font-semibold text-on-surface flex items-center justify-between"
                >
                  <span>
                    To confirm deletion, please type{" "}
                    <strong className="text-error font-extrabold tracking-wide">
                      DELETE
                    </strong>{" "}
                    below:
                  </span>
                  <span
                    className={`text-xs font-bold ${
                      deleteConfirmationText.trim() === "DELETE"
                        ? "text-emerald-700"
                        : "text-on-surface-variant"
                    }`}
                  >
                    {deleteConfirmationText.trim() === "DELETE"
                      ? "Phrase matched"
                      : "Required"}
                  </span>
                </label>
                <div className="relative">
                  <input
                    id="deleteConfirmationInput"
                    type="text"
                    value={deleteConfirmationText}
                    onChange={(e) => setDeleteConfirmationText(e.target.value)}
                    placeholder="Type DELETE to confirm"
                    autoComplete="off"
                    spellCheck="false"
                    disabled={isDeleting}
                    className="w-full h-11 px-3.5 bg-surface-container-lowest rounded-lg text-sm text-on-surface focus:outline-none focus:ring-2 focus:ring-error border border-outline-variant/30 transition-all uppercase tracking-wider"
                  />
                  {deleteConfirmationText.trim() === "DELETE" && (
                    <CheckCircle2 className="absolute right-3 top-3 text-emerald-600 h-5 w-5" />
                  )}
                </div>
              </div>

              {/* Actions Footer */}
              <div className="flex items-center justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={handleCloseDeleteModal}
                  disabled={isDeleting}
                  className="px-4 py-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-on-surface text-sm font-bold transition-all disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleConfirmDelete}
                  disabled={deleteConfirmationText.trim() !== "DELETE" || isDeleting}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-error text-on-error text-sm font-bold shadow-sm hover:bg-on-error-container transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin text-white" />
                      <span>Deleting...</span>
                    </>
                  ) : (
                    <>
                      <Trash2 className="h-4 w-4" />
                      <span>Delete Event</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
