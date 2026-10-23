"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AddEventPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("conference");
  const [price, setPrice] = useState("0");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success("Event placeholder submitted!");
  };

  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-3xl px-margin py-12">
        <div className="mb-8">
          <span className="text-xs font-bold uppercase tracking-wider text-primary">Organizer Portal</span>
          <h1 className="text-3xl font-extrabold text-on-surface mt-1">Create New Event</h1>
          <p className="text-sm text-on-surface-variant">Fill in the details below to list your experience.</p>
        </div>

        <form onSubmit={handleCreate} className="flex flex-col gap-6 p-8 rounded-2xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Event Title *</label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. NextGen Web Summit"
              className="w-full h-11 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Category *</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full h-11 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
            >
              <option value="conference">Conference</option>
              <option value="workshop">Workshop</option>
              <option value="concert">Concert</option>
              <option value="networking">Networking</option>
              <option value="sports">Sports</option>
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Date *</label>
              <input
                type="date"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-on-surface mb-1">Ticket Price ($) *</label>
              <input
                type="number"
                min="0"
                required
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full h-11 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Location *</label>
            <input
              type="text"
              required
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="e.g. Moscone Center, San Francisco"
              className="w-full h-11 px-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-on-surface mb-1">Description *</label>
            <textarea
              rows={5}
              required
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Detail the agenda, speakers, and event highlights..."
              className="w-full p-3 rounded-lg border border-outline-variant bg-surface-container-lowest text-sm focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="submit"
              className="px-6 h-11 rounded-lg bg-primary font-bold text-sm text-on-primary hover:bg-primary-container transition-colors shadow-sm"
            >
              Publish Event
            </button>
          </div>
        </form>
      </div>
    </ProtectedRoute>
  );
}
