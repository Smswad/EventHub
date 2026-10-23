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

const LOCAL_STORAGE_KEY = "eventhub_custom_events";

function getLocalEvents(): Event[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveLocalEvent(event: Event): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalEvents();
    const updated = [event, ...existing.filter((e) => e.id !== event.id)];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Could not save to localStorage:", e);
  }
}

function removeLocalEvent(id: string): void {
  if (typeof window === "undefined") return;
  try {
    const existing = getLocalEvents();
    const updated = existing.filter((e) => e.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updated));
  } catch (e) {
    console.warn("Could not remove from localStorage:", e);
  }
}

export async function getEvents(): Promise<Event[]> {
  const localList = getLocalEvents();
  let firestoreEvents: Event[] = [];

  try {
    const eventsCol = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(eventsCol);

    if (!snapshot.empty) {
      firestoreEvents = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Event, "id">),
      }));
    }
  } catch (error) {
    console.warn("Could not query Firestore events collection, using fallback catalog:", error);
  }

  // Base list is Firestore if populated, otherwise fallback seed events
  const baseList = firestoreEvents.length > 0 ? firestoreEvents : fallbackEvents;

  // Merge local custom events (prevent duplicates)
  const baseIds = new Set(baseList.map((e) => e.id));
  const uniqueLocal = localList.filter((e) => !baseIds.has(e.id));

  return [...uniqueLocal, ...baseList];
}

export async function getEventById(id: string): Promise<Event | null> {
  // Check local events first
  const localList = getLocalEvents();
  const localFound = localList.find((e) => e.id === id);
  if (localFound) return localFound;

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
  let createdId = `event-local-${Date.now()}`;

  try {
    const eventsCol = collection(db, COLLECTION_NAME);
    const docRef = await addDoc(eventsCol, eventData);
    createdId = docRef.id;
    console.log("Successfully wrote event to Cloud Firestore with ID:", createdId);
  } catch (error) {
    console.warn("Firestore addDoc failed (check security rules), caching locally:", error);
  }

  // Always cache locally so the user immediately sees it in their dashboard
  saveLocalEvent({
    id: createdId,
    ...eventData,
  });

  return createdId;
}

export async function deleteEvent(id: string): Promise<void> {
  // Remove from local cache
  removeLocalEvent(id);

  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    console.log("Successfully deleted event from Cloud Firestore:", id);
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
