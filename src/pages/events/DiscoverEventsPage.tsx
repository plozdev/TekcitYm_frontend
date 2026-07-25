import React, { useState } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { EventCard } from '../../components/events/EventCard';
import { GlassInput } from '../../components/ui/glass-input';
import { useEvents } from '../../features/event/event.hooks';

export default function DiscoverEventsPage() {
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const { data, isPending, isError, error } = useEvents({ search: debouncedSearch || undefined });
  const events = data?.content ?? [];

  return (
    <div className="w-full flex-grow pb-8">
      {/* Dynamic Hero Banner */}
      <section className="relative w-full h-[614px] min-h-[400px] flex flex-col justify-end px-4 md:px-10 pb-12 mb-8">
        <div className="absolute inset-0 z-0 overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center object-cover" 
            style={{ backgroundImage: "url('https://lh3.googleusercontent.com/aida-public/AB6AXuAOGoTevcgcuQdverB0pKBg05CTnistTCPjG5GyQxkjAIq_kSDlqem_8oqqgDlq8l1YBB5-_2yNpsmrNeJRoQ5y0RH2uinJ4wtM3jKZ0CoH757NCcqBlHU7CkP6NwjOGeL_3t6jg-v3seL_cxW_msZ3vxb_DFsiKTkiIIlggpVsG7GDxr_HFuRSXzZdmyyD9lUKSKatTm4d9PHbatEzhBtM9dgD7uiuYf6JSUaWB-7ZWJu3FakGjqOi7Mtmlf36lDQQvv9qnVdpCDs')" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        </div>
        
        <div className="relative z-10 max-w-2xl">
          <span className="inline-block px-3 py-1 bg-card/40 border border-border rounded-full text-xs font-semibold text-emerald-400 mb-4 uppercase tracking-widest backdrop-blur-md">
            Featured Event
          </span>
          <h1 className="font-heading font-bold text-4xl md:text-5xl text-foreground mb-2">NEON DREAMS FESTIVAL 2024</h1>
          <p className="text-lg text-muted-foreground mb-6">Experience the ultimate convergence of sound, light, and technology. 3 stages, 50+ artists, one unforgettable night.</p>
          <div className="flex flex-wrap gap-4">
            <button className="bg-primary text-primary-foreground font-semibold px-6 py-3 rounded-lg flex items-center gap-2 glow-effect transition-all duration-300">
              <span className="material-symbols-outlined icon-fill">confirmation_number</span>
              Book Now
            </button>
            <button className="bg-card/50 border border-border text-foreground font-semibold px-6 py-3 rounded-lg hover:bg-card transition-all duration-300 backdrop-blur-md">
              View Lineup
            </button>
          </div>
        </div>
      </section>

      {/* Glassmorphism Search & Filter Bar */}
      <section className="px-4 md:px-10 mb-8 sticky top-16 md:top-20 z-30 pt-2 pb-4 bg-background/80 backdrop-blur-xl">
        <div className="bg-card/40 border border-border rounded-xl p-2 md:p-4 backdrop-blur-2xl shadow-lg flex flex-col md:flex-row gap-4 items-center">
          <div className="flex-grow w-full relative">
            <span className="material-symbols-outlined text-muted-foreground absolute left-3 top-1/2 -translate-y-1/2">search</span>
            <GlassInput 
              className="pl-10 h-11" 
              placeholder="Search events, artists, venues..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <div className="flex w-full md:w-auto gap-4 overflow-x-auto pb-2 md:pb-0 scrollbar-hide items-center">
            <button className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2 text-sm font-semibold text-foreground whitespace-nowrap hover:border-white/10 transition-colors h-11">
              <span className="material-symbols-outlined text-primary text-sm">location_city</span>
              All Cities
              <span className="material-symbols-outlined text-sm">expand_more</span>
            </button>
            
            <div className="flex gap-2 border-l border-border pl-4 h-11 items-center">
              <button className="bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap">Music</button>
              <button className="bg-card border border-border text-muted-foreground hover:text-foreground text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-colors">Sport</button>
              <button className="bg-card border border-border text-muted-foreground hover:text-foreground text-sm font-semibold px-4 py-2 rounded-full whitespace-nowrap transition-colors">Tech</button>
            </div>
            
            <button className="flex items-center gap-2 bg-card border border-border rounded-lg px-4 py-2 text-sm font-semibold text-foreground whitespace-nowrap hover:border-white/10 transition-colors h-11 ml-auto md:ml-0">
              <span className="material-symbols-outlined text-sm">tune</span>
              Price
            </button>
          </div>
        </div>
      </section>

      {/* Event Grid */}
      <section className="px-4 md:px-10 mb-16">
        <h2 className="font-heading font-semibold text-3xl text-foreground mb-6">Trending Near You</h2>
        
        {isPending && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="rounded-xl overflow-hidden glass-card bg-card/40 border border-border animate-pulse h-[380px]">
                <div className="h-48 bg-white/5"></div>
                <div className="p-5 space-y-4">
                  <div className="h-6 bg-white/10 rounded w-3/4"></div>
                  <div className="h-4 bg-white/5 rounded w-1/2"></div>
                  <div className="pt-4 flex justify-between items-center">
                    <div className="h-5 bg-white/5 rounded w-1/4"></div>
                    <div className="h-8 bg-white/10 rounded w-1/3"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isError && (
          <div className="p-8 text-center bg-destructive/10 rounded-xl border border-destructive/20 text-destructive">
            <span className="material-symbols-outlined text-4xl mb-2">error</span>
            <h3 className="text-lg font-semibold">Failed to load events</h3>
            <p className="text-sm opacity-80">{(error as any)?.message || 'Something went wrong'}</p>
          </div>
        )}

        {!isPending && !isError && events && events.length === 0 && (
          <div className="flex flex-col items-center justify-center p-16 bg-card/20 rounded-xl border border-border mt-8 text-center">
            <span className="material-symbols-outlined text-6xl text-muted-foreground/50 mb-4">event_busy</span>
            <h3 className="text-xl font-heading font-semibold mb-2">No events found</h3>
            <p className="text-muted-foreground max-w-md">Try adjusting your filters or searching for something else.</p>
          </div>
        )}

        {!isPending && !isError && events && events.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {events.map((event) => {
              const date = new Date(event.startDate);
              const month = date.toLocaleString('default', { month: 'short' });
              const day = date.getDate().toString().padStart(2, '0');
              
              return (
                <EventCard
                  key={event.id}
                  id={event.id}
                  title={event.title}
                  location={`${event.venue.name}, ${event.venue.city}`}
                  date={{ month, day }}
                  price={`$${event.minPrice}`}
                  imageUrl={event.bannerUrl || 'https://images.unsplash.com/photo-1540039155732-684735009121?auto=format&fit=crop&q=80'}
                  buttonAction="get_tickets"
                />
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
