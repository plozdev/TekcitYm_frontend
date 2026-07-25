import React from 'react';
import { Link } from 'react-router-dom';

export interface EventCardProps {
  id: string;
  title: string;
  location: string;
  date: { month: string; day: string };
  price: string;
  imageUrl: string;
  badge?: { type: 'selling_fast' | 'vip', text: string };
  buttonAction?: 'view_seat_map' | 'get_tickets';
}

export function EventCard({ id, title, location, date, price, imageUrl, badge, buttonAction }: EventCardProps) {
  return (
    <article className="bg-secondary/10 border border-border rounded-xl overflow-hidden group hover:border-border/60 transition-all duration-300 relative flex flex-col h-full shadow-lg shadow-black/20">
      <Link to={`/events/${id}`} className="absolute inset-0 z-20"><span className="sr-only">View {title}</span></Link>
      
      <div className="relative aspect-[3/4] overflow-hidden">
        <div 
          className="w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105" 
          style={{ backgroundImage: `url('${imageUrl}')` }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
        
        {badge && (
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {badge.type === 'selling_fast' && (
              <span className="bg-destructive/20 text-destructive-foreground font-medium text-xs px-2 py-1 rounded shadow-sm flex items-center gap-1 backdrop-blur-md border border-destructive/30">
                <span className="material-symbols-outlined text-[14px]">local_fire_department</span>
                {badge.text}
              </span>
            )}
            {badge.type === 'vip' && (
              <span className="bg-emerald-500/20 text-emerald-400 font-medium text-xs px-2 py-1 rounded shadow-sm flex items-center gap-1 backdrop-blur-md border border-emerald-500/30">
                {badge.text}
              </span>
            )}
          </div>
        )}
        
        <div className="absolute top-3 right-3 bg-background/80 backdrop-blur-md border border-border rounded flex flex-col items-center justify-center w-12 h-12 shadow-md z-10">
          <span className="text-[10px] font-medium text-primary uppercase leading-tight">{date.month}</span>
          <span className="font-heading font-semibold text-lg text-foreground leading-tight">{date.day}</span>
        </div>
      </div>
      
      <div className="p-4 flex flex-col flex-grow relative z-10 bg-card/40 backdrop-blur-sm">
        <h3 className="font-heading font-semibold text-xl text-foreground mb-1 line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
        <p className="text-sm text-muted-foreground mb-4 flex items-center gap-1 line-clamp-1">
          <span className="material-symbols-outlined text-[16px]">location_on</span>
          {location}
        </p>
        
        <div className="mt-auto flex justify-between items-end">
          <div>
            <span className="text-xs text-muted-foreground block">From</span>
            <span className="font-semibold text-sm text-foreground">{price}</span>
          </div>
          
          {buttonAction === 'view_seat_map' && (
            <button className="border border-primary text-primary font-medium text-sm px-4 py-2 rounded hover:bg-primary/10 transition-colors z-30 relative">
              View Seat Map
            </button>
          )}
          {buttonAction === 'get_tickets' && (
            <button className="bg-primary text-primary-foreground font-medium text-sm px-4 py-2 rounded hover:brightness-110 transition-all glow-effect z-30 relative">
              Get Tickets
            </button>
          )}
        </div>
      </div>
    </article>
  );
}
