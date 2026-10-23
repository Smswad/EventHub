import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  deleteDoc,
  query,
  where,
  limit,
} from "firebase/firestore";
import { db } from "./firebase";
import { Event, EventCategory } from "@/types/event";
import { initialSeedEvents } from "./seed";

const COLLECTION_NAME = "events";

// Deterministic fallback events with fixed IDs
const fallbackEvents: Event[] = initialSeedEvents.map((eventData, idx) => ({
  id: `event-${idx + 1}`,
  ...eventData,
}));

export async function getEvents(): Promise<Event[]> {
  try {
    const eventsCol = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(eventsCol);

    if (snapshot.empty) {
      return fallbackEvents;
    }

    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Event, "id">),
    }));
  } catch (error) {
    console.warn("Could not query Firestore events collection, using seed events:", error);
    return fallbackEvents;
  }
}

export async function getEventById(id: string): Promise<Event | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return {
        id: docSnap.id,
        ...(docSnap.data() as Omit<Event, "id">),
      };
    }
  } catch (error) {
    console.warn(`Firestore getDoc failed for id ${id}, checking fallback events:`, error);
  }

  // Check fallback events
  const found = fallbackEvents.find((e) => e.id === id);
  return found || null;
}

export async function addEvent(eventData: Omit<Event, "id">): Promise<string> {
  try {
    const eventsCol = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(eventsCol, eventData);
    return docRef.id;
  } catch (error) {
    console.warn("Firestore addDoc failed, creating in-memory event id:", error);
    return `event-local-${Date.now()}`;
  }
}

export async function deleteEvent(id: string): Promise<void> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
  } catch (error) {
    console.warn(`Firestore deleteDoc failed for id ${id}:`, error);
  }
}

export async function getRelatedEvents(
  category: EventCategory,
  excludeId: string
): Promise<Event[]> {
  try {
    const eventsCol = collection(db, COLLECTION_NAME);
    const q = query(
      eventsCol,
      where("category", "==", category),
      limit(4)
    );
    const snapshot = await getDocs(q);

    if (!snapshot.empty) {
      const related = snapshot.docs
        .map((docSnap) => ({
          id: docSnap.id,
          ...(docSnap.data() as Omit<Event, "id">),
        }))
        .filter((event) => event.id !== excludeId);

      if (related.length > 0) return related.slice(0, 3);
    }
  } catch (error) {
    console.warn("Firestore getRelatedEvents failed, using fallback:", error);
  }

  // Fallback related events
  return fallbackEvents
    .filter((e) => e.category === category && e.id !== excludeId)
    .slice(0, 3);
}
