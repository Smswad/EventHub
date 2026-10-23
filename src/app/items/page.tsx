import ItemCard from "@/components/ItemCard";
import { EventItem } from "@/types/event";

// Placeholder data for initial compile and view
const mockEvents: EventItem[] = [
  {
    id: "1",
    title: "Global AI & Cloud Summit 2026",
    shortDescription: "Join world-renowned engineers, architects, and AI pioneers for three intensive days.",
    fullDescription: "Detailed session about distributed systems and generative AI infrastructure.",
    category: "Conference",
    organizer: "CloudScale Frontiers",
    date: "2026-11-14T09:00:00.000Z",
    location: "Moscone West, San Francisco, CA",
    price: 299,
    capacity: 1500,
    rating: 4.9,
    specifications: ["All sessions included"],
    createdBy: "system_seed",
    createdAt: "2026-10-01T10:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Full-Stack Design Systems Masterclass",
    shortDescription: "A comprehensive hands-on virtual studio covering token architectures.",
    fullDescription: "Learn modern token workflows with Figma, Tailwind, and React.",
    category: "Workshop",
    organizer: "Creators Collective",
    date: "2026-12-05T14:00:00.000Z",
    location: "Virtual Event",
    price: 0,
    capacity: 500,
    rating: 4.8,
    specifications: ["Figma assets"],
    createdBy: "system_seed",
    createdAt: "2026-10-02T10:00:00.000Z",
    imageUrl: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800&auto=format&fit=crop",
  },
];

export default function ItemsPage() {
  return (
    <div className="mx-auto max-w-7xl px-margin py-12">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-on-surface">Explore Events</h1>
        <p className="text-on-surface-variant text-sm mt-1">
          Find upcoming conferences, concerts, workshops, and gatherings.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockEvents.map((event) => (
          <ItemCard key={event.id} event={event} />
        ))}
      </div>
    </div>
  );
}
