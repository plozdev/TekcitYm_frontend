import React from 'react';
import { Link } from 'react-router-dom';
import { GlassCard } from '../../components/ui/glass-card';
import { GlassInput } from '../../components/ui/glass-input';
import { useMyTickets } from '../../features/ticket/ticket.hooks';

export default function MyTicketsPage() {
  const { data: tickets, isPending, isError } = useMyTickets();

  return (
    <div className="w-full flex-grow pb-8 relative z-10">
      {/* Ambient Background Glows */}
      <div className="absolute top-0 left-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10" />
      <div className="absolute bottom-0 right-0 w-[300px] h-[300px] bg-primary/10 rounded-full blur-[100px] pointer-events-none -z-10" />

      <main className="max-w-container-max mx-auto px-4 md:px-10 py-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-8 gap-4">
          <div>
            <h1 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-2">My Tickets</h1>
            <p className="text-muted-foreground">Manage your upcoming events and view past memories.</p>
          </div>
          <div className="flex gap-2 bg-card rounded-lg p-1 border border-border">
            <button className="px-4 py-2 rounded-md font-semibold text-sm text-primary bg-background/50 shadow-sm">Upcoming</button>
            <button className="px-4 py-2 rounded-md font-semibold text-sm text-muted-foreground hover:text-foreground transition-colors">Past</button>
          </div>
        </div>

        {/* Filter Bar */}
        <GlassCard className="p-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-2 w-full md:w-auto">
            <select className="bg-card/50 border border-border rounded-lg py-2 px-4 text-sm text-foreground appearance-none outline-none focus:border-primary transition-colors cursor-pointer min-w-[140px]">
              <option value="all">All Cities</option>
              <option value="ny">New York</option>
              <option value="la">Los Angeles</option>
            </select>
            <select className="bg-card/50 border border-border rounded-lg py-2 px-4 text-sm text-foreground appearance-none outline-none focus:border-primary transition-colors cursor-pointer min-w-[140px]">
              <option value="all">All Dates</option>
              <option value="week">This Week</option>
              <option value="month">Next Month</option>
            </select>
          </div>
          <div className="relative w-full md:w-64">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">search</span>
            <GlassInput className="pl-10 h-10 w-full" placeholder="Search tickets..." />
          </div>
        </GlassCard>

        {/* Loading State */}
        {isPending && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <GlassCard key={i} className="overflow-hidden p-0 h-[400px] animate-pulse">
                <div className="h-48 bg-white/5" />
                <div className="p-6 pt-10 relative">
                  <div className="h-20 bg-white/10 rounded-xl mb-6 absolute -top-10 left-6 right-6 border border-white/10" />
                  <div className="mt-6 space-y-4">
                    <div className="h-4 bg-white/5 rounded w-full" />
                    <div className="h-12 bg-white/10 rounded w-full mt-8" />
                  </div>
                </div>
              </GlassCard>
            ))}
          </div>
        )}

        {/* Error State */}
        {isError && (
          <div className="p-8 text-center bg-destructive/10 rounded-xl border border-destructive/20 text-destructive">
            <h3 className="text-lg font-semibold">Failed to load tickets</h3>
            <p className="text-sm opacity-80">Please try refreshing the page.</p>
          </div>
        )}

        {/* Empty State */}
        {!isPending && !isError && tickets && tickets.length === 0 && (
          <div className="text-center py-20 bg-card/30 rounded-2xl border border-border">
            <span className="material-symbols-outlined text-6xl text-muted-foreground mb-4 opacity-50">confirmation_number</span>
            <h3 className="text-xl font-semibold mb-2">No tickets found</h3>
            <p className="text-muted-foreground mb-6">You don't have any upcoming tickets.</p>
            <Link to="/events" className="bg-primary text-primary-foreground px-6 py-3 rounded-lg font-semibold inline-flex items-center gap-2">
              Discover Events
            </Link>
          </div>
        )}

        {/* Ticket Grid */}
        {!isPending && !isError && tickets && tickets.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tickets.map((ticket: any) => {
              const date = new Date(ticket.event.startDate);
              const month = date.toLocaleString('default', { month: 'short' }).toUpperCase();
              const day = date.getDate().toString().padStart(2, '0');
              
              return (
                <GlassCard key={ticket.id} className="overflow-hidden flex flex-col group p-0 gap-0">
                  <div className="h-48 relative overflow-hidden">
                    <img 
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" 
                      src={ticket.event.bannerUrl || 'https://images.unsplash.com/photo-1540039155732-684735009121?auto=format&fit=crop&q=80'}
                      alt={ticket.event.title}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-card to-transparent" />
                    <div className="absolute top-4 right-4 bg-emerald-500/20 backdrop-blur-md border border-emerald-500/30 text-emerald-400 px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <span className="material-symbols-outlined text-[16px] icon-fill">check_circle</span>
                      {ticket.status}
                    </div>
                  </div>
                  
                  <div className="p-6 flex flex-col flex-grow relative z-10 -mt-8">
                    <div className="bg-background rounded-xl p-4 border border-border mb-4 shadow-lg flex items-center justify-between">
                      <div className="text-center">
                        <div className="text-xs font-bold text-primary uppercase tracking-wider">{month}</div>
                        <div className="font-heading font-bold text-2xl text-foreground leading-none mt-1">{day}</div>
                      </div>
                      <div className="h-10 w-px bg-border mx-4" />
                      <div className="flex-grow min-w-0">
                        <h3 className="font-heading font-semibold text-lg text-foreground truncate">{ticket.event.title}</h3>
                        <div className="text-xs font-medium text-muted-foreground flex items-center gap-1 mt-1">
                          <span className="material-symbols-outlined text-[14px]">location_on</span>
                          <span className="truncate">{ticket.event.venue?.name}, {ticket.event.venue?.city}</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center mb-6 text-xs text-muted-foreground">
                      <div>
                        <span className="block mb-1">Section</span>
                        <span className="text-foreground font-semibold text-sm">{ticket.seat?.section}</span>
                      </div>
                      <div>
                        <span className="block mb-1">Row</span>
                        <span className="text-foreground font-semibold text-sm">{ticket.seat?.row}</span>
                      </div>
                      <div>
                        <span className="block mb-1">Seat</span>
                        <span className="text-foreground font-semibold text-sm">{ticket.seat?.seatNumber}</span>
                      </div>
                    </div>
                    
                    <div className="mt-auto">
                      <Link to={`/tickets/${ticket.id}`} className="w-full bg-primary text-primary-foreground py-3 rounded-xl font-semibold text-sm flex justify-center items-center gap-2 glow-effect transition-all hover:brightness-110 block text-center">
                        <span className="material-symbols-outlined icon-fill">qr_code_2</span>
                        View Ticket
                      </Link>
                    </div>
                  </div>
                </GlassCard>
              );
            })}
          </div>
        )}
      </main>
    </div>
  );
}
