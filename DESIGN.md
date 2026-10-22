---
name: Vibrant Horizon
colors:
  surface: '#f7f9fb'
  surface-dim: '#d8dadc'
  surface-bright: '#f7f9fb'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f6'
  surface-container: '#eceef0'
  surface-container-high: '#e6e8ea'
  surface-container-highest: '#e0e3e5'
  on-surface: '#191c1e'
  on-surface-variant: '#464555'
  inverse-surface: '#2d3133'
  inverse-on-surface: '#eff1f3'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary: '#7e3000'
  on-tertiary: '#ffffff'
  tertiary-container: '#a44100'
  on-tertiary-container: '#ffd2be'
  tertiary-fixed: '#ffdbcc'
  tertiary-fixed-dim: '#ffb695'
  on-tertiary-fixed: '#351000'
  on-tertiary-fixed-variant: '#7b2f00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  background: '#f7f9fb'
  on-background: '#191c1e'
  surface-variant: '#e0e3e5'
typography:
  headline-xl:
    fontFamily: Inter
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.02em
  headline-xl-mobile:
    fontFamily: Inter
    fontSize: 30px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '600'
    lineHeight: 40px
    letterSpacing: -0.015em
  headline-lg-mobile:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.015em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '600'
    lineHeight: 32px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 28px
  title-md:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 26px
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 20px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Inter
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.25rem
  DEFAULT: 0.25rem
  md: 0.5rem
  lg: 0.5rem
  xl: 0.75rem
  2xl: 1rem
  full: 9999px
spacing:
  gutter: 1.5rem
  gutter-mobile: 1rem
  margin: 2rem
  margin-mobile: 1rem
  space-xs: 0.5rem
  space-sm: 0.75rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style Philosophy

EventHub is a modern, high-clarity event discovery, hosting, and ticketing ecosystem. It pairs structural authority with energetic community vibes.
The visual aesthetic adheres to **Material 3 / Corporate Modern with Tactile Refinement**:
- **Strict Token Adherence:** All colors and surface styles map directly to Material 3 / Stitch tokens (`surface`, `surface-container-*`, `primary`, `primary-container`, `secondary`, `tertiary`, `error`, `outline-variant`).
- **Tactile Surfaces:** Pure white container cards (`#ffffff` / `bg-surface-container-lowest`) hovering softly over a crisp, cool neutral canvas (`#f7f9fb` / `bg-surface` or `bg-background`).
- **Authoritative Indigo & Energetic Amber:** Deep Indigo (`#3525cd` / `primary`) and vibrant Indigo container (`#4f46e5` / `primary-container`) govern primary actions and brand presence. Warm Golden Amber (`#fea619` / `secondary-container`, `#855300` / `secondary`, `#ffddb8` / `secondary-fixed`) delivers excitement for ratings, badges, and high-conversion hooks.
- **Micro-elevation & Hairline Boundaries:** Interfaces prioritize diffused ambient drop shadows (`shadow-sm`, `shadow-md`, `shadow-xl`) paired with 1px low-contrast boundaries (`border-outline-variant/30` or `/40`).

---

## Color System

### Primary & Action (Indigo)
- **`primary` (`#3525cd`):** Dark authoritative indigo for primary button backgrounds, active navigation text (`text-primary`), active checkbox fills, and brand symbols.
- **`primary-container` (`#4f46e5`):** Radiant indigo accent for high-visibility CTAs, prominent badges, hero gradients, and progress indicators.
- **`on-primary` (`#ffffff`):** High-contrast crisp white foreground for text and icons sitting on `primary` or `primary-container`.
- **`primary-fixed` (`#e2dfff`):** Soft pastel lavender used for category icon backgrounds, pill chips, and subtle focus glows.
- **`on-primary-fixed` (`#0f0069`):** Deep midnight text on `primary-fixed` chips.
- **`primary-fixed-dim` (`#c3c0ff`):** Secondary interactive chip surface.

### Secondary & Accent (Amber)
- **`secondary` (`#855300`):** Rich amber-brown used for star ratings, secondary badges, and emphasis typography.
- **`secondary-container` (`#fea619`):** High-energy golden yellow used for live indicator dots, "Host Event" CTAs, and promotional accents.
- **`on-secondary-container` (`#684000`):** Dark golden-brown contrast text on secondary container fills.
- **`secondary-fixed` (`#ffddb8`):** Soft warm peach tint for live stream badges, status pills, and bento card icons.
- **`on-secondary-fixed` (`#2a1700`):** Dark contrast text on `secondary-fixed`.
- **`secondary-fixed-dim` (`#ffb95f`):** Mid-tone warm amber pill tint.

### Tertiary & Neutral Accents
- **`tertiary` (`#7e3000`) & `tertiary-container` (`#a44100`):** Deep warm spice tones for specialized badges, warning highlights, and calendar events.
- **`tertiary-fixed` (`#ffdbcc`):** Peach-salmon tint for networking chips and tags.
- **`on-tertiary-fixed` (`#351000`):** Contrast text for `tertiary-fixed`.

### Canvas & Surface Hierarchy
- **Canvas Base:** `bg-background` / `bg-surface` (`#f7f9fb`).
- **Surface Level 0 (Cards / Tables / Modals):** `bg-surface-container-lowest` (`#ffffff`).
- **Surface Level 1 (Recessed Sections / Input Wells):** `bg-surface-container-low` (`#f2f4f6`).
- **Surface Level 2 (Standard Surfaces / Hover States):** `bg-surface-container` (`#eceef0`).
- **Surface Level 3 (Dividers / Borders / Inactive Elements):** `bg-surface-container-high` (`#e6e8ea`) and `bg-surface-container-highest` (`#e0e3e5`).
- **Inverse Canvas (Scrim & Overlays):** `bg-inverse-surface` (`#2d3133`) with `text-inverse-on-surface` (`#eff1f3`).

### Text & Outline Tokens
- **`on-surface` (`#191c1e`):** Primary headings, card titles, and high-emphasis body text.
- **`on-surface-variant` (`#464555`):** Subtitles, metadata, secondary body copy, and icons.
- **`outline` (`#777587`):** Placeholder text, passive icons, and subtle dividers.
- **`outline-variant` (`#c7c4d8`):** Structural 1px border outlines for input fields, table dividers, and container cards.

### State & Validation Accents
- **Success / Live:** `emerald-500` (`#10b981`), `emerald-600` (`#059669`), `bg-emerald-50` (`#ecfdf5`). Used for auto-save toast notifications and active verification checkmarks.
- **Error / Destructive:** `error` (`#ba1a1a`), `error-container` (`#ffdad6`), `on-error` (`#ffffff`), `on-error-container` (`#93000a`). Form input violation uses `border-2 border-rose-500` with `text-rose-500` and `bg-error-container/10`.

---

## Typography System

Inter is the single typographic voice across the entire application, supplemented by Google Material Symbols Outlined for iconography.

| Token | Size | Line Height | Weight | Letter Spacing | Target Usage |
|---|---|---|---|---|---|
| `headline-xl` | 40px | 48px | 700 (Bold) | -0.02em | Page hero titles, display headers |
| `headline-xl-mobile` | 30px | 38px | 700 (Bold) | -0.02em | Mobile hero titles |
| `headline-lg` | 32px | 40px | 600 (Semibold) | -0.015em | Major section headers, modal titles |
| `headline-lg-mobile` | 24px | 32px | 600 (Semibold) | -0.015em | Mobile section headers, screen titles |
| `headline-md` | 24px | 32px | 600 (Semibold) | -0.01em | Sub-section titles, large metric values |
| `headline-sm` | 20px | 28px | 600 (Semibold) | 0 | Card titles, modal headers, logo title |
| `title-md` | 18px | 26px | 600 / 700 | 0 | Component block titles, form group headings |
| `body-lg` | 16px | 24px | 400 (Regular) | 0 | Hero summaries, article descriptions |
| `body-md` | 14px | 20px | 400 (Regular) | 0 | Default body copy, form input text, list text |
| `body-sm` | 12px | 16px | 400 (Regular) | 0 | Secondary metadata, timestamps, captions |
| `label-lg` | 14px | 20px | 600 (Semibold) | 0.01em | Primary buttons, navigation items, form labels |
| `label-md` | 12px | 16px | 600 (Semibold) | 0.02em | Filter chips, dropdown selects, table labels |
| `label-sm` | 10px | 14px | 700 (Bold) | 0.04em | Uppercase category tags, micro-badges |

### Monospace & Icon Specifications
- **Monospace Code/URLs:** Uses `font-mono text-xs` for technical URLs and cryptographic identifiers.
- **Icon Sizing:**
  - `text-[14px]`: Inside micro-badges and helper chips.
  - `text-[16px]`: Inline with secondary metadata (calendar, location).
  - `text-[18px]`: Standard form field prefixes, button icons, navbar icons.
  - `text-[20px]`: Primary action triggers, search inputs, modal close buttons.
  - `text-[24px]` – `text-[28px]`: Bento metric icons, category hero cards.
  - `text-[36px]`: Map pins and empty-state illustrations.

---

## Shapes & Border Radii

The interface follows a deliberate hierarchy of roundedness:
- **`rounded-sm` / `rounded` (`0.25rem` / 4px):** Code snippets, table status indicators.
- **`rounded-lg` (`0.5rem` / 8px):** Form text inputs, dropdown selects, standard buttons, pagination buttons, utility icons.
- **`rounded-xl` (`0.75rem` / 12px):** Event discovery cards, bento metrics cards, toast popups, rich-text editor wrapper, mobile event stack cards.
- **`rounded-2xl` (`1rem` / 16px):** Form section containers (`bg-surface-container-lowest`), media hero banners, modal dialog window, category icon backplates.
- **`rounded-full` (`9999px`):** Status badges, category pills, circular action triggers, user avatar groups, live pulse indicators.

---

## Elevation & Shadows

Visual hierarchy is maintained through soft diffused shadows combined with hairline borders:
- **Navbar Header:** `shadow-[0_1px_8px_rgba(0,0,0,0.04)]` with `bg-surface-container-lowest/90 backdrop-blur-xl`.
- **Resting Surface (Cards):** `shadow-sm` (`box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05)`) with `border border-outline-variant/30`.
- **Interactive Hover:** `shadow-md` paired with `-translate-y-1` or `scale-[1.01]`.
- **Flyouts & Dropdown Menus:** `shadow-lg` (`box-shadow: 0 10px 15px -3px rgba(15, 23, 42, 0.08), 0 4px 6px -4px rgba(15, 23, 42, 0.04)`).
- **Modal Dialog Box:** `shadow-[0_20px_25px_-5px_rgba(15,23,42,0.2),0_8px_10px_-6px_rgba(15,23,42,0.1)]`.
- **Mobile Bottom Bar:** `shadow-[0_-2px_12px_rgba(0,0,0,0.06)]` with `backdrop-blur-xl`.

---

## Component Standards

### 1. Buttons
- **Primary Action:**
  - Classes: `px-6 py-3.5 rounded-lg bg-primary text-on-primary font-label-lg font-bold shadow-sm hover:bg-primary-container active:scale-[0.98] transition-all`
  - Compact variant: `px-space-md py-2 rounded-lg font-label-lg`
- **Secondary / Surface Action:**
  - Classes: `px-4 py-2 rounded-lg bg-surface-container hover:bg-surface-container-high text-on-surface font-label-lg transition-colors`
- **Accent / High-Conversion ("Host Event"):**
  - Classes: `px-space-md py-space-xs rounded-lg bg-secondary-container text-on-secondary-container font-label-lg shadow-sm hover:bg-secondary hover:text-on-secondary transition-all`
- **Destructive Action ("Delete Event"):**
  - Classes: `px-5 py-2.5 rounded-lg bg-error text-on-error font-label-lg shadow-sm hover:bg-on-error-container active:scale-[0.98] transition-all`
  - Destructive Icon Button: `w-8 h-8 rounded-lg bg-error-container text-error flex items-center justify-center`
- **Ghost / Icon Button:**
  - Classes: `w-9 h-9 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface-container hover:text-on-surface transition-colors`

### 2. Form Inputs & Validation States
- **Standard Input & Select:**
  - Classes: `w-full h-11 pl-11 pr-4 bg-surface-container-lowest rounded-lg border border-outline-variant font-body-md text-on-surface focus:outline-none focus:border-primary-container focus:ring-2 focus:ring-primary-container/20 shadow-sm transition-all`
  - Prefix icon: `absolute left-3.5 text-on-surface-variant text-[20px] pointer-events-none`
- **Input Error State:**
  - Classes: `border-2 border-rose-500 bg-error-container/10 text-on-surface focus:ring-2 focus:ring-rose-500/20`
  - Trailing alert icon: `absolute right-3 text-rose-500 text-[20px]`
  - Helper error text: `text-body-sm text-error font-medium flex items-start gap-1.5 mt-0.5`
- **Checkboxes & Radio Controls:**
  - Checkbox: `w-4 h-4 rounded text-primary focus:ring-primary focus:ring-offset-0 bg-surface-container-lowest`
  - Custom Radio Tier Card: `p-3 rounded-xl bg-surface-container-low hover:bg-surface-container cursor-pointer transition-colors border border-transparent` (Selected state: `bg-primary-fixed/20 border-primary/30`)

### 3. Cards & Modules
- **Event Discovery Card:**
  - Wrapper: `bg-surface-container-lowest rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-200 flex flex-col h-full hover:-translate-y-1`
  - Image ratio: `aspect-video w-full overflow-hidden bg-surface-container relative`
  - Top Badges: Category pill on top-left (`bg-primary-container text-on-primary px-2.5 py-1 rounded-full`), Rating chip on bottom-right (`bg-inverse-surface/80 backdrop-blur-md text-inverse-on-surface px-2 py-0.5 rounded-md flex items-center gap-1`)
  - Content container: `p-space-lg flex flex-col flex-1 justify-between gap-space-md`
- **Bento Stat Metric Card:**
  - Classes: `bg-surface-container-lowest p-space-md rounded-xl shadow-sm flex items-center justify-between`
  - Metric readout: `font-headline-md text-on-surface font-bold mt-1`

### 4. Navigation & Header
- **Desktop Navbar:** Fixed `h-16 w-full top-0 z-50 bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/40`.
- **Navigation Links:** `data-active-classes="text-primary font-bold"` with standard state `font-label-lg text-on-surface-variant hover:text-on-surface`.
- **User Profile Dropdown:** `w-64 rounded-xl bg-surface-container-lowest border border-outline-variant/40 shadow-lg py-space-xs z-50`.

### 5. Dialogs & Overlays
- **Modal Scrim:** `fixed inset-0 z-50 flex items-center justify-center p-space-md bg-inverse-surface/60 backdrop-blur-sm`.
- **Modal Box:** `w-full max-w-[560px] bg-surface-container-lowest rounded-2xl p-space-xl shadow-[0_20px_25px_-5px_rgba(15,23,42,0.2),0_8px_10px_-6px_rgba(15,23,42,0.1)] flex flex-col gap-space-lg`.
- **Safety Typing Gate:** Text input requiring exact uppercase word match (e.g. `DELETE`) before enabling the primary destructive button.

### 6. Notifications & Feedback
- **Toast Popup:** `fixed bottom-6 right-6 z-50 flex items-center gap-space-md bg-surface-container-lowest text-on-surface px-4 py-3.5 rounded-xl shadow-xl max-w-sm`.
- **Visual Accent:** Left indicator bar (`w-1.5 self-stretch rounded-full bg-emerald-500`) paired with `check_circle` icon.

---

## Responsive & Viewport Adaptation Architecture

Every view in EventHub follows an adaptive layout structure across three primary breakpoints:
- **Desktop (≥ 1024px):** 12-column responsive fluid grid, max container width `1280px` (`max-w-7xl`), gutters `1.5rem` (`24px`), margins `2rem` (`32px`).
- **Tablet (768px – 1023px):** 8-column grid, gutters `1.5rem` (`24px`), margins `1.5rem` (`24px`).
- **Mobile (< 768px):** 4-column single-column flow, gutters `1rem` (`16px`), margins `1rem` (`16px`).

### Mobile Viewport Guidelines

1. **Header & Navigation:**
   - Desktop horizontal link bar collapses into a hamburger icon button (`w-11 h-11 rounded-lg text-on-surface-variant`).
   - Sticky bottom navigation bar (`h-16 fixed bottom-0 inset-x-0 z-50 pb-safe bg-surface/90 backdrop-blur-xl shadow-[0_-2px_12px_rgba(0,0,0,0.06)]`) renders 4 persistent core tabs:
     - `Explore` (`explore`)
     - `Saved` (`bookmark`)
     - `Tickets` (`confirmation_number`)
     - `Profile` (`person`)
   - Active tab displays `text-primary font-bold`.

2. **Event Listings & Cards:**
   - Desktop 4-column grid (`grid-cols-4`) collapses to 2 columns on tablet (`grid-cols-2`) and 1 full-width column on mobile (`grid-cols-1`).
   - Mobile event cards adjust image aspect height to fixed `h-44` with edge-to-edge media bleed, `p-space-md` internal padding, and stacked action buttons.

3. **Event Details & Checkout:**
   - Desktop 2-column layout (`8 cols main details` + `4 cols sticky booking sidebar`) collapses into a stacked single column.
   - Ticket purchase actions convert into a sticky bottom sheet or full-width drawer above the bottom navigation bar.

4. **Add Event / Form Pages:**
   - Multi-column field rows collapse into 1 column (`grid-cols-1`).
   - Form sticky action bar docks to bottom with stacked discard/publish buttons.

5. **Management Tables & Data Displays:**
   - Desktop horizontal tabular data (`table`) collapses into a vertical card stack (Bento summary card layout) on mobile.
   - Each card displays event thumbnail, title, schedule, capacity progress bar (`h-2 rounded-full bg-surface-container`), and a 2-button action grid (`View` / `Delete`).
