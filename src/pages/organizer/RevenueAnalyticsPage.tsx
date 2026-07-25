import React from 'react';
import { GlassCard } from '../../components/ui/glass-card';

export default function RevenueAnalyticsPage() {
  return (
    <div className="max-w-[1280px] mx-auto w-full flex-1 pb-24 md:pb-8 flex flex-col gap-6">
      {/* Mobile Page Title */}
      <div className="md:hidden flex flex-col gap-1 mb-2">
        <h2 className="font-heading font-bold text-3xl text-foreground">Revenue Analytics</h2>
        <p className="text-sm text-muted-foreground">Detailed breakdown of sales performance.</p>
      </div>

      {/* Controls Row */}
      <GlassCard className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 p-4 rounded-xl">
        <div className="flex flex-wrap items-center gap-3">
          <button className="px-4 py-2 rounded-lg bg-primary text-primary-foreground text-sm font-semibold glow-effect">Last 30 Days</button>
          <button className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-card text-sm font-semibold transition-colors">This Quarter</button>
          <button className="px-4 py-2 rounded-lg border border-border text-muted-foreground hover:text-foreground hover:bg-card text-sm font-semibold transition-colors">YTD</button>
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-48">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">calendar_month</span>
            <input 
              readOnly 
              type="text" 
              value="Oct 1 - Oct 31, 2023"
              className="w-full bg-card/60 border border-border rounded-lg py-2 pl-9 pr-3 text-sm text-foreground cursor-pointer focus:outline-none focus:border-primary/50"
            />
          </div>
          <button className="p-2 rounded-lg border border-border text-muted-foreground hover:bg-card transition-colors flex items-center justify-center">
            <span className="material-symbols-outlined">download</span>
          </button>
        </div>
      </GlassCard>

      {/* KPI Cards Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* KPI 1 */}
        <GlassCard className="p-5 rounded-xl flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-primary/10 rounded-full blur-xl group-hover:bg-primary/20 transition-all"></div>
          <div className="flex justify-between items-start">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Total Revenue</p>
            <span className="material-symbols-outlined text-primary">account_balance_wallet</span>
          </div>
          <h3 className="font-heading font-bold text-3xl text-foreground mt-2">$124,500.00</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center text-emerald-400 text-xs font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">
              <span className="material-symbols-outlined text-[16px]">trending_up</span> 12.5%
            </span>
            <span className="text-xs text-muted-foreground font-medium">vs last period</span>
          </div>
        </GlassCard>

        {/* KPI 2 */}
        <GlassCard className="p-5 rounded-xl flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all"></div>
          <div className="flex justify-between items-start">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Tickets Sold</p>
            <span className="material-symbols-outlined text-amber-500">confirmation_number</span>
          </div>
          <h3 className="font-heading font-bold text-3xl text-foreground mt-2">3,420</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center text-emerald-400 text-xs font-semibold bg-emerald-500/10 px-1.5 py-0.5 rounded">
              <span className="material-symbols-outlined text-[16px]">trending_up</span> 8.2%
            </span>
            <span className="text-xs text-muted-foreground font-medium">vs last period</span>
          </div>
        </GlassCard>

        {/* KPI 3 */}
        <GlassCard className="p-5 rounded-xl flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all"></div>
          <div className="flex justify-between items-start">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Avg Order Value</p>
            <span className="material-symbols-outlined text-indigo-400">shopping_cart</span>
          </div>
          <h3 className="font-heading font-bold text-3xl text-foreground mt-2">$85.50</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center text-destructive text-xs font-semibold bg-destructive/10 px-1.5 py-0.5 rounded">
              <span className="material-symbols-outlined text-[16px]">trending_down</span> 2.1%
            </span>
            <span className="text-xs text-muted-foreground font-medium">vs last period</span>
          </div>
        </GlassCard>

        {/* KPI 4 */}
        <GlassCard className="p-5 rounded-xl flex flex-col gap-2 relative overflow-hidden group">
          <div className="absolute -right-4 -top-4 w-24 h-24 bg-pink-500/10 rounded-full blur-xl group-hover:bg-pink-500/20 transition-all"></div>
          <div className="flex justify-between items-start">
            <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Refund Rate</p>
            <span className="material-symbols-outlined text-pink-400">replay</span>
          </div>
          <h3 className="font-heading font-bold text-3xl text-foreground mt-2">1.2%</h3>
          <div className="flex items-center gap-2 mt-1">
            <span className="flex items-center text-muted-foreground text-xs font-semibold bg-card px-1.5 py-0.5 rounded">
              <span className="material-symbols-outlined text-[16px]">horizontal_rule</span> 0.0%
            </span>
            <span className="text-xs text-muted-foreground font-medium">vs last period</span>
          </div>
        </GlassCard>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Chart: Daily Ticket Sales */}
        <GlassCard className="p-6 rounded-xl lg:col-span-2 flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h3 className="font-heading font-semibold text-xl text-foreground">Daily Ticket Sales</h3>
              <p className="text-xs text-muted-foreground">Revenue breakdown by ticket tier</p>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-primary glow-effect"></span>
                <span className="text-xs font-medium text-foreground">VIP</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-card border border-border"></span>
                <span className="text-xs font-medium text-foreground">Regular</span>
              </div>
            </div>
          </div>
          
          {/* CSS Bar Chart Representation */}
          <div className="flex-1 flex items-end gap-2 mt-4 relative pt-10">
            {/* Y-axis labels */}
            <div className="absolute left-0 top-0 bottom-8 w-10 flex flex-col justify-between text-muted-foreground/60 text-[10px] font-medium">
              <span>$10k</span>
              <span>$7.5k</span>
              <span>$5k</span>
              <span>$2.5k</span>
            </div>
            
            {/* Grid lines */}
            <div className="absolute left-10 right-0 top-0 bottom-8 flex flex-col justify-between pointer-events-none">
              <div className="border-t border-border w-full h-0"></div>
              <div className="border-t border-border w-full h-0"></div>
              <div className="border-t border-border w-full h-0"></div>
              <div className="border-t border-border w-full h-0"></div>
            </div>
            
            {/* Bars Container */}
            <div className="flex-1 flex items-end justify-around pl-10 h-[250px] pb-1 border-b border-border">
              {[
                { vip: '45%', reg: '25%', label: 'Oct 1', tooltip: { vip: '$2,400 VIP', reg: '$1,200 Reg' } },
                { vip: '30%', reg: '40%', label: 'Oct 2' },
                { vip: '60%', reg: '20%', label: 'Oct 3' },
                { vip: '50%', reg: '45%', label: 'Oct 4' },
                { vip: '80%', reg: '60%', label: 'Oct 5', glow: true, tooltip: { vip: '$4,800 VIP', reg: '$3,200 Reg' } },
                { vip: '35%', reg: '25%', label: 'Oct 6' },
                { vip: '20%', reg: '15%', label: 'Oct 7' },
              ].map((day, i) => (
                <div key={i} className="w-full max-w-[40px] flex flex-col justify-end gap-1 group relative">
                  {day.tooltip && (
                    <div className="absolute -top-12 left-1/2 -translate-x-1/2 bg-card border border-border px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 whitespace-nowrap">
                      <div className="text-primary font-bold">{day.tooltip.vip}</div>
                      <div className="text-muted-foreground">{day.tooltip.reg}</div>
                    </div>
                  )}
                  <div className={`chart-bar w-full bg-primary rounded-t-sm ${day.glow ? 'glow-effect' : ''}`} style={{ height: day.vip }}></div>
                  <div className="chart-bar w-full bg-card border-x border-t border-border rounded-t-sm" style={{ height: day.reg }}></div>
                  <span className={`absolute -bottom-6 left-1/2 -translate-x-1/2 text-[10px] font-medium ${day.glow ? 'text-primary' : 'text-muted-foreground'}`}>{day.label}</span>
                </div>
              ))}
            </div>
          </div>
        </GlassCard>

        {/* Donut Chart: Category Distribution */}
        <GlassCard className="p-6 rounded-xl flex flex-col min-h-[400px]">
          <div className="flex justify-between items-center mb-6">
            <h3 className="font-heading font-semibold text-xl text-foreground">Revenue by Tier</h3>
          </div>
          <div className="flex-1 flex flex-col items-center justify-center relative">
            <div className="w-48 h-48 rounded-full border-[16px] border-card relative shadow-[inset_0_0_20px_rgba(0,0,0,0.5)]">
              <div className="absolute inset-[-16px] rounded-full border-[16px] border-transparent border-t-primary border-r-primary rotate-45 glow-effect"></div>
              <div className="absolute inset-[-16px] rounded-full border-[16px] border-transparent border-l-amber-500 rotate-[-15deg]"></div>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-heading font-bold text-3xl text-foreground">65%</span>
                <span className="text-xs font-medium text-muted-foreground">VIP Sales</span>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex flex-col gap-3">
            <div className="flex items-center justify-between p-2 rounded hover:bg-card/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-primary glow-effect"></span>
                <span className="text-sm font-medium text-foreground">VIP Experience</span>
              </div>
              <span className="text-sm font-semibold text-foreground">$80,925</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded hover:bg-card/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-card border border-border"></span>
                <span className="text-sm font-medium text-foreground">General Admission</span>
              </div>
              <span className="text-sm font-semibold text-foreground">$31,125</span>
            </div>
            <div className="flex items-center justify-between p-2 rounded hover:bg-card/50 transition-colors">
              <div className="flex items-center gap-3">
                <span className="w-3 h-3 rounded-full bg-amber-500"></span>
                <span className="text-sm font-medium text-foreground">Early Bird</span>
              </div>
              <span className="text-sm font-semibold text-foreground">$12,450</span>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Data Table Section */}
      <GlassCard className="rounded-xl overflow-hidden flex flex-col">
        <div className="p-6 border-b border-border flex justify-between items-center">
          <div>
            <h3 className="font-heading font-semibold text-xl text-foreground">Top Performing Events</h3>
            <p className="text-xs text-muted-foreground">Ranked by total revenue</p>
          </div>
          <button className="px-4 py-2 rounded border border-border text-muted-foreground hover:text-foreground hover:bg-card text-sm font-semibold transition-colors flex items-center gap-2">
            View All
            <span className="material-symbols-outlined text-sm">arrow_forward</span>
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[600px]">
            <thead>
              <tr className="bg-card/50 text-muted-foreground text-xs font-semibold uppercase tracking-wider">
                <th className="p-4">Event Name</th>
                <th className="p-4">Date</th>
                <th className="p-4 text-right">Tickets Sold</th>
                <th className="p-4 text-right">Revenue</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              <tr className="hover:bg-card/30 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-card overflow-hidden border border-border">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuAncP4dGbZ_5qx0cqjRn2njJoUgsygwRvdkX2yPyV5hDr0ufU6xsire7BlUBmDuhD58X6-7rn-hXxWedH0kd3270n7Q4QqApS87kglMnJdHvh3TJNi2K3g_sJ6ID1rRYjC4-nIuIrhmXtiifRFcTAAtiQalr-ikOVoqk0Lt2nC7sCXkDlkmCCMUACnzzSmvDoZBc85P2YtYUYfR0ftGwc7Y1S-cQi6J6DaZLEwbsQ4xDWE_h_QJP30XD_WlDFXvCoV7SN85arRGbrs" 
                        alt="Event" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Neon Genesis Festival</p>
                      <p className="text-xs text-muted-foreground">Main Stage</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">Oct 15, 2023</td>
                <td className="p-4 text-right text-sm text-foreground">1,245 / <span className="text-muted-foreground">1,500</span></td>
                <td className="p-4 text-right">
                  <span className="text-sm font-semibold text-primary">$56,025.00</span>
                </td>
              </tr>
              <tr className="hover:bg-card/30 transition-colors group">
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded bg-card overflow-hidden border border-border">
                      <img 
                        src="https://lh3.googleusercontent.com/aida-public/AB6AXuDJsrm58k4hl892RXZWHCtDiU5lAGHMUa-OaLqCdijxN_V7igTk7RvXXT-DD1b99OcvjVKJR0fy_oNkcYMcqDdo15j1MyCoEjUyPz4GJBfNJz9J6QfR75OYzwuj3sw63M8KhYAMzI1kOsZHUsXgVFoeiomxgGVbiCz67ru5wLI_49hk72RcZHpuh-vBmHomqnwKFNCLpEfFgV6m1WRvZ98gUz55VjUY2Irk4kj3pPsAGg202XgVLQQxhXTM8jipYRR0kELjg3T3CIU" 
                        alt="Event" 
                        className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-foreground">Deep Frequencies</p>
                      <p className="text-xs text-muted-foreground">The Vault Club</p>
                    </div>
                  </div>
                </td>
                <td className="p-4 text-sm text-muted-foreground">Oct 22, 2023</td>
                <td className="p-4 text-right text-sm text-foreground">850 / <span className="text-muted-foreground">850</span> <span className="text-amber-500 ml-1 text-xs font-semibold">SOLD OUT</span></td>
                <td className="p-4 text-right">
                  <span className="text-sm font-semibold text-foreground">$29,750.00</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
