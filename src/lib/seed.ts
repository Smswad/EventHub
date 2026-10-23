import { collection, getDocs, writeBatch, doc } from "firebase/firestore";
import { db } from "./firebase";
import { Event } from "@/types/event";

export const initialSeedEvents: Omit<Event, "id">[] = [
  {
    title: "Global Tech Summit 2026",
    shortDescription: "Annual convention of pioneering software architects and AI visionaries.",
    fullDescription: "Join over 5,000 technology innovators, researchers, and executives from around the globe at the Global Tech Summit 2026. This comprehensive 3-day conference explores breakthroughs in artificial intelligence, cloud architectures, cybersecurity, and quantum computing with hands-on technical keynotes and live demonstrations.",
    category: "Conference",
    price: 349,
    date: "2026-11-15T09:00:00.000Z",
    location: "San Francisco Convention Center, CA",
    imageUrl: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    organizer: "TechWorld Federation",
    capacity: 2500,
    specifications: [
      "Access to 40+ keynote sessions and panel discussions",
      "Interactive workshop pass included",
      "Full catered lunch and networking receptions",
      "Digital recordings of all recorded sessions"
    ],
    createdBy: "system_seed",
    createdAt: "2026-10-01T10:00:00.000Z",
  },
  {
    title: "Future of Healthcare Congress",
    shortDescription: "Exploring telemedicine, AI diagnostics, and patient-centered digital health.",
    fullDescription: "The Healthcare Congress connects practitioners, medical device founders, and clinical researchers to discuss digital health innovations, robotic surgery, and genomic data analytics shaping the next decade of healthcare.",
    category: "Conference",
    price: 199,
    date: "2026-12-05T08:30:00.000Z",
    location: "Metro Hall & Expo Center, Chicago, IL",
    imageUrl: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    organizer: "MedFuture Institute",
    capacity: 1200,
    specifications: [
      "CME certification credits available",
      "Medical device showcase access",
      "Executive roundtables"
    ],
    createdBy: "system_seed",
    createdAt: "2026-10-02T11:00:00.000Z",
  },
  {
    title: "Neon Horizon Music & Arts Festival",
    shortDescription: "An electrifying multi-stage weekend celebration of live electronic, indie, and alternative music.",
    fullDescription: "Neon Horizon brings together leading international touring artists and local sensations across 3 immersive stages. Enjoy state-of-the-art audiovisual production, food truck villages, artisanal markets, and open-air sunset performances.",
    category: "Concert",
    price: 120,
    date: "2026-11-20T17:00:00.000Z",
    location: "Sunset Bay Amphitheater, Austin, TX",
    imageUrl: "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    organizer: "Pulse Entertainment",
    capacity: 6000,
    specifications: [
      "General admission access to all 3 outdoor stages",
      "Complimentary hydration stations",
      "On-site artisan food village and craft beverages"
    ],
    createdBy: "system_seed",
    createdAt: "2026-10-03T09:00:00.000Z",
  },
  {
    title: "Acoustic Nights: Symphony & Strings",
    shortDescription: "An intimate evening of classical masterpieces and modern cinematic scores.",
    fullDescription: "Experience an enchanting night with the Metropolitan Chamber Orchestra performing iconic works from Beethoven, Debussy, and contemporary film compositions under stunning vaulted acoustics.",
    category: "Concert",
    price: 65,
    date: "2026-11-28T19:30:00.000Z",
    location: "St. Jude Philharmonic Hall, Boston, MA",
    imageUrl: "https://images.unsplash.com/photo-1465847899084-d164df4dedc6?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    organizer: "Metropolitan Orchestra Society",
    capacity: 850,
    specifications: [
      "Reserved theater seating",
      "Program booklet included",
      "Intermission wine and canapé service"
    ],
    createdBy: "system_seed",
    createdAt: "2026-10-04T12:00:00.000Z",
  },
  {
    title: "Full-Stack Next.js 16 & TypeScript Masterclass",
    shortDescription: "Hands-on, project-driven deep dive into modern web architecture and React 19.",
    fullDescription: "Spend an intensive full-day building scalable, production-grade applications with Next.js App Router, Server Actions, TypeScript strict patterns, and modern state workflows led by industry veterans.",
    category: "Workshop",
    price: 95,
    date: "2026-11-12T10:00:00.000Z",
    location: "Downtown Innovation Campus, Seattle, WA",
    imageUrl: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&w=1200&q=80",
    rating: 5.0,
    organizer: "DevCraft Guild",
    capacity: 60,
    specifications: [
      "All workshop code repositories and slide decks",
      "Personal code review by the instructor",
      "Certificate of Completion",
      "Complimentary espresso bar and catered lunch"
    ],
    createdBy: "system_seed",
    createdAt: "2026-10-05T08:00:00.000Z",
  },
  {
    title: "Modern UI/UX Design Systems Workshop",
    shortDescription: "Learn to design, tokenize, and maintain production-ready component systems.",
    fullDescription: "A practical masterclass focusing on design tokens, Figma component sets, accessibility compliance, and developer handoff workflows for high-growth product teams.",
    category: "Workshop",
    price: 0,
    date: "2026-12-02T14:00:00.000Z",
    location: "Online / Virtual Campus",
    imageUrl: "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    organizer: "Creative Collective",
    capacity: 400,
    specifications: [
      "Interactive Figma playground files",
      "Design tokens cheat sheet",
      "Live Q&A with Senior Product Designers"
    ],
    createdBy: "system_seed",
    createdAt: "2026-10-06T14:30:00.000Z",
  },
  {
    title: "Blissful Moments Luxury Bridal Expo",
    shortDescription: "Premier wedding showcase featuring floral artists, couture designers, and caterers.",
    fullDescription: "Discover inspiration for your dream celebration. Meet over 80 verified wedding planners, photographers, floral designers, and culinary artisans with live runway shows and cake tastings.",
    category: "Wedding",
    price: 25,
    date: "2026-11-22T11:00:00.000Z",
    location: "Grand Heritage Palace, Charleston, SC",
    imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1200&q=80",
    rating: 4.6,
    organizer: "Bridal Elegance Guild",
    capacity: 800,
    specifications: [
      "Exclusive bridal gift tote bag",
      "Live designer runway presentations",
      "Tasting sessions with artisan patisseries"
    ],
    createdBy: "system_seed",
    createdAt: "2026-10-07T16:00:00.000Z",
  },
  {
    title: "Rustic Vineyard Wedding Showcase",
    shortDescription: "Curated open house for romantic estate weddings and reception styling.",
    fullDescription: "Stroll through picturesque vineyard grounds, view tablescapes styled by boutique event designers, sample farm-to-table wine pairings, and consult with venue coordinators.",
    category: "Wedding",
    price: 0,
    date: "2026-12-10T13:00:00.000Z",
    location: "Meadowood Estates, Napa Valley, CA",
    imageUrl: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    organizer: "Napa Valley Hospitality Group",
    capacity: 250,
    specifications: [
      "Guided estate and cellar tours",
      "Sommelier-led wine pairing sample",
      "One-on-one booking consultation discount"
    ],
    createdBy: "system_seed",
    createdAt: "2026-10-08T10:00:00.000Z",
  },
  {
    title: "City Marathon & 10K Community Run",
    shortDescription: "Scenic coastal race through landmark bridges and harbor avenues.",
    fullDescription: "Challenge yourself alongside thousands of enthusiastic runners in the premier city running event. Complete with professional chip timing, pacers, energetic cheer zones, and a festive post-race park expo.",
    category: "Sports",
    price: 45,
    date: "2026-11-08T07:00:00.000Z",
    location: "Harbor Promenade, San Diego, CA",
    imageUrl: "https://images.unsplash.com/photo-1452626038306-9aae5e071dd3?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    organizer: "Coastal Athletics League",
    capacity: 3500,
    specifications: [
      "Official moisture-wicking technical shirt",
      "Finisher medal and digital race photos",
      "Precision bib timing chip and hydration stations"
    ],
    createdBy: "system_seed",
    createdAt: "2026-10-09T06:00:00.000Z",
  },
  {
    title: "Open Invitational Padel & Tennis Championship",
    shortDescription: "Amateur and semi-pro bracket tournament with spectator exhibition matches.",
    fullDescription: "Enjoy three days of intense racquet competition featuring doubles padel and singles tennis brackets, pro exhibition games, clinics, and equipment demo lounges.",
    category: "Sports",
    price: 30,
    date: "2026-12-14T09:00:00.000Z",
    location: "Racquet Club Marina, Miami, FL",
    imageUrl: "https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=80",
    rating: 4.7,
    organizer: "Racquet Masters Tour",
    capacity: 1000,
    specifications: [
      "All-court access pass",
      "Complimentary tournament racket test session",
      "Court-side lounge hospitality"
    ],
    createdBy: "system_seed",
    createdAt: "2026-10-10T08:30:00.000Z",
  },
  {
    title: "Founders & Angels Speed Networking Mixer",
    shortDescription: "Fast-paced pitch rounds and curated connections between early-stage startups and investors.",
    fullDescription: "Connect with high-caliber seed and Series A founders, venture capitalists, and angel syndicates. Features lightning 5-minute introductions followed by open reception mixers and deal rooms.",
    category: "Networking",
    price: 50,
    date: "2026-11-18T18:00:00.000Z",
    location: "Skyline Tower Penthouse, New York, NY",
    imageUrl: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=1200&q=80",
    rating: 4.9,
    organizer: "Venture Connect NYC",
    capacity: 180,
    specifications: [
      "Curated 1-on-1 intro matchmaking",
      "Complimentary signature cocktails and hors d'oeuvres",
      "Access to investor and founder directory"
    ],
    createdBy: "system_seed",
    createdAt: "2026-10-11T17:00:00.000Z",
  },
  {
    title: "Creative Minds Coffee & Collaboration Hour",
    shortDescription: "Casual morning meetup for freelance creatives, designers, and storytellers.",
    fullDescription: "A relaxed, community-first gathering designed to spark collaboration among independent freelancers, art directors, copywriters, and content creators over specialty coffee.",
    category: "Networking",
    price: 0,
    date: "2026-12-06T10:00:00.000Z",
    location: "Artisan Roasters Commons, Portland, OR",
    imageUrl: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=1200&q=80",
    rating: 4.8,
    organizer: "Pacific Northwest Creative Guild",
    capacity: 75,
    specifications: [
      "Complimentary pour-over coffee tasting flight",
      "Project showcase board participation",
      "Shared creative portfolio feedback session"
    ],
    createdBy: "system_seed",
    createdAt: "2026-10-12T09:00:00.000Z",
  },
];

export async function seedEvents(): Promise<Event[]> {
  const eventsCol = collection(db, "events");
  const snapshot = await getDocs(eventsCol);

  if (!snapshot.empty) {
    return snapshot.docs.map((docSnap) => ({
      id: docSnap.id,
      ...(docSnap.data() as Omit<Event, "id">),
    }));
  }

  const batch = writeBatch(db);
  const createdEvents: Event[] = [];

  for (const eventData of initialSeedEvents) {
    const docRef = doc(eventsCol);
    batch.set(docRef, eventData);
    createdEvents.push({
      id: docRef.id,
      ...eventData,
    });
  }

  await batch.commit();
  return createdEvents;
}
