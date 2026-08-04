import { Link } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/auth.store';

export default function DashboardPage() {
  const { isAuthenticated, user } = useAuthStore();

  return (
    <div className="flex-1 flex flex-col">
      {/* Hero / Welcome Section */}
      <section className="relative w-full py-16 md:py-24 px-4 md:px-10 overflow-hidden">
        {/* Background gradient orbs */}
        <div className="absolute top-0 left-1/4 w-80 h-80 bg-primary/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/4 w-64 h-64 bg-accent/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="relative z-10 max-w-2xl mx-auto text-center">
          <h1 className="font-heading font-bold text-3xl md:text-5xl text-foreground tracking-tight mb-4">
            {isAuthenticated
              ? `Welcome back, ${user?.fullName?.split(' ')[0] ?? 'there'}!`
              : 'Discover Live Events Near You'}
          </h1>
          <p className="text-muted-foreground text-base md:text-lg mb-8 max-w-lg mx-auto">
            {isAuthenticated
              ? 'Check out the latest events or explore something new.'
              : 'Book tickets to concerts, sports, talks, and more — all in one place.'}
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link
              to="/events"
              className="inline-flex items-center gap-2 bg-primary text-primary-foreground font-semibold text-sm px-6 py-3 rounded-lg shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all duration-300"
            >
              <span className="material-symbols-outlined text-[18px] icon-fill">explore</span>
              Explore Events
            </Link>
          </div>
        </div>
      </section>

      {/* Empty State for Events */}
      <section className="flex-1 flex flex-col items-center justify-center px-4 md:px-10 py-16">
        <div className="w-full max-w-md text-center">
          {/* Illustrated empty icon */}
          <div className="mx-auto w-24 h-24 rounded-full bg-card border border-border flex items-center justify-center mb-6">
            <span className="material-symbols-outlined text-4xl text-muted-foreground">calendar_month</span>
          </div>
          <h2 className="font-heading font-semibold text-xl text-foreground mb-2">No events yet</h2>
          <p className="text-muted-foreground text-sm mb-6">
            There are currently no upcoming events to display. Check back later or browse the full catalog.
          </p>
          <Link
            to="/events"
            className="inline-flex items-center gap-2 text-primary font-semibold text-sm hover:underline transition-all"
          >
            Browse all events
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </Link>
        </div>
      </section>
    </div>
  );
}
