import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { GlassCard } from '../../components/ui/glass-card';
import { useTicket } from '../../features/ticket/ticket.hooks';

export default function TicketDetailsPage() {
  const navigate = useNavigate();
  const { ticketId } = useParams();
  
  const { data: ticket, isPending, isError } = useTicket(ticketId || '');

  if (isPending) {
    return (
      <div className="w-full flex-grow py-12 flex justify-center items-center">
         <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isError || !ticket) {
    return (
      <div className="w-full flex-grow py-12 flex flex-col items-center justify-center text-center">
        <span className="material-symbols-outlined text-4xl text-destructive mb-2">error</span>
        <h2 className="text-xl font-semibold mb-2">Ticket Not Found</h2>
        <button onClick={() => navigate('/tickets')} className="text-primary hover:underline mt-4">Back to My Tickets</button>
      </div>
    );
  }

  const startDate = new Date(ticket.event.startDate);
  const formattedDate = startDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  const formattedTime = startDate.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });

  return (
    <div className="w-full flex-grow pb-8 flex flex-col items-center">
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between w-full p-4 sticky top-0 z-40 bg-background/90 backdrop-blur-md border-b border-white/5">
        <button onClick={() => navigate(-1)} className="w-10 h-10 flex items-center justify-center rounded-full bg-card border border-border">
          <span className="material-symbols-outlined text-foreground">arrow_back</span>
        </button>
        <span className="font-heading font-semibold text-xl text-foreground">My Tickets</span>
        <div className="w-10 h-10" />
      </div>

      <main className="flex-grow w-full max-w-2xl px-4 md:px-0 py-8 md:py-12">
        <div className="mb-4 hidden md:block">
          <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors text-sm font-semibold mb-4">
            <span className="material-symbols-outlined">arrow_back</span>
            Back to Tickets
          </button>
        </div>

        {/* Ticket Container */}
        <GlassCard className="overflow-hidden shadow-[0_0_20px_rgba(99,102,241,0.15)] flex flex-col ticket-cutout p-0 border-0">
          {/* Event Image Header */}
          <div className="relative h-48 md:h-64 w-full">
            <img 
              className="w-full h-full object-cover" 
              src={ticket.event.bannerUrl || "https://images.unsplash.com/photo-1540039155732-684735009121?auto=format&fit=crop&q=80"}
              alt={ticket.event.title}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#1E293B] to-transparent" />
            <div className="absolute bottom-4 left-6 right-6 flex justify-between items-end">
              <div>
                <div className="inline-flex items-center px-2 py-1 rounded-full bg-primary/20 border border-primary/30 text-primary font-semibold text-xs mb-2">
                  <span className="w-2 h-2 rounded-full bg-primary mr-2 animate-pulse" />
                  {ticket.tier || 'General Admission'}
                </div>
                <h1 className="font-heading font-semibold text-3xl md:text-4xl text-white">{ticket.event.title}</h1>
              </div>
            </div>
          </div>
          
          {/* Event Details Body */}
          <div className="p-6 pb-12 bg-[#1E293B]">
            <div className="grid grid-cols-2 gap-6 mb-8">
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 font-semibold">Date & Time</p>
                <p className="text-lg text-foreground">{formattedDate}</p>
                <p className="text-sm text-muted-foreground">{formattedTime}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 font-semibold">Venue</p>
                <p className="text-lg text-foreground">{ticket.event.venue?.name}</p>
                <p className="text-sm text-muted-foreground">{ticket.event.venue?.city}</p>
              </div>
            </div>
            
            <div className="bg-background/50 rounded-xl p-4 flex justify-between items-center border border-white/5 mb-8">
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 font-semibold">Section</p>
                 <p className="font-heading font-semibold text-2xl text-amber-500">{ticket.seat?.section}</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 font-semibold">Row</p>
                 <p className="font-heading font-semibold text-2xl text-foreground">{ticket.seat?.row}</p>
              </div>
              <div className="w-px h-12 bg-white/10" />
              <div>
                <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 font-semibold">Seat</p>
                 <p className="font-heading font-semibold text-2xl text-foreground">{ticket.seat?.seatNumber}</p>
              </div>
            </div>
          </div>
          
          {/* Perforation Line */}
          <div className="relative h-0 w-full z-20">
            <div className="dashed-line" />
          </div>
          
          {/* QR Code Section */}
          <div className="p-8 pt-12 flex flex-col items-center bg-[#1E293B]">
            <div className="bg-white p-4 rounded-xl mb-6 shadow-[0_0_30px_rgba(255,255,255,0.1)]">
              <img 
                className="w-48 h-48" 
                src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(ticket.qrCode || ticket.id)}`}
                alt="Event QR Code"
              />
            </div>
            <p className="text-muted-foreground text-xs uppercase tracking-wider mb-1 font-semibold">Ticket Holder</p>
             <p className="text-lg text-foreground font-semibold tracking-wide uppercase">{ticket.holderName || 'GUEST'}</p>
            <p className="text-muted-foreground text-xs mt-2 font-medium">Order #{ticket.id.substring(0, 8).toUpperCase()}</p>
          </div>
        </GlassCard>

        {/* Action Buttons */}
        <div className="mt-8 flex flex-col gap-4">
          <button className="w-full bg-primary/10 border border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground font-semibold text-sm py-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-300 relative overflow-hidden group">
            <div className="absolute inset-0 bg-primary/20 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out" />
            <span className="material-symbols-outlined relative z-10 icon-fill">account_balance_wallet</span>
            <span className="relative z-10">Add to Apple / Google Wallet</span>
          </button>
          
          <div className="grid grid-cols-2 gap-4">
            <button className="bg-card hover:bg-card/80 border border-border text-foreground font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200">
              <span className="material-symbols-outlined text-[20px]">download</span>
              Download PDF
            </button>
            <button className="bg-card hover:bg-card/80 border border-border text-foreground font-semibold text-sm py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-200">
              <span className="material-symbols-outlined text-[20px]">share</span>
              Share Ticket
            </button>
          </div>
        </div>

        {/* Venue Map Preview */}
        <GlassCard className="mt-8 rounded-2xl p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-heading font-semibold text-xl text-foreground">Venue Map</h3>
            <button className="text-primary font-semibold text-sm flex items-center gap-1 hover:text-primary/80 transition-colors">
              Expand <span className="material-symbols-outlined text-[16px]">open_in_full</span>
            </button>
          </div>
          <div className="w-full h-40 bg-background/50 rounded-lg overflow-hidden relative border border-border">
            <img 
              className="w-full h-full object-cover opacity-70" 
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuCUWt_ewQxKGzpAkVjmcpIY6AVSQi1qDGMON6AoYHUX6xrB3bdW7D4FuAdVZx4NcciQHU-kQBnv9e6duaBbf6QeMXE1B8S__WQnhAP4e2S-DulAWH3ZyqGDXZFCpmCxdQiP7AmeALti63zOvLN1rTUifUWLEMN3J4qGXdOSs_dJ-yFu5g9JvgsjgudzJaq6LE4hatd5E9wKDLDmBB7QHeDEyFgKKPSXG1X1-tiVOJmwUZ14NY7AGIHfU26El_HljIPtZkJmFE2I1yA"
              alt="Venue Map Preview"
            />
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
              <div className="w-4 h-4 bg-amber-500 rounded-full animate-ping absolute" />
              <div className="w-3 h-3 bg-amber-500 rounded-full relative z-10" />
            </div>
          </div>
        </GlassCard>
      </main>
    </div>
  );
}
