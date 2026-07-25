import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export function BottomNavBar() {
  const location = useLocation();
  const path = location.pathname;

  return (
    <nav className="fixed bottom-0 left-0 w-full z-50 flex justify-around items-center h-16 px-4 md:hidden rounded-t-xl border-t border-white/5 shadow-[0_-8px_30px_rgb(0,0,0,0.12)] bg-surface-container/90 backdrop-blur-2xl">
      <Link 
        to="/events" 
        className={`flex flex-col items-center justify-center relative transition-all duration-300 ease-out active:scale-90 w-full ${path.includes('/events') ? 'text-primary after:content-[""] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-primary after:rounded-full' : 'text-muted-foreground'}`}
      >
        <span className={`material-symbols-outlined ${path.includes('/events') ? 'icon-fill' : ''}`}>search</span>
        <span className="text-[10px] font-medium mt-1">Explore</span>
      </Link>
      
      <Link 
        to="/tickets" 
        className={`flex flex-col items-center justify-center transition-transform active:scale-90 w-full ${path.includes('/tickets') ? 'text-primary after:content-[""] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-primary after:rounded-full' : 'text-muted-foreground'}`}
      >
        <span className={`material-symbols-outlined ${path.includes('/tickets') ? 'icon-fill' : ''}`}>confirmation_number</span>
        <span className="text-[10px] font-medium mt-1">Tickets</span>
      </Link>
      
      <Link 
        to="#" 
        className="flex flex-col items-center justify-center text-muted-foreground active:scale-90 transition-transform w-full"
      >
        <span className="material-symbols-outlined">favorite</span>
        <span className="text-[10px] font-medium mt-1">Saved</span>
      </Link>
      
      <Link 
        to="/profile" 
        className={`flex flex-col items-center justify-center transition-transform active:scale-90 w-full ${path.includes('/profile') ? 'text-primary after:content-[""] after:absolute after:-bottom-1 after:w-1 after:h-1 after:bg-primary after:rounded-full' : 'text-muted-foreground'}`}
      >
        <span className={`material-symbols-outlined ${path.includes('/profile') ? 'icon-fill' : ''}`}>person</span>
        <span className="text-[10px] font-medium mt-1">Profile</span>
      </Link>
    </nav>
  );
}
