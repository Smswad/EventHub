export default function AboutPage() {
  return (
    <div className="mx-auto max-w-7xl px-margin py-16">
      <div className="max-w-3xl">
        <span className="text-xs font-bold uppercase tracking-wider text-secondary">About EventHub</span>
        <h1 className="mt-2 text-3xl sm:text-4xl font-extrabold tracking-tight text-on-surface">
          Connecting communities through unforgettable live experiences
        </h1>
        <p className="mt-4 text-base text-on-surface-variant leading-relaxed">
          EventHub was founded with a singular purpose: to remove friction from ticketing and community event hosting. Whether you are organizing a global tech conference or finding a local workshop, EventHub delivers transparency, safety, and operational excellence.
        </p>
      </div>

      <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <h3 className="font-bold text-lg text-on-surface mb-2">50,000+ Events</h3>
          <p className="text-sm text-on-surface-variant">
            Hosted across 350+ cities worldwide with verified attendees.
          </p>
        </div>
        <div className="p-6 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <h3 className="font-bold text-lg text-on-surface mb-2">100% Verified</h3>
          <p className="text-sm text-on-surface-variant">
            Zero counterfeit tickets with instant digital wallet passes.
          </p>
        </div>
        <div className="p-6 rounded-xl bg-surface-container-lowest border border-outline-variant/30 shadow-sm">
          <h3 className="font-bold text-lg text-on-surface mb-2">Community First</h3>
          <p className="text-sm text-on-surface-variant">
            Empowering independent organizers with low transparent fees.
          </p>
        </div>
      </div>
    </div>
  );
}
