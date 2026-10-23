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
import { seedEvents } from "./seed";

const COLLECTION_NAME = "events";

export async function getEvents(): Promise<Event[]> {
  try {
    const eventsCol = collection(db, COLLECTION_NAME);
    const snapshot = await getDocs(eventsCol);

    if (snapshot.empty) {
      return await seedEvents();
    }

    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Event, "id">),
    }));
  } catch (error) {
    console.error("Error fetching events:", error);
    return [];
  }
}

export async function getEventById(id: string): Promise<Event | null> {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return null;
    }

    return {
      id: docSnap.id,
      ...(docSnap.data() as Omit<Event, "id">),
    };
  } catch (error) {
    console.error(`Error fetching event with id ${id}:`, error);
    return null;
  }
}

export async function addEvent(eventData: Omit<Event, "id">): Promise<string> {
  const eventsCol = collection(db, COLLECTION_NAME);
  const docRef = await addDoc(eventsCol, eventData);
  return docRef.id;
}

export async function deleteEvent(id: string): Promise<void> {
  const docRef = doc(db, COLLECTION_NAME, id);
  await deleteDoc(docRef);
}

export async function getRelatedEvents(
  category: EventCategory,
  excludeId: string
): Promise<Event[]> {
  try {
    const eventsCol = collection(db, COLLECTION_NAME);
    // Fetch up to 4 in case one matches excludeId
    const q = query(
      eventsCol,
      where("category", "==", category),
      limit(4)
    );
    const snapshot = await getDocs(q);

    const related = snapshot.docs
      .map((docSnap) => ({
        id: docSnap.id,
        ...(docSnap.data() as Omit<Event, "id">),
      }))
      .filter((event) => event.id !== excludeId);

    return related.slice(0, 3);
  } catch (error) {
    console.error("Error fetching related events:", error);
    return [];
  }
}
