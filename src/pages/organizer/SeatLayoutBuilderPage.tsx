import React from 'react';
import { Button } from '../../components/ui/button';

export default function SeatLayoutBuilderPage() {
  return (
    <div className="flex flex-col h-[calc(100vh-64px)] -m-4 md:-m-10 bg-[#0b1326] relative overflow-hidden">
      {/* Top Toolbar */}
      <header className="h-14 bg-card/80 backdrop-blur-xl border-b border-border flex items-center justify-between px-4 z-40 shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>Venues</span>
            <span className="material-symbols-outlined text-base">chevron_right</span>
            <span>Neon City Arena</span>
            <span className="material-symbols-outlined text-base">chevron_right</span>
            <span className="text-primary font-medium">Main Floor Plan</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex bg-card rounded-lg border border-border p-1">
            <button className="p-1.5 rounded bg-primary/20 text-primary shadow-sm" title="Select Tool (V)">
              <span className="material-symbols-outlined text-sm">near_me</span>
            </button>
            <button className="p-1.5 rounded text-muted-foreground hover:text-primary hover:bg-card/50 transition-colors" title="Draw Block (R)">
              <span className="material-symbols-outlined text-sm">rectangle</span>
            </button>
            <button className="p-1.5 rounded text-muted-foreground hover:text-primary hover:bg-card/50 transition-colors" title="Pan Tool (Space)">
              <span className="material-symbols-outlined text-sm">pan_tool</span>
            </button>
          </div>
          
          <div className="w-px h-6 bg-border mx-2"></div>
          
          <Button variant="outline" size="sm" className="bg-transparent border-border hover:bg-card text-foreground">
            Discard
          </Button>
          <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 glow-effect">
            Publish
          </Button>
        </div>
      </header>

      {/* Canvas Area */}
      <div className="flex-1 relative overflow-hidden flex flex-col lg:flex-row">
        {/* Canvas Content */}
        <div 
          className="flex-1 relative cursor-crosshair overflow-hidden bg-surface-dim" 
          style={{
            backgroundSize: '40px 40px',
            backgroundImage: `
              linear-gradient(to right, rgba(255, 255, 255, 0.03) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(255, 255, 255, 0.03) 1px, transparent 1px)
            `
          }}
        >
          {/* Stage */}
          <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-[400px] h-[120px] bg-card border-2 border-primary/30 rounded-t-[40px] rounded-b-lg flex flex-col items-center justify-center shadow-[0_0_40px_rgba(99,102,241,0.1)]">
            <span className="font-heading font-semibold text-foreground text-lg uppercase tracking-[0.2em] opacity-80">Main Stage</span>
            <div className="w-32 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent mt-2 opacity-50"></div>
          </div>
          
          {/* VIP Block */}
          <div className="absolute top-[35%] left-[50%] -translate-x-1/2 w-[500px] h-[80px] bg-emerald-500/10 border border-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.15)] rounded-lg flex items-center justify-center cursor-move hover:bg-emerald-500/20 transition-colors group">
            <div className="text-center">
              <p className="font-semibold text-emerald-400 uppercase tracking-widest text-sm">VIP Pit</p>
              <p className="text-muted-foreground text-xs mt-1">Cap: 400 • General Admission</p>
            </div>
            {/* Selection Handles */}
            <div className="absolute -inset-1 border border-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
              <div className="absolute -top-1 -left-1 w-2 h-2 bg-background border border-emerald-500"></div>
              <div className="absolute -top-1 -right-1 w-2 h-2 bg-background border border-emerald-500"></div>
              <div className="absolute -bottom-1 -left-1 w-2 h-2 bg-background border border-emerald-500"></div>
              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-background border border-emerald-500"></div>
            </div>
          </div>
          
          {/* Section A */}
          <div className="absolute top-[55%] left-[20%] w-[300px] h-[150px] bg-primary/10 border border-primary/30 rounded-lg flex items-center justify-center cursor-move hover:bg-primary/20 transition-colors">
            <div className="text-center">
              <p className="font-semibold text-primary uppercase tracking-widest text-sm">Sec A</p>
              <p className="text-muted-foreground text-xs mt-1">Rows: 1-15 • Seats: 300</p>
            </div>
          </div>
          
          {/* Section B (Active) */}
          <div className="absolute top-[55%] left-[55%] w-[300px] h-[150px] bg-amber-500/10 border border-amber-500/50 rounded-lg flex items-center justify-center cursor-move shadow-[0_0_0_2px_rgba(245,158,11,1)] z-10">
            <div className="text-center">
              <p className="font-semibold text-amber-500 uppercase tracking-widest text-sm">Sec B</p>
              <p className="text-muted-foreground text-xs mt-1">Rows: 1-15 • Seats: 300</p>
            </div>
            {/* Active Selection Handles */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-background border-2 border-amber-500 rounded-sm cursor-nwse-resize"></div>
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-background border-2 border-amber-500 rounded-sm cursor-ns-resize"></div>
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-background border-2 border-amber-500 rounded-sm cursor-nesw-resize"></div>
            <div className="absolute top-1/2 -translate-y-1/2 -left-1.5 w-3 h-3 bg-background border-2 border-amber-500 rounded-sm cursor-ew-resize"></div>
            <div className="absolute top-1/2 -translate-y-1/2 -right-1.5 w-3 h-3 bg-background border-2 border-amber-500 rounded-sm cursor-ew-resize"></div>
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-background border-2 border-amber-500 rounded-sm cursor-nesw-resize"></div>
            <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-background border-2 border-amber-500 rounded-sm cursor-ns-resize"></div>
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-background border-2 border-amber-500 rounded-sm cursor-nwse-resize"></div>
            {/* Rotation Handle */}
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-3 h-3 bg-background border-2 border-amber-500 rounded-full cursor-pointer"></div>
            <div className="absolute -top-6 left-1/2 -translate-x-1/2 w-px h-5 bg-amber-500 pointer-events-none"></div>
          </div>
          
          {/* Zoom Controls & Mini Map Overlay */}
          <div className="absolute bottom-6 left-6 flex flex-col gap-4">
            {/* Legend */}
            <div className="bg-card/90 backdrop-blur-md border border-border p-3 rounded-xl shadow-lg w-48">
              <h4 className="text-xs font-semibold text-muted-foreground mb-2 uppercase">Seat Legend</h4>
              <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded bg-emerald-500/30 border border-emerald-500"></div>
                  <span className="text-foreground text-xs">VIP Standing</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded bg-primary/30 border border-primary"></div>
                  <span className="text-foreground text-xs">Premium Seated</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <div className="w-3 h-3 rounded bg-amber-500/30 border border-amber-500"></div>
                  <span className="text-foreground text-xs">General Seated</span>
                </div>
              </div>
            </div>
            {/* Zoom */}
            <div className="flex items-center bg-card/90 backdrop-blur-md border border-border rounded-lg shadow-lg w-fit">
              <button className="p-2 text-muted-foreground hover:text-primary transition-colors">
                <span className="material-symbols-outlined text-sm">remove</span>
              </button>
              <span className="text-xs font-semibold text-foreground px-2 w-12 text-center">85%</span>
              <button className="p-2 text-muted-foreground hover:text-primary transition-colors border-l border-border">
                <span className="material-symbols-outlined text-sm">add</span>
              </button>
            </div>
          </div>
          
          {/* Mini Map */}
          <div className="absolute bottom-6 right-6 w-48 h-32 bg-card/90 backdrop-blur-md border border-border rounded-xl shadow-lg p-2 flex flex-col items-center justify-center opacity-70 hover:opacity-100 transition-opacity hidden md:flex">
            <div className="w-full h-full border border-border relative overflow-hidden rounded bg-background/50">
              <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-12 h-3 bg-card border border-primary/20 rounded-sm"></div>
              <div className="absolute top-[35%] left-[50%] -translate-x-1/2 w-16 h-4 bg-emerald-500/20 border border-emerald-500/50 rounded-sm"></div>
              <div className="absolute top-[55%] left-[20%] w-10 h-8 bg-primary/10 border border-primary/30 rounded-sm"></div>
              <div className="absolute top-[55%] left-[55%] w-10 h-8 bg-amber-500/10 border border-amber-500 rounded-sm"></div>
              <div className="absolute inset-2 border border-primary/50 shadow-[0_0_0_100px_rgba(11,19,38,0.5)] pointer-events-none"></div>
            </div>
          </div>
        </div>

        {/* Right Property Panel */}
        <aside className="w-full lg:w-80 bg-background/95 border-l border-border flex flex-col z-10 shrink-0 shadow-[-10px_0_20px_rgba(0,0,0,0.2)]">
          <div className="p-4 border-b border-border bg-card/50">
            <h2 className="font-heading font-semibold text-base text-foreground">Section Details</h2>
            <p className="text-xs text-muted-foreground mt-1">Configure layout and pricing</p>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-6">
            {/* Identification */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Identification</label>
              <div>
                <input 
                  type="text" 
                  defaultValue="Sec B"
                  className="w-full bg-card border border-border rounded-md px-3 py-2 text-sm text-foreground focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                />
              </div>
              <div className="flex gap-2">
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Type</label>
                  <select className="w-full bg-card border border-border rounded-md px-2 py-1.5 text-sm text-foreground focus:border-primary outline-none appearance-none">
                    <option>Seated</option>
                    <option>Standing (GA)</option>
                  </select>
                </div>
                <div className="flex-1">
                  <label className="text-xs text-muted-foreground mb-1 block">Color</label>
                  <div className="flex items-center gap-2 border border-border rounded-md px-2 py-1.5 bg-card">
                    <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                    <span className="text-sm text-foreground">Amber</span>
                    <span className="material-symbols-outlined text-sm ml-auto text-muted-foreground">expand_more</span>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="w-full h-px bg-border/50"></div>
            
            {/* Layout / Capacity */}
            <div className="flex flex-col gap-3">
              <div className="flex justify-between items-center">
                <label className="text-xs font-semibold text-muted-foreground uppercase">Layout (Grid)</label>
                <span className="text-xs bg-card px-2 py-0.5 rounded text-foreground border border-border">300 Seats</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Rows</label>
                  <input 
                    type="number" 
                    defaultValue="15"
                    className="w-full bg-card border border-border rounded-md px-3 py-1.5 text-sm text-foreground focus:border-primary outline-none"
                  />
                </div>
                <div>
                  <label className="text-xs text-muted-foreground mb-1 block">Seats per Row</label>
                  <input 
                    type="number" 
                    defaultValue="20"
                    className="w-full bg-card border border-border rounded-md px-3 py-1.5 text-sm text-foreground focus:border-primary outline-none"
                  />
                </div>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <input 
                  type="checkbox" 
                  id="curve"
                  className="rounded bg-card border-border text-primary focus:ring-primary focus:ring-offset-background"
                />
                <label className="text-sm text-foreground" htmlFor="curve">Apply curvature</label>
              </div>
              <input 
                type="range" 
                disabled
                className="w-full h-1 bg-card rounded-lg appearance-none cursor-not-allowed opacity-50"
              />
            </div>
            
            <div className="w-full h-px bg-border/50"></div>
            
            {/* Pricing Tier */}
            <div className="flex flex-col gap-3">
              <label className="text-xs font-semibold text-muted-foreground uppercase">Pricing Tier</label>
              <div className="flex items-center justify-between p-3 rounded-lg border border-amber-500/50 bg-amber-500/10">
                <div className="flex items-center gap-3">
                  <span className="material-symbols-outlined text-amber-500">monetization_on</span>
                  <div>
                    <p className="text-sm font-medium text-foreground">Tier 2</p>
                    <p className="text-xs text-muted-foreground">$85.00 + fees</p>
                  </div>
                </div>
                <button className="text-primary hover:text-primary/80 text-xs font-medium transition-colors">Edit</button>
              </div>
              <button className="w-full py-2 border border-dashed border-border rounded-lg text-sm text-muted-foreground hover:text-foreground hover:border-primary/50 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">add</span> Add Overrides
              </button>
            </div>
            
            <div className="w-full h-px bg-border/50"></div>
            
            {/* Actions */}
            <div className="flex flex-col gap-2 pb-6">
              <button className="w-full py-2 bg-card border border-border rounded-lg text-sm text-foreground hover:bg-card/80 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">content_copy</span> Duplicate Section
              </button>
              <button className="w-full py-2 bg-destructive/10 border border-destructive/30 rounded-lg text-sm text-destructive hover:bg-destructive/20 transition-colors flex items-center justify-center gap-2">
                <span className="material-symbols-outlined text-sm">delete</span> Delete Section
              </button>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
