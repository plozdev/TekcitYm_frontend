import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { PageTransition } from '../components/layout/PageTransition';
import { Button } from '../components/ui/button';

export default function OrganizerLayout() {
  const location = useLocation();

  const getPageTitle = () => {
    if (location.pathname.includes('events')) return 'Events';
    if (location.pathname.includes('analytics')) return 'Analytics';
    if (location.pathname.includes('seats-builder')) return 'Seat Layout Builder';
    return 'Overview';
  };

  return (
    <div className="flex h-screen overflow-hidden bg-background text-foreground">
      {/* SideNavBar (Desktop Only) */}
      <nav className="hidden md:flex fixed left-0 top-0 h-screen w-64 bg-card/50 backdrop-blur-3xl border-r border-border flex-col py-6 z-50">
        {/* Header */}
        <div className="px-6 mb-8 flex items-center gap-4">
          <div className="w-10 h-10 rounded-lg overflow-hidden bg-card/80 flex items-center justify-center shrink-0">
            <span className="material-symbols-outlined text-primary">analytics</span>
          </div>
          <div>
            <h1 className="font-heading font-semibold text-2xl text-primary tracking-tight">TekcitYm</h1>
            <p className="text-xs text-muted-foreground">Organizer Portal</p>
          </div>
        </div>
        
        {/* Navigation Links */}
        <div className="flex-1 overflow-y-auto px-4 space-y-2">
          <NavLink
            to="/organizer"
            end
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                isActive 
                  ? 'bg-primary/20 text-primary border-r-4 border-primary rounded-r-none translate-x-1' 
                  : 'text-muted-foreground hover:bg-card/80 hover:text-foreground hover:translate-x-1'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="material-symbols-outlined icon-fill">{isActive ? 'dashboard' : 'dashboard'}</span>
                Overview
              </>
            )}
          </NavLink>
          
          <NavLink
            to="/organizer/events"
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                isActive 
                  ? 'bg-primary/20 text-primary border-r-4 border-primary rounded-r-none translate-x-1' 
                  : 'text-muted-foreground hover:bg-card/80 hover:text-foreground hover:translate-x-1'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>calendar_today</span>
                Events
              </>
            )}
          </NavLink>

          <NavLink
            to="/organizer/analytics"
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                isActive 
                  ? 'bg-primary/20 text-primary border-r-4 border-primary rounded-r-none translate-x-1' 
                  : 'text-muted-foreground hover:bg-card/80 hover:text-foreground hover:translate-x-1'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>bar_chart</span>
                Analytics
              </>
            )}
          </NavLink>
          
          <NavLink
            to="/organizer/seats-builder"
            className={({ isActive }) => 
              `flex items-center gap-3 px-4 py-3 rounded-lg font-semibold text-sm transition-all duration-200 ${
                isActive 
                  ? 'bg-primary/20 text-primary border-r-4 border-primary rounded-r-none translate-x-1' 
                  : 'text-muted-foreground hover:bg-card/80 hover:text-foreground hover:translate-x-1'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>chair</span>
                Seat Builder
              </>
            )}
          </NavLink>
        </div>
        
        {/* Bottom CTA */}
        <div className="px-6 mt-auto">
          <Button className="w-full bg-primary/20 text-primary hover:bg-primary/30 border border-primary/20 flex items-center justify-center gap-2 glow-effect">
            <span className="material-symbols-outlined text-[20px]">add</span>
            Create Event
          </Button>
        </div>
      </nav>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col md:ml-64 h-screen overflow-hidden relative">
        {/* Subtle background decorative elements */}
        <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-primary/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
        <div className="absolute bottom-[-20%] left-[-10%] w-[40%] h-[40%] bg-emerald-500/5 rounded-full blur-[120px] pointer-events-none z-0"></div>
        
        {/* TopNavBar (Responsive) */}
        <header className="sticky top-0 w-full bg-background/60 backdrop-blur-2xl border-b border-border shadow-sm z-40">
          <div className="flex justify-between items-center px-4 md:px-10 h-16 w-full">
            {/* Mobile Logo / Menu Toggle */}
            <div className="md:hidden flex items-center gap-3">
              <button className="text-muted-foreground hover:text-primary transition-colors">
                <span className="material-symbols-outlined">menu</span>
              </button>
              <span className="font-heading font-bold text-xl text-primary tracking-tight">TekcitYm</span>
            </div>
            
            {/* Desktop Page Title */}
            <div className="hidden md:block">
              <h2 className="font-heading font-semibold text-3xl text-foreground m-0">{getPageTitle()}</h2>
            </div>
            
            {/* Right Actions */}
            <div className="flex items-center gap-2 md:gap-4">
              {/* Search */}
              <div className="hidden md:flex items-center relative bg-card/50 border border-border rounded-full px-4 py-1.5 focus-within:border-primary transition-colors w-64">
                <span className="material-symbols-outlined text-muted-foreground text-[20px] mr-2">search</span>
                <input 
                  type="text" 
                  placeholder="Search events..." 
                  className="bg-transparent border-none focus:ring-0 text-sm w-full placeholder:text-muted-foreground/50 p-0 text-foreground"
                />
              </div>
              
              <button className="md:hidden p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 rounded-full">
                <span className="material-symbols-outlined">search</span>
              </button>
              
              <button className="p-2 text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 rounded-full relative">
                <span className="material-symbols-outlined">notifications</span>
                <span className="absolute top-2 right-2 w-2 h-2 bg-amber-500 rounded-full border border-background"></span>
              </button>
              
              <div className="w-8 h-8 rounded-full overflow-hidden border border-border ml-2 cursor-pointer hover:border-primary transition-colors">
                <div className="w-full h-full bg-card flex items-center justify-center text-primary">
                  <span className="material-symbols-outlined text-sm">person</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-10 relative z-10">
          <PageTransition />
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav className="md:hidden fixed bottom-0 w-full bg-card/90 backdrop-blur-3xl border-t border-border flex justify-around items-center h-16 px-4 z-50">
        <NavLink to="/organizer" end className={({ isActive }) => `flex flex-col items-center gap-1 group ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
          {({ isActive }) => (
            <>
              <div className={`px-4 py-1 rounded-full transition-colors ${isActive ? 'bg-primary/20' : 'group-hover:bg-card'}`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>dashboard</span>
              </div>
              <span className="text-[10px] font-medium">Overview</span>
            </>
          )}
        </NavLink>
        <NavLink to="/organizer/events" className={({ isActive }) => `flex flex-col items-center gap-1 group ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
          {({ isActive }) => (
            <>
              <div className={`px-4 py-1 rounded-full transition-colors ${isActive ? 'bg-primary/20' : 'group-hover:bg-card'}`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>calendar_today</span>
              </div>
              <span className="text-[10px] font-medium">Events</span>
            </>
          )}
        </NavLink>
        <NavLink to="/organizer/analytics" className={({ isActive }) => `flex flex-col items-center gap-1 group ${isActive ? 'text-primary' : 'text-muted-foreground'}`}>
          {({ isActive }) => (
            <>
              <div className={`px-4 py-1 rounded-full transition-colors ${isActive ? 'bg-primary/20' : 'group-hover:bg-card'}`}>
                <span className="material-symbols-outlined" style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}>bar_chart</span>
              </div>
              <span className="text-[10px] font-medium">Analytics</span>
            </>
          )}
        </NavLink>
      </nav>
      
      {/* Mobile FAB */}
      <button className="md:hidden fixed bottom-20 right-4 w-14 h-14 bg-primary/20 text-primary border border-primary/30 rounded-2xl flex items-center justify-center shadow-lg glow-effect z-50 hover:scale-105 transition-transform backdrop-blur">
        <span className="material-symbols-outlined text-[28px]">add</span>
      </button>
    </div>
  );
}
