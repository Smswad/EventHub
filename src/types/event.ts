export interface EventItem {
  id: string;
  title: string;
  shortDescription?: string;
  description: string;
  category: "conference" | "concert" | "workshop" | "wedding" | "sports" | "networking" | string;
  organizerName: string;
  organizerEmail?: string;
  date: string; // ISO string or formatted date
  time?: string;
  location: string;
  price: number;
  capacity: number;
  imageUrl?: string;
  featured?: boolean;
  status?: "active" | "draft" | "completed";
  ticketsSold?: number;
  createdAt?: string;
  updatedAt?: string;
}
