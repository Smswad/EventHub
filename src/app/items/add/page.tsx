"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthContext";
import { addEvent } from "@/lib/events";
import { EventCategory, Event } from "@/types/event";
import toast from "react-hot-toast";
import {
  ChevronRight,
  ArrowRight,
  Calendar,
  MapPin,
  Users,
  DollarSign,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  AlertTriangle,
  Loader2,
  Sparkles,
  Layers,
  Building,
  Info,
  Tag,
  X,
  Plus,
} from "lucide-react";

const CATEGORIES: EventCategory[] = [
  "Conference",
  "Concert",
  "Workshop",
  "Wedding",
  "Sports",
  "Networking",
];

interface FormErrors {
  title?: string;
  shortDescription?: string;
  fullDescription?: string;
  category?: string;
  price?: string;
  date?: string;
  location?: string;
  imageUrl?: string;
  organizer?: string;
  capacity?: string;
  specifications?: string;
}

function AddEventForm() {
  const router = useRouter();
  const { user } = useAuth();

  // Form States
  const [title, setTitle] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [fullDescription, setFullDescription] = useState("");
  const [category, setCategory] = useState<EventCategory>("Conference");
  const [price, setPrice] = useState<string>("0");
  const [date, setDate] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [organizer, setOrganizer] = useState(user?.displayName || "");
  const [capacity, setCapacity] = useState<string>("100");
  const [specifications, setSpecifications] = useState(
    "All Keynote Sessions, Catering & Lunch Included, Digital Recordings, Certificate"
  );

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [hasSubmittedOnce, setHasSubmittedOnce] = useState(false);

  // Validate form
  const validateForm = (currentErrors: FormErrors = {}): { isValid: boolean; errs: FormErrors } => {
    const newErrors: FormErrors = {};

    // 1. Title: required, min 5
    if (!title.trim()) {
      newErrors.title = "Event title is required.";
    } else if (title.trim().length < 5) {
      newErrors.title = "Event title must be at least 5 characters long.";
    }

    // 2. Short description: required, max 120
    if (!shortDescription.trim()) {
      newErrors.shortDescription = "Short description is required.";
    } else if (shortDescription.trim().length > 120) {
      newErrors.shortDescription = "Short description must be at most 120 characters.";
    }

    // 3. Full description: required
    if (!fullDescription.trim()) {
      newErrors.fullDescription = "Full event description is required.";
    }

    // 4. Category: required
    if (!category) {
      newErrors.category = "Please select an event category.";
    }

    // 5. Price: required, >= 0
    const numPrice = Number(price);
    if (price.trim() === "" || isNaN(numPrice)) {
      newErrors.price = "Ticket price is required.";
    } else if (numPrice < 0) {
      newErrors.price = "Please enter a valid non-negative ticket price ($0.00 or greater).";
    }

    // 6. Date: required, in the future
    if (!date) {
      newErrors.date = "Event date and time is required.";
    } else {
      const selectedDate = new Date(date);
      if (isNaN(selectedDate.getTime())) {
        newErrors.date = "Please enter a valid date and time.";
      } else if (selectedDate.getTime() <= Date.now()) {
        newErrors.date = "Scheduled date and time must be in the future.";
      }
    }

    // 7. Location: required
    if (!location.trim()) {
      newErrors.location = "Venue location or virtual address is required.";
    }

    // 8. Image URL: required, valid http(s)
    const urlPattern = /^https?:\/\/.+\..+/i;
    if (!imageUrl.trim()) {
      newErrors.imageUrl = "Cover image URL is required.";
    } else if (!urlPattern.test(imageUrl.trim())) {
      newErrors.imageUrl = "Invalid image URL. Please provide a secure link starting with http:// or https://.";
    }

    // 9. Organizer: required
    if (!organizer.trim()) {
      newErrors.organizer = "Organizer name or entity is required.";
    }

    // 10. Capacity: required, >= 1
    const numCapacity = Number(capacity);
    if (!capacity.trim() || isNaN(numCapacity)) {
      newErrors.capacity = "Maximum attendee capacity is required.";
    } else if (numCapacity < 1) {
      newErrors.capacity = "Capacity must be at least 1 attendee.";
    }

    // 11. Specifications: required
    if (!specifications.trim()) {
      newErrors.specifications = "Please provide at least one specification or perk.";
    }

    const isValid = Object.keys(newErrors).length === 0;
    return { isValid, errs: newErrors };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setHasSubmittedOnce(true);

    const { isValid, errs } = validateForm();
    setErrors(errs);

    if (!isValid) {
      toast.error("Please fix the validation errors before publishing.");
      return;
    }

    if (!user) {
      toast.error("You must be logged in to create an event.");
      return;
    }

    setIsSubmitting(true);
    try {
      const specsArray = specifications
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);

      const eventPayload: Omit<Event, "id"> = {
        title: title.trim(),
        shortDescription: shortDescription.trim(),
        fullDescription: fullDescription.trim(),
        category,
        price: Number(price),
        date: new Date(date).toISOString(),
        location: location.trim(),
        imageUrl: imageUrl.trim(),
        organizer: organizer.trim(),
        capacity: Number(capacity),
        specifications: specsArray,
        createdBy: user.uid,
        rating: 4,
        createdAt: new Date().toISOString(),
      };

      await addEvent(eventPayload);
      toast.success("Event created successfully! Redirecting to Manage Events...");
      router.push("/items/manage");
    } catch (err: any) {
      console.error("Failed to add event:", err);
      toast.error(err?.message || "Failed to create event. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const errorCount = Object.keys(errors).length;
  const parsedSpecs = specifications
    .split(",")
    .map((s) => s.trim())
    .filter(Boolean);

  return (
    <div className="w-full max-w-7xl mx-auto px-margin py-8">
      {/* Top Breadcrumb & Header */}
      <div className="max-w-[960px] mx-auto flex flex-col gap-6">
        
        {/* Breadcrumb row */}
        <div className="flex flex-col gap-1">
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs sm:text-sm text-on-surface-variant font-medium"
          >
            <Link href="/" className="hover:text-primary transition-colors">
              Home
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-outline" />
            <Link href="/items" className="hover:text-primary transition-colors">
              Events
            </Link>
            <ChevronRight className="h-3.5 w-3.5 text-outline" />
            <span className="text-on-surface font-semibold">Add New Event</span>
          </nav>

          <div className="flex items-center justify-between gap-4 mt-1 flex-wrap">
            <div className="flex items-center gap-3">
              <h1 className="text-2xl sm:text-3xl font-extrabold text-on-surface tracking-tight">
                Create New Event
              </h1>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed text-xs font-bold uppercase tracking-wider">
                <span className="w-1.5 h-1.5 rounded-full bg-secondary animate-pulse" />
                Draft Mode
              </span>
            </div>

            <div className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-surface-container text-on-surface-variant text-xs font-semibold">
              <CheckCircle2 className="h-4 w-4 text-primary" />
              <span>Auto-sync enabled</span>
            </div>
          </div>
        </div>

        {/* Subtitle contextual banner */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-surface-container-low p-4 sm:p-5 rounded-2xl border border-outline-variant/20">
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="w-10 h-10 rounded-xl bg-primary-fixed text-primary flex items-center justify-center shrink-0">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <p className="font-bold text-sm sm:text-base text-on-surface">
                Experience Setup &amp; Ticketing Engine
              </p>
              <p className="text-xs sm:text-sm text-on-surface-variant">
                Fill in the details below to list your experience, sell tickets, and manage attendees seamlessly.
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 self-end sm:self-center shrink-0 text-on-surface-variant text-xs font-semibold">
            <span className="inline-block w-2 h-2 rounded-full bg-secondary-container" />
            <span>Step 1 of 4</span>
          </div>
        </div>

        {/* Master Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          
          {/* ================= SECTION 1: BASIC DETAILS ================= */}
          <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col gap-6 border border-outline-variant/30">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary-container/10 text-primary-container font-extrabold text-sm flex items-center justify-center">
                  1
                </span>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-on-surface">
                    Basic Details
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Establish core identity, categorization, and foundational copy
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-bold text-on-surface-variant uppercase tracking-wider bg-surface-container px-2.5 py-1 rounded-lg">
                Required Fields
              </span>
            </div>

            <div className="flex flex-col gap-5">
              {/* Event Title */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="title"
                    className="text-xs sm:text-sm font-semibold text-on-surface flex items-center gap-1"
                  >
                    Event Title <span className="text-error font-bold">*</span>
                  </label>
                  <span
                    className={`text-xs ${
                      title.length < 5 ? "text-error font-medium" : "text-on-surface-variant"
                    }`}
                  >
                    {title.length} / 100 characters (min 5)
                  </span>
                </div>
                <input
                  id="title"
                  type="text"
                  value={title}
                  onChange={(e) => {
                    setTitle(e.target.value);
                    if (hasSubmittedOnce) setErrors((prev) => ({ ...prev, title: undefined }));
                  }}
                  placeholder="e.g. NextGen AI & Cloud Summit 2026"
                  className={`w-full h-11 px-4 bg-surface-container-lowest rounded-xl font-medium text-sm text-on-surface focus:outline-none transition-all shadow-xs ${
                    errors.title
                      ? "border-2 border-rose-500 bg-error-container/10 focus:ring-2 focus:ring-rose-500/20"
                      : "border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                {errors.title && (
                  <p className="text-xs text-error font-medium flex items-center gap-1 mt-0.5">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                    <span>{errors.title}</span>
                  </p>
                )}
              </div>

              {/* Short Description */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="shortDescription"
                    className="text-xs sm:text-sm font-semibold text-on-surface flex items-center gap-1"
                  >
                    Short Description <span className="text-error font-bold">*</span>
                  </label>
                  <span
                    className={`text-xs ${
                      shortDescription.length > 120
                        ? "text-error font-bold"
                        : "text-on-surface-variant font-medium"
                    }`}
                  >
                    {shortDescription.length} / 120 characters max
                  </span>
                </div>
                <input
                  id="shortDescription"
                  type="text"
                  value={shortDescription}
                  onChange={(e) => {
                    setShortDescription(e.target.value);
                    if (hasSubmittedOnce) setErrors((prev) => ({ ...prev, shortDescription: undefined }));
                  }}
                  placeholder="A concise summary appearing on event cards and discovery listings"
                  className={`w-full h-11 px-4 bg-surface-container-lowest rounded-xl font-medium text-sm text-on-surface focus:outline-none transition-all shadow-xs ${
                    errors.shortDescription
                      ? "border-2 border-rose-500 bg-error-container/10 focus:ring-2 focus:ring-rose-500/20"
                      : "border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                {errors.shortDescription ? (
                  <p className="text-xs text-error font-medium flex items-center gap-1 mt-0.5">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                    <span>{errors.shortDescription}</span>
                  </p>
                ) : (
                  <p className="text-xs text-on-surface-variant flex items-center gap-1">
                    <Info className="h-3.5 w-3.5 shrink-0" />
                    Max 120 characters. This summary appears directly on social cards and discovery listing teasers.
                  </p>
                )}
              </div>

              {/* Full Description */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="fullDescription"
                    className="text-xs sm:text-sm font-semibold text-on-surface flex items-center gap-1"
                  >
                    Full Description <span className="text-error font-bold">*</span>
                  </label>
                  <span className="text-xs text-on-surface-variant">Detailed agenda &amp; takeaways</span>
                </div>
                <textarea
                  id="fullDescription"
                  rows={6}
                  value={fullDescription}
                  onChange={(e) => {
                    setFullDescription(e.target.value);
                    if (hasSubmittedOnce) setErrors((prev) => ({ ...prev, fullDescription: undefined }));
                  }}
                  placeholder="Detail the agenda, speakers, activities, what attendees will learn and experience..."
                  className={`w-full p-4 bg-surface-container-lowest rounded-xl font-normal text-sm text-on-surface focus:outline-none resize-y leading-relaxed shadow-xs ${
                    errors.fullDescription
                      ? "border-2 border-rose-500 bg-error-container/10 focus:ring-2 focus:ring-rose-500/20"
                      : "border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                {errors.fullDescription && (
                  <p className="text-xs text-error font-medium flex items-center gap-1 mt-0.5">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                    <span>{errors.fullDescription}</span>
                  </p>
                )}
              </div>

              {/* Two Column: Category & Organizer */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
                {/* Category */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="category"
                    className="text-xs sm:text-sm font-semibold text-on-surface flex items-center gap-1"
                  >
                    Category <span className="text-error font-bold">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Layers className="absolute left-3.5 h-4 w-4 text-on-surface-variant pointer-events-none" />
                    <select
                      id="category"
                      value={category}
                      onChange={(e) => {
                        setCategory(e.target.value as EventCategory);
                        if (hasSubmittedOnce) setErrors((prev) => ({ ...prev, category: undefined }));
                      }}
                      className="w-full h-11 pl-11 pr-10 bg-surface-container-lowest rounded-xl border border-outline-variant/40 text-sm text-on-surface focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all appearance-none cursor-pointer shadow-xs font-medium"
                    >
                      {CATEGORIES.map((cat) => (
                        <option key={cat} value={cat}>
                          {cat}
                        </option>
                      ))}
                    </select>
                  </div>
                  {errors.category && (
                    <p className="text-xs text-error font-medium">{errors.category}</p>
                  )}
                </div>

                {/* Organizer */}
                <div className="flex flex-col gap-1.5">
                  <label
                    htmlFor="organizer"
                    className="text-xs sm:text-sm font-semibold text-on-surface flex items-center gap-1"
                  >
                    Organizer Entity / Name <span className="text-error font-bold">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Building className="absolute left-3.5 h-4 w-4 text-on-surface-variant pointer-events-none" />
                    <input
                      id="organizer"
                      type="text"
                      value={organizer}
                      onChange={(e) => {
                        setOrganizer(e.target.value);
                        if (hasSubmittedOnce) setErrors((prev) => ({ ...prev, organizer: undefined }));
                      }}
                      placeholder="e.g. CloudScale Frontiers & DevPulse Foundation"
                      className={`w-full h-11 pl-11 pr-4 bg-surface-container-lowest rounded-xl text-sm text-on-surface focus:outline-none transition-all shadow-xs ${
                        errors.organizer
                          ? "border-2 border-rose-500 bg-error-container/10 focus:ring-2 focus:ring-rose-500/20"
                          : "border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
                      }`}
                    />
                  </div>
                  {errors.organizer && (
                    <p className="text-xs text-error font-medium flex items-center gap-1 mt-0.5">
                      <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                      <span>{errors.organizer}</span>
                    </p>
                  )}
                </div>
              </div>

            </div>
          </section>

          {/* ================= SECTION 2: DATE & LOCATION ================= */}
          <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col gap-6 border border-outline-variant/30">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary-container/10 text-primary-container font-extrabold text-sm flex items-center justify-center">
                  2
                </span>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-on-surface">
                    Date &amp; Location
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Specify timing schedule and physical or virtual venue presence
                  </p>
                </div>
              </div>
              <span className="text-xs text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-lg font-medium">
                Future Timing Required
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Event Date & Time */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="date"
                    className="text-xs sm:text-sm font-semibold text-on-surface flex items-center gap-1"
                  >
                    Event Date &amp; Time <span className="text-error font-bold">*</span>
                  </label>
                  {errors.date && (
                    <span className="text-[11px] text-error font-bold uppercase tracking-wider">
                      Future date required
                    </span>
                  )}
                </div>
                <div className="relative flex items-center">
                  <Calendar className="absolute left-3.5 h-4 w-4 text-on-surface-variant pointer-events-none" />
                  <input
                    id="date"
                    type="datetime-local"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      if (hasSubmittedOnce) setErrors((prev) => ({ ...prev, date: undefined }));
                    }}
                    className={`w-full h-11 pl-11 pr-4 bg-surface-container-lowest rounded-xl text-sm text-on-surface focus:outline-none transition-all shadow-xs font-medium cursor-pointer ${
                      errors.date
                        ? "border-2 border-rose-500 bg-error-container/10 focus:ring-2 focus:ring-rose-500/20"
                        : "border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                </div>
                {errors.date ? (
                  <p className="text-xs text-error font-medium flex items-center gap-1 mt-0.5">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                    <span>{errors.date}</span>
                  </p>
                ) : (
                  <p className="text-xs text-on-surface-variant">
                    Please select a date and start time occurring in the future.
                  </p>
                )}
              </div>

              {/* Venue Location */}
              <div className="flex flex-col gap-1.5">
                <label
                  htmlFor="location"
                  className="text-xs sm:text-sm font-semibold text-on-surface flex items-center gap-1"
                >
                  Venue Location or Address <span className="text-error font-bold">*</span>
                </label>
                <div className="relative flex items-center">
                  <MapPin className="absolute left-3.5 h-4 w-4 text-on-surface-variant pointer-events-none" />
                  <input
                    id="location"
                    type="text"
                    value={location}
                    onChange={(e) => {
                      setLocation(e.target.value);
                      if (hasSubmittedOnce) setErrors((prev) => ({ ...prev, location: undefined }));
                    }}
                    placeholder="e.g. Moscone West Center, 800 Howard St, San Francisco, CA"
                    className={`w-full h-11 pl-11 pr-4 bg-surface-container-lowest rounded-xl text-sm text-on-surface focus:outline-none transition-all shadow-xs ${
                      errors.location
                        ? "border-2 border-rose-500 bg-error-container/10 focus:ring-2 focus:ring-rose-500/20"
                        : "border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                </div>
                {errors.location && (
                  <p className="text-xs text-error font-medium flex items-center gap-1 mt-0.5">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                    <span>{errors.location}</span>
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* ================= SECTION 3: TICKETING & CAPACITY ================= */}
          <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col gap-6 border border-outline-variant/30">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary-container/10 text-primary-container font-extrabold text-sm flex items-center justify-center">
                  3
                </span>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-on-surface">
                    Ticketing &amp; Capacity
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    Set pricing schemes, registration tiers, and physical venue limits
                  </p>
                </div>
              </div>
              <span className="text-xs text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-lg font-medium">
                Free or Paid
              </span>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {/* Ticket Price */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="price"
                    className="text-xs sm:text-sm font-semibold text-on-surface flex items-center gap-1"
                  >
                    Ticket Price ($) <span className="text-error font-bold">*</span>
                  </label>
                  {errors.price && (
                    <span className="text-[11px] text-error font-bold uppercase tracking-wider">
                      Invalid Value
                    </span>
                  )}
                </div>
                <div className="relative flex items-center">
                  <DollarSign className="absolute left-3.5 h-4 w-4 text-on-surface-variant pointer-events-none" />
                  <input
                    id="price"
                    type="number"
                    min="0"
                    step="1"
                    value={price}
                    onChange={(e) => {
                      setPrice(e.target.value);
                      if (hasSubmittedOnce) setErrors((prev) => ({ ...prev, price: undefined }));
                    }}
                    placeholder="0 for Free admission"
                    className={`w-full h-11 pl-11 pr-4 bg-surface-container-lowest rounded-xl font-bold text-sm text-on-surface focus:outline-none transition-all shadow-xs ${
                      errors.price
                        ? "border-2 border-rose-500 bg-error-container/10 focus:ring-2 focus:ring-rose-500/20"
                        : "border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                </div>
                {errors.price ? (
                  <p className="text-xs text-error font-medium flex items-center gap-1 mt-0.5">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                    <span>{errors.price}</span>
                  </p>
                ) : (
                  <p className="text-xs text-on-surface-variant">
                    Enter $0 for free community access, or ticket cost in USD.
                  </p>
                )}
              </div>

              {/* Capacity */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="capacity"
                    className="text-xs sm:text-sm font-semibold text-on-surface flex items-center gap-1"
                  >
                    Max Attendee Capacity <span className="text-error font-bold">*</span>
                  </label>
                  {errors.capacity && (
                    <span className="text-[11px] text-error font-bold uppercase tracking-wider">
                      Min 1 attendee
                    </span>
                  )}
                </div>
                <div className="relative flex items-center">
                  <Users className="absolute left-3.5 h-4 w-4 text-on-surface-variant pointer-events-none" />
                  <input
                    id="capacity"
                    type="number"
                    min="1"
                    value={capacity}
                    onChange={(e) => {
                      setCapacity(e.target.value);
                      if (hasSubmittedOnce) setErrors((prev) => ({ ...prev, capacity: undefined }));
                    }}
                    placeholder="e.g. 500"
                    className={`w-full h-11 pl-11 pr-4 bg-surface-container-lowest rounded-xl font-bold text-sm text-on-surface focus:outline-none transition-all shadow-xs ${
                      errors.capacity
                        ? "border-2 border-rose-500 bg-error-container/10 focus:ring-2 focus:ring-rose-500/20"
                        : "border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                </div>
                {errors.capacity && (
                  <p className="text-xs text-error font-medium flex items-center gap-1 mt-0.5">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                    <span>{errors.capacity}</span>
                  </p>
                )}
              </div>
            </div>
          </section>

          {/* ================= SECTION 4: MEDIA & LOGISTICS ================= */}
          <section className="bg-surface-container-lowest rounded-2xl shadow-sm p-6 sm:p-8 flex flex-col gap-6 border border-outline-variant/30">
            <div className="flex items-center justify-between pb-3 border-b border-surface-container">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-primary-container/10 text-primary-container font-extrabold text-sm flex items-center justify-center">
                  4
                </span>
                <div>
                  <h2 className="text-base sm:text-lg font-bold text-on-surface">
                    Media &amp; Logistics
                  </h2>
                  <p className="text-xs text-on-surface-variant">
                    High-res artwork assets and attendee operational perks
                  </p>
                </div>
              </div>
              <span className="text-xs text-on-surface-variant bg-surface-container px-2.5 py-1 rounded-lg font-medium">
                Asset Specs
              </span>
            </div>

            <div className="flex flex-col gap-5">
              {/* Cover Image URL */}
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="imageUrl"
                    className="text-xs sm:text-sm font-semibold text-on-surface flex items-center gap-1"
                  >
                    Cover Image URL <span className="text-error font-bold">*</span>
                  </label>
                  {errors.imageUrl && (
                    <span className="text-[11px] text-error font-bold uppercase tracking-wider">
                      Invalid URL Protocol
                    </span>
                  )}
                </div>
                <div className="relative flex items-center">
                  <ImageIcon className="absolute left-3.5 h-4 w-4 text-on-surface-variant pointer-events-none" />
                  <input
                    id="imageUrl"
                    type="url"
                    value={imageUrl}
                    onChange={(e) => {
                      setImageUrl(e.target.value);
                      if (hasSubmittedOnce) setErrors((prev) => ({ ...prev, imageUrl: undefined }));
                    }}
                    placeholder="https://images.unsplash.com/photo-..."
                    className={`w-full h-11 pl-11 pr-4 bg-surface-container-lowest rounded-xl font-mono text-xs sm:text-sm text-on-surface focus:outline-none transition-all shadow-xs ${
                      errors.imageUrl
                        ? "border-2 border-rose-500 bg-error-container/10 focus:ring-2 focus:ring-rose-500/20"
                        : "border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
                    }`}
                  />
                </div>
                {errors.imageUrl ? (
                  <p className="text-xs text-error font-medium flex items-center gap-1 mt-0.5">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                    <span>{errors.imageUrl}</span>
                  </p>
                ) : (
                  <p className="text-xs text-on-surface-variant">
                    Provide a valid HTTPS image link (e.g. from Unsplash or image CDN). Recommended ratio: 16:9.
                  </p>
                )}

                {/* Live Image Preview Thumbnail if valid */}
                {imageUrl.startsWith("http") && (
                  <div className="mt-2 relative aspect-[21/9] w-full max-h-48 rounded-xl overflow-hidden bg-surface-container border border-outline-variant/30">
                    <img
                      src={imageUrl}
                      alt="Event cover preview"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = "none";
                      }}
                    />
                    <div className="absolute bottom-2 left-2 px-2.5 py-1 rounded-md bg-black/70 text-white text-[11px] font-semibold">
                      Live Image Preview
                    </div>
                  </div>
                )}
              </div>

              {/* Specifications & Logistics */}
              <div className="flex flex-col gap-1.5 pt-2">
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="specifications"
                    className="text-xs sm:text-sm font-semibold text-on-surface flex items-center gap-1"
                  >
                    Event Specifications &amp; Perks <span className="text-error font-bold">*</span>
                  </label>
                  <span className="text-xs text-on-surface-variant">Comma-separated</span>
                </div>
                <input
                  id="specifications"
                  type="text"
                  value={specifications}
                  onChange={(e) => {
                    setSpecifications(e.target.value);
                    if (hasSubmittedOnce) setErrors((prev) => ({ ...prev, specifications: undefined }));
                  }}
                  placeholder="e.g. Access to Keynotes, Lunch Included, Swag Kit, Digital Recording"
                  className={`w-full h-11 px-4 bg-surface-container-lowest rounded-xl font-medium text-sm text-on-surface focus:outline-none transition-all shadow-xs ${
                    errors.specifications
                      ? "border-2 border-rose-500 bg-error-container/10 focus:ring-2 focus:ring-rose-500/20"
                      : "border border-outline-variant/40 focus:border-primary focus:ring-2 focus:ring-primary/20"
                  }`}
                />
                {errors.specifications && (
                  <p className="text-xs text-error font-medium flex items-center gap-1 mt-0.5">
                    <AlertCircle className="h-3.5 w-3.5 shrink-0 text-rose-500" />
                    <span>{errors.specifications}</span>
                  </p>
                )}

                {/* Live Tag Pills Preview */}
                {parsedSpecs.length > 0 && (
                  <div className="flex flex-wrap items-center gap-2 mt-2">
                    <span className="text-xs text-on-surface-variant font-medium">Included badges:</span>
                    {parsedSpecs.map((tag, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-primary-fixed/40 text-on-primary-fixed text-xs font-semibold"
                      >
                        <Tag className="h-3 w-3 text-primary" />
                        <span>{tag}</span>
                      </span>
                    ))}
                  </div>
                )}
              </div>

            </div>
          </section>

          {/* ================= STICKY BOTTOM FORM ACTIONS BAR ================= */}
          <div className="sticky bottom-6 z-40 bg-surface-container-lowest/95 backdrop-blur-xl rounded-2xl shadow-xl p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-4 border border-outline-variant/30">
            <div className="flex items-center gap-3 w-full sm:w-auto">
              {hasSubmittedOnce && errorCount > 0 ? (
                <>
                  <AlertTriangle className="text-rose-500 h-5 w-5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-bold text-on-surface">
                      {errorCount} Validation Error{errorCount > 1 ? "s" : ""} Require Attention
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      Please resolve highlighted fields before publishing.
                    </span>
                  </div>
                </>
              ) : (
                <>
                  <CheckCircle2 className="text-emerald-500 h-5 w-5 shrink-0" />
                  <div className="flex flex-col">
                    <span className="text-xs sm:text-sm font-bold text-on-surface">
                      Ready to Publish
                    </span>
                    <span className="text-xs text-on-surface-variant">
                      Your event will immediately become active in the community catalog.
                    </span>
                  </div>
                </>
              )}
            </div>

            <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
              <Link
                href="/items/manage"
                className="px-4 h-11 rounded-xl bg-surface-container-low hover:bg-surface-container text-on-surface font-semibold text-xs sm:text-sm transition-colors flex items-center justify-center border border-outline-variant/30"
              >
                Discard Draft
              </Link>

              <button
                type="submit"
                disabled={isSubmitting}
                className="px-6 h-11 rounded-xl bg-primary hover:bg-primary-container text-on-primary font-bold text-xs sm:text-sm shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed group active:scale-[0.99]"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin text-on-primary" />
                    <span>Publishing Event...</span>
                  </>
                ) : (
                  <>
                    <span>Publish Event</span>
                    <ArrowRight className="h-4 w-4 group-hover:translate-x-0.5 transition-transform" />
                  </>
                )}
              </button>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
}

export default function AddEventPage() {
  return (
    <ProtectedRoute>
      <AddEventForm />
    </ProtectedRoute>
  );
}
