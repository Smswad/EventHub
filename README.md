# EventHub — Event Management & Discovery Platform

EventHub is a modern, responsive full-stack event discovery and ticketing platform built with **Next.js 16 (Turbopack, App Router)**, **Tailwind CSS v4**, and **Firebase (Authentication & Cloud Firestore)**. It empowers attendees to find verified community gatherings, workshops, and conferences while giving hosts tools to publish, manage, and track live experiences.

---

## Links

- **Live Demo:** [https://eventhub.vercel.app](https://eventhub.vercel.app) *(Replace with your live deployment URL)*
- **GitHub Repository:** [https://github.com/Smswad/EventHub](https://github.com/Smswad/EventHub)

---

## Key Features

- **Editorial Landing Page:** 7 curated sections (Sticky Navbar, Hero with live metrics and dual CTAs, 4 Platform Feature cards, 6 Interest Categories, Community Testimonials, Callout Banner, and Footer with `#contact` anchor).
- **Interactive Event Catalog (`/items`):**
  - Instant live search across titles, descriptions, and venue locations.
  - Multi-criteria filtering: Categories (Conference, Concert, Workshop, Wedding, Sports, Networking), Price ranges (All, Free, <$50, $50–$200, $200+), and Minimum Star Rating.
  - Sorting by upcoming date, rating, or price.
  - Responsive card grid with loading skeletons and custom empty state with quick reset.
- **Dynamic Event Details (`/items/[id]`):**
  - Dynamic App Router page with server-rendered SEO metadata (`generateMetadata`).
  - High-res cover image, verified badges, rating, schedule, venue location, capacity progress, full description, and logistics specification list.
  - Related events recommendations based on matching category.
  - "Back to Items" navigation.
- **Organizer Operations Suite (`/items/manage`):**
  - Protected dashboard restricted to authenticated users.
  - Real-time KPI summary cards (Total Events, Active Capacity, Gross Ticketing, Average Rating).
  - Dual layout: Desktop data table and mobile stacked cards.
  - Interactive row actions: Public view and safety confirmation delete modal (requires typing `DELETE` to execute deletion with optimistic state updates and toast feedback).
- **Event Creation Engine (`/items/add`):**
  - Protected multi-step form with live validation errors, future-date checks, non-negative pricing, and image URL preview.
  - Instant save to Cloud Firestore with attribution to current user UID.
- **Authentication & Global State:**
  - Firebase Authentication supporting Email/Password sign-up/login and Google OAuth popup.
  - Global `AuthContext` with automatic route redirection to `/` upon login.
  - Sticky responsive Navbar featuring user profile header, Add Product, Manage Products, and Logout dropdown.
- **Company Story & Mission (`/about`):**
  - Story showcase, 3-step platform architecture breakdown, impact stats row (25k+ events, 1.2M+ attendees), and values grid.

---

## Tech Stack

- **Framework:** Next.js 16.4 (App Router, Turbopack)
- **Library:** React 19
- **Styling:** Tailwind CSS v4 (`@tailwindcss/turbopack`)
- **Backend & Database:** Firebase Auth & Cloud Firestore
- **Icons:** Lucide React
- **Notifications:** React Hot Toast
- **Language:** TypeScript 5

---

## Route Table & Access Levels

| Route | Purpose | Access Level | Description |
| :--- | :--- | :---: | :--- |
| `/` | Landing Page | **Public** | Platform overview, hero, categories, features, testimonials, and footer. |
| `/items` | Event Catalog | **Public** | Searchable & filterable directory of all published events. |
| `/items/[id]` | Event Details | **Public** | Dynamic details page with SEO metadata, specifications, and related events. |
| `/about` | About Us | **Public** | Mission, 3-step "How EventHub Works", platform reach stats, and values. |
| `/login` | Auth Portal | **Public** | Email/Password login & registration, Google OAuth, and redirect to `/`. |
| `/items/add` | Host an Event | **Protected** | Creation form with validation. Unauthenticated users are redirected to `/login`. |
| `/items/manage` | Manage Events | **Protected** | Host operations dashboard with table/cards and delete modal. Redirects to `/login`. |

---

## Project Structure

```text
EventHub/
├── public/                 # Static assets, icons, and favicon
├── src/
│   ├── app/                # Next.js App Router routes
│   │   ├── about/          # /about page (Mission, How It Works, Stats)
│   │   ├── items/          # Event routes
│   │   │   ├── [id]/       # Dynamic event details page
│   │   │   ├── add/        # Add event creation form (Protected)
│   │   │   ├── manage/     # Manage events dashboard (Protected)
│   │   │   └── page.tsx    # Explore events catalog with filters
│   │   ├── login/          # Authentication portal (Login & Register)
│   │   ├── globals.css     # Tailwind CSS tokens and themes
│   │   ├── layout.tsx      # Root layout with AuthProvider and Toaster
│   │   └── page.tsx        # Landing page (7 sections)
│   ├── components/         # Reusable UI components
│   │   ├── home/           # Landing page section modules
│   │   │   ├── HeroSection.tsx
│   │   │   ├── FeaturesSection.tsx
│   │   │   ├── CategoriesSection.tsx
│   │   │   ├── TestimonialsSection.tsx
│   │   │   └── CalloutBanner.tsx
│   │   ├── Footer.tsx      # Global footer with social links & #contact anchor
│   │   ├── ItemCard.tsx    # Responsive event card with category badges
│   │   ├── Navbar.tsx      # Sticky responsive navigation with user dropdown
│   │   └── ProtectedRoute.tsx # Auth boundary with loading state
│   ├── context/
│   │   └── AuthContext.tsx # Firebase authentication context & state
│   ├── lib/
│   │   ├── events.ts       # Firestore CRUD & in-memory fallback operations
│   │   ├── firebase.ts     # Firebase client initialization
│   │   └── seed.ts         # Pre-populated event mock catalogue
│   └── types/
│       └── event.ts        # TypeScript interfaces for Event and Category
├── .env.local.example      # Environment variables template
├── next.config.ts          # Next.js configuration (images, Turbopack)
├── package.json
└── tsconfig.json
```

---

## Local Setup & Installation

### 1. Prerequisites
- Node.js 18.18+ or 20+
- npm or pnpm or yarn

### 2. Clone the Repository
```bash
git clone https://github.com/Smswad/EventHub.git
cd EventHub
```

### 3. Install Dependencies
```bash
npm install
```

### 4. Configure Environment Variables
Create a `.env.local` file in the root directory:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key_here
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 6. Build for Production
```bash
npm run build
npm run start
```

---

## Vercel Deployment Guide

To deploy EventHub on Vercel:

1. **Push your code to GitHub:** Ensure your latest commits are pushed to your GitHub repository.
2. **Import Project into Vercel:**
   - Go to [vercel.com](https://vercel.com) and click **"Add New Project"**.
   - Select your `EventHub` GitHub repository.
3. **Configure Environment Variables:**
   - Under the **Environment Variables** section, add all your `NEXT_PUBLIC_FIREBASE_*` keys:
     - `NEXT_PUBLIC_FIREBASE_API_KEY`
     - `NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN`
     - `NEXT_PUBLIC_FIREBASE_PROJECT_ID`
     - `NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET`
     - `NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID`
     - `NEXT_PUBLIC_FIREBASE_APP_ID`
4. **Deploy:** Click **Deploy**. Vercel will build and assign a deployment URL (e.g. `https://your-project.vercel.app`).
5. **Authorize Domain in Firebase Console:**
   - Navigate to the [Firebase Console](https://console.firebase.google.com/).
   - Select your project.
   - Go to **Build** > **Authentication** > **Settings** > **Authorized domains**.
   - Click **"Add domain"** and enter your Vercel production domain (e.g., `your-project.vercel.app`).
   - *(Optional)* Also add your preview deployment domain pattern if you test PR previews with Google Login.
