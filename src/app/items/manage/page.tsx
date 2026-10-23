"use client";

import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import { Plus, Trash2, Eye } from "lucide-react";

export default function ManageEventsPage() {
  return (
    <ProtectedRoute>
      <div className="mx-auto max-w-7xl px-margin py-12">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-extrabold text-on-surface">Manage Events</h1>
            <p className="text-sm text-on-surface-variant">View and manage your hosted experiences.</p>
          </div>
          <Link
            href="/items/add"
            className="inline-flex items-center gap-2 rounded-lg bg-primary px-4 py-2.5 text-sm font-bold text-on-primary hover:bg-primary-container transition-colors shadow-sm self-start"
          >
            <Plus className="h-4 w-4" />
            <span>Create New Event</span>
          </Link>
        </div>

        <div className="rounded-2xl border border-outline-variant/30 bg-surface-container-lowest overflow-hidden shadow-sm">
          <div className="p-8 text-center text-on-surface-variant">
            <p className="font-semibold text-on-surface">No events created yet.</p>
            <p className="text-sm mt-1">When you create events, they will appear here with analytics and controls.</p>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
