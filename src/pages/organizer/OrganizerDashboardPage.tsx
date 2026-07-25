import { useOrganizerStats, useMyEvents } from '../../features/event/event.hooks';
import { GlassCard } from '../../components/ui/glass-card';

export default function OrganizerDashboardPage() {
  const { data: stats, isPending: statsLoading } = useOrganizerStats();
  const { data: myEvents } = useMyEvents({ size: 5 });

  const metricCards = [
    {
      label: 'Total Revenue',
      value: stats ? `$${stats.totalRevenue.toLocaleString()}` : '--',
      change: stats ? `${stats.revenueChange >= 0 ? '+' : ''}${stats.revenueChange}% from last month` : '',
      up: stats ? stats.revenueChange >= 0 : true,
      icon: 'account_balance_wallet',
      glow: 'bg-primary/10 group-hover:bg-primary/20',
      iconColor: 'text-primary',
    },
    {
      label: 'Tickets Sold',
      value: stats ? stats.ticketsSold.toLocaleString() : '--',
      change: stats ? `${stats.ticketsChange >= 0 ? '+' : ''}${stats.ticketsChange}% from last month` : '',
      up: stats ? stats.ticketsChange >= 0 : true,
      icon: 'confirmation_number',
      glow: 'bg-amber-500/10 group-hover:bg-amber-500/20',
      iconColor: 'text-amber-500',
    },
    {
      label: 'Active Events',
      value: stats ? String(stats.activeEvents) : '--',
      change: 'No change',
      up: null,
      icon: 'event',
      glow: 'bg-indigo-500/10 group-hover:bg-indigo-500/20',
      iconColor: 'text-indigo-400',
    },
  ];

  return (
    <div className="max-w-[1280px] mx-auto space-y-6 pb-24 md:pb-8">
      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {metricCards.map((card) => (
          <GlassCard key={card.label} className="rounded-xl p-6 relative overflow-hidden group hover:border-primary/50 transition-colors">
            <div className={`absolute top-0 right-0 w-24 h-24 ${card.glow} rounded-bl-full blur-xl transition-colors`}></div>
            <div className="flex justify-between items-start mb-4 relative z-10">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">{card.label}</p>
                {statsLoading ? (
                  <div className="h-10 w-32 bg-card/80 rounded animate-pulse" />
                ) : (
                  <h3 className="font-heading font-bold text-3xl md:text-4xl text-foreground">{card.value}</h3>
                )}
              </div>
              <div className={`p-2 bg-card rounded-lg ${card.iconColor}`}>
                <span className="material-symbols-outlined">{card.icon}</span>
              </div>
            </div>
            <div className={`flex items-center gap-2 ${card.up === null ? 'text-muted-foreground' : card.up ? 'text-emerald-400' : 'text-destructive'} relative z-10`}>
              <span className="material-symbols-outlined text-[16px]">
                {card.up === null ? 'horizontal_rule' : card.up ? 'trending_up' : 'trending_down'}
              </span>
              <span className="text-xs font-medium">{card.change}</span>
            </div>
          </GlassCard>
        ))}
      </div>

      {/* Bento Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chart Section */}
        <GlassCard className="lg:col-span-2 rounded-xl p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-heading font-semibold text-2xl text-foreground">Revenue & Growth</h3>
              <p className="text-sm text-muted-foreground">Ticket sales performance over time</p>
            </div>
            <div className="flex gap-2">
              <button className="px-3 py-1 bg-card hover:bg-card/80 text-foreground rounded-lg text-xs font-semibold border border-border transition-colors">7D</button>
              <button className="px-3 py-1 bg-primary/20 text-primary rounded-lg text-xs font-semibold border border-primary/30">30D</button>
              <button className="px-3 py-1 bg-card hover:bg-card/80 text-foreground rounded-lg text-xs font-semibold border border-border transition-colors">1Y</button>
            </div>
          </div>

          {/* SVG Chart */}
          <div className="flex-1 min-h-[300px] relative w-full rounded-lg border border-border/50 bg-card/20 overflow-hidden flex items-end">
            <div className="absolute left-2 top-0 bottom-8 flex flex-col justify-between text-muted-foreground/50 text-xs font-medium py-4 z-10">
              <span>$40k</span><span>$30k</span><span>$20k</span><span>$10k</span><span>$0</span>
            </div>
            <div className="absolute left-12 right-0 bottom-2 flex justify-between px-4 text-muted-foreground/50 text-xs font-medium z-10">
              <span>Week 1</span><span>Week 2</span><span>Week 3</span><span>Week 4</span>
            </div>
            <div className="absolute inset-0 left-12 bottom-8 flex flex-col justify-between py-4 pointer-events-none">
              {[0,1,2,3,4].map(i => <div key={i} className="w-full h-px bg-border/50"></div>)}
            </div>
            <div className="absolute inset-0 left-12 bottom-8 px-4 py-4 z-0">
              <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="line-gradient-dash" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stopColor="currentColor" className="text-primary" stopOpacity="0.4"></stop>
                    <stop offset="100%" stopColor="currentColor" className="text-primary" stopOpacity="0"></stop>
                  </linearGradient>
                </defs>
                <path className="drop-shadow-[0_0_8px_rgba(99,102,241,0.5)] text-primary" d="M0,80 Q10,70 20,75 T40,50 T60,60 T80,20 T100,30" fill="none" stroke="currentColor" strokeWidth="2"></path>
                <path d="M0,80 Q10,70 20,75 T40,50 T60,60 T80,20 T100,30 L100,100 L0,100 Z" fill="url(#line-gradient-dash)"></path>
                {[[20,75],[40,50],[60,60],[80,20],[100,30]].map(([cx,cy],i) => (
                  <circle key={i} cx={cx} cy={cy} className="fill-background stroke-primary" r="2.5" strokeWidth="1.5"></circle>
                ))}
              </svg>
            </div>
          </div>
        </GlassCard>

        {/* Recent Events */}
        <GlassCard className="rounded-xl p-6 flex flex-col h-full">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-heading font-semibold text-2xl text-foreground">Recent Events</h3>
          </div>
          <div className="flex-1 space-y-3 overflow-y-auto pr-1">
            {myEvents?.content?.slice(0, 4).map((event) => (
              <div key={event.id} className="flex gap-3 items-start group p-2 rounded-lg hover:bg-card/50 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-card border border-border overflow-hidden shrink-0">
                  {event.bannerUrl ? (
                    <img src={event.bannerUrl} alt={event.title} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <span className="material-symbols-outlined text-primary text-sm">event</span>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-semibold text-foreground truncate">{event.title}</p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(event.startDate).toLocaleDateString()} · {event.soldCount}/{event.totalCapacity} sold
                  </p>
                </div>
                <span className={`text-[10px] font-semibold px-2 py-0.5 rounded-full shrink-0 ${
                  event.status === 'PUBLISHED' ? 'bg-emerald-500/20 text-emerald-400' :
                  event.status === 'DRAFT' ? 'bg-card text-muted-foreground border border-border' :
                  'bg-destructive/20 text-destructive'
                }`}>
                  {event.status}
                </span>
              </div>
            )) ?? (
              <p className="text-sm text-muted-foreground text-center py-8">No events yet</p>
            )}
          </div>
        </GlassCard>
      </div>
    </div>
  );
}
