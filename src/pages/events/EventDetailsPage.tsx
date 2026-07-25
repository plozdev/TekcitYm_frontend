import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { GlassCard } from '../../components/ui/glass-card';
import { useEvent } from '../../features/event/event.hooks';

export default function EventDetailsPage() {
  const { eventId } = useParams();
  const { data: event, isPending, isError, error } = useEvent(eventId || '');

  if (isPending) {
    return (
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-8 md:py-12">
        <div className="animate-pulse flex flex-col gap-8 md:gap-12">
          <div className="w-full h-[614px] md:h-[500px] bg-card/40 rounded-xl"></div>
          <div className="h-24 bg-card/40 rounded-xl"></div>
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 space-y-4">
              <div className="h-64 bg-card/40 rounded-xl"></div>
              <div className="h-32 bg-card/40 rounded-xl"></div>
            </div>
            <div className="lg:col-span-4">
              <div className="h-64 bg-card/40 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (isError || !event) {
    return (
      <div className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-20 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-destructive/10 text-destructive mb-4">
          <span className="material-symbols-outlined text-3xl">error</span>
        </div>
        <h2 className="text-2xl font-bold mb-2">Event Not Found</h2>
        <p className="text-muted-foreground mb-6">We couldn't load the event details. It might have been removed.</p>
        <Link to="/events" className="text-primary hover:underline">Back to Discover</Link>
      </div>
    );
  }

  const startDate = new Date(event.startDate);
  const formattedDate = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-8 md:py-12 flex flex-col gap-8 md:gap-12">
      {/* Hero Section */}
      <section className="relative w-full rounded-xl overflow-hidden glass-card min-h-[614px] md:min-h-[500px] flex items-end">
        <div 
          className="absolute inset-0 bg-cover bg-center filter blur-xl opacity-40 transform scale-110" 
          style={{ backgroundImage: `url('${event.bannerUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
        <div className="relative z-10 w-full p-6 md:p-12 flex flex-col md:flex-row gap-8 items-end justify-between">
          <div className="flex flex-col md:flex-row gap-8 items-end">
            <img 
              className="w-32 h-48 md:w-64 md:h-96 object-cover rounded-lg shadow-2xl border border-white/10 shrink-0 transform md:-translate-y-12 bg-card" 
              src={event.bannerUrl || 'https://images.unsplash.com/photo-1540039155732-684735009121?auto=format&fit=crop&q=80'}
              alt={event.title}
            />
            <div className="flex flex-col gap-4">
              <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary w-max">
                <span className="font-semibold text-sm">Main Event</span>
              </div>
              <h1 className="font-heading font-bold text-4xl md:text-5xl text-white mb-2 leading-tight">
                {event.title}
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* Info Bar */}
      <section className="bg-card border border-border/50 rounded-xl p-6 md:p-8 flex flex-wrap gap-8 items-center justify-between z-20 relative shadow-lg backdrop-blur-md">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center border border-white/5">
            <span className="material-symbols-outlined text-emerald-400">business</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Organizer</p>
            <p className="font-semibold">{event.organizer?.name || 'TekcitYm'}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center border border-white/5">
            <span className="material-symbols-outlined text-primary">location_on</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Venue</p>
            <p className="font-semibold">{event.venue?.name || 'TBA'}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-secondary/10 flex items-center justify-center border border-white/5">
            <span className="material-symbols-outlined text-amber-400">calendar_month</span>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Date</p>
            <p className="font-semibold">{formattedDate}</p>
          </div>
        </div>
        <div className="flex items-center gap-4 bg-background/50 px-6 py-3 rounded-lg border border-white/10">
          <span className="material-symbols-outlined text-destructive animate-pulse">timer</span>
          <div>
            <p className="text-xs text-muted-foreground">Starts In</p>
            <p className="font-heading font-bold text-xl text-white tracking-wider">TBA</p>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 md:gap-12">
        <div className="lg:col-span-8 flex flex-col gap-12">
          {/* Gallery */}
          <section>
            <h2 className="font-heading font-semibold text-3xl mb-6 text-foreground">Experience</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="col-span-2 md:col-span-1 rounded-xl overflow-hidden aspect-video border border-white/10">
                <img 
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuDl9N5jPeayzOAql0vWQGCvI3rBgT0prLWEqjGmr7w41sfWIURhi6iF7mz_W2CJvwyyf3xYz_TvgZeDhpYin1E_dzZF0pDmdObGLBGo1R5dkQHzIPXqA_H2lgik2fFo5-DWXSTI2dNYMvoXBmgavkds4snF8rxbp7MoNbX3Hk48PJM3kQ1m-yzOK4UF7RRjJFwCZ3hIwaWxxgXi-nvW1B1500f5ku2RvLO1Fjysj1ai7CM-iWcJiMi_xF5f84T4xYr1n0AnqZTh68U" 
                  alt="Crowd at previous festival"
                />
              </div>
              <div className="hidden md:grid grid-cols-2 grid-rows-2 gap-4 col-span-1">
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <img 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBbDk5X4rciNS3i89Qe5IUrn3bGnhcEPMZABu2T0h9lGuk_qCRGaGTDIEOpwQyChTbclPEUAEgJuPKWnQKOxYtO6GJt3h8Eeg67dOvzybr67Z_683q3bbfwEN2CiNLqLFHvOZvwU7-1bwDYBQvoKlDZtD_Fle-9g1DPGw09RcsogJomg0Nhq-CwxmC9Q2_v2WxaXctSQHDvn8cb0zvcmwIzHUhJZf5Bp8U9QOiqEo438pnynsnbVGtfdbPQC7HDkih2gZN2jYbQWbs" 
                    alt="DJ set close up"
                  />
                </div>
                <div className="rounded-xl overflow-hidden border border-white/10">
                  <img 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuB9PdyzIx-rmRcevdFUgjgTQXZts5ZJayw7kn7dzE9JrQuaLdCTapCCKXeNNpA87MXWoM0KN6fVNnASdodeSpehMoXs7zmV1o7JYOrFwWpqfaNrmtgWPCZzJFJWadspBMArdgBOh90sOYlSRgBgTlOafX3hJevrwhZDT4Dl1svr4jOQgJBl_j5EYn9K62zsx9edOt6dbYDKvupKMHCX0aAYsDaL_q6fh1_W4fiMr5BGipyfgy0vQsaxZfdK0YgyAsGkSEsIBTBQ0VI" 
                    alt="Venue exterior"
                  />
                </div>
                <div className="col-span-2 rounded-xl overflow-hidden border border-white/10 relative">
                  <img 
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" 
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuC0GDdh7Ao1__PfSwM56qvoprYSW_OvM3B4A91mCGttcRIYXCgm26tZT658n3wpu_ArGO92RRuFQ8CVUhY7SgWdraNQYf5X4GnP4gNil8H2Cr5yvrbJRGfpBaGey_gdY5tVz7PzYlg_mJ0lDT7DjVjiBsgbmBLUgD725KzsF4_l1TWGiBrLqQy4TFexQeQ7w3BhtGkDATj_hIrzuiEm9HYyqiLgmsjtcN5CVWjX3eyMrsPRGIr7DRY1pNcN7PKegrWmf9tvrREkrrs" 
                    alt="Festival goers"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <button className="w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition">
                      <span className="material-symbols-outlined text-white text-2xl">photo_library</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Description */}
          <section>
            <h2 className="font-heading font-semibold text-3xl mb-6 text-foreground">About the Event</h2>
            <div className="prose prose-invert max-w-none text-lg text-muted-foreground leading-relaxed whitespace-pre-wrap">
              {event.description || 'No description available for this event.'}
            </div>
          </section>
        </div>

        {/* Right Column (Sticky Sidebar) */}
        <div className="lg:col-span-4">
          <GlassCard level={2} className="sticky top-28 p-6 flex flex-col gap-6">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider mb-1">General Admission</p>
              <div className="flex items-baseline gap-2">
                <span className="font-heading text-4xl md:text-5xl font-bold text-white">${event.minPrice?.toFixed(2) || '0.00'}</span>
                {event.maxPrice && event.maxPrice > event.minPrice && (
                  <span className="text-muted-foreground">- ${event.maxPrice.toFixed(2)}</span>
                )}
              </div>
            </div>
            
            {event.totalCapacity && (
              <div className="flex flex-col gap-2">
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Seat Availability</span>
                  <span className="text-primary font-semibold">
                    {Math.round(((event.soldCount || 0) / event.totalCapacity) * 100)}% Filled
                  </span>
                </div>
                <div className="w-full h-2 bg-background/50 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-indigo-400 rounded-full" 
                    style={{ width: `${Math.round(((event.soldCount || 0) / event.totalCapacity) * 100)}%` }}
                  ></div>
                </div>
              </div>
            )}
            
            <Link to={`/events/${eventId}/seats`} className="w-full py-4 rounded-lg bg-primary text-white font-heading font-semibold text-xl glow-btn flex items-center justify-center gap-2">
              Book Now
              <span className="material-symbols-outlined">arrow_forward</span>
            </Link>
            
            <div className="flex items-center justify-center gap-2 text-muted-foreground text-xs">
              <span className="material-symbols-outlined text-emerald-400 animate-pulse text-sm">visibility</span>
              {event.soldCount || 0} tickets sold so far
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
