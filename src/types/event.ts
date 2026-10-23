export type EventCategory =
  | "Conference"
  | "Concert"
  | "Workshop"
  | "Wedding"
  | "Sports"
  | "Networking";

export interface Event {
  id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: EventCategory;
  price: number; // 0 = free
  date: string; // ISO
  location: string;
  imageUrl: string;
  rating: number; // 1-5
  organizer: string;
  capacity: number;
  specifications: string[];
  createdBy: string; // uid
  createdAt: string;
}

// Alias for backwards compatibility if needed
export type EventItem = Event;
