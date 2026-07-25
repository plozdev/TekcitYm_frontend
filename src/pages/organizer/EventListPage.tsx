import { useState, useEffect } from 'react';
import { useDebounce } from '../../hooks/useDebounce';
import { Link } from 'react-router-dom';
import { useMyEvents } from '../../features/event/event.hooks';
import { GlassCard } from '../../components/ui/glass-card';
import { Button } from '../../components/ui/button';
import type { OrganizerEvent } from '../../types/api';

function statusBadge(status: string) {
  const map: Record<string, string> = {
    PUBLISHED: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
    DRAFT: 'bg-card text-muted-foreground border-border',
    CANCELLED: 'bg-destructive/20 text-destructive border-destructive/30',
    COMPLETED: 'bg-primary/20 text-primary border-primary/30',
  };
  return map[status] ?? 'bg-card text-muted-foreground border-border';
}

export default function EventListPage() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(0);
  const [statusFilter, setStatusFilter] = useState('');

  const debouncedSearch = useDebounce(search, 500);

  const { data, isPending } = useMyEvents({ page, size: 10, search: debouncedSearch || undefined });
  const events = data?.content ?? [];
  const totalPages = data?.totalPages ?? 1;

  const filtered = statusFilter
    ? events.filter((e) => e.status === statusFilter)
    : events;

  return (
    <div className="max-w-[1280px] mx-auto w-full flex flex-col gap-6 pb-24 md:pb-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h2 className="font-heading font-bold text-3xl md:text-4xl text-foreground mb-1">My Events</h2>
          <p className="text-sm text-muted-foreground">
            {data ? `${data.totalElements} total events` : 'Loading...'}
          </p>
        </div>
        <Link to="/organizer/events/new">
          <Button className="bg-primary text-primary-foreground hover:bg-primary/90 glow-effect">
            <span className="material-symbols-outlined mr-2 text-[18px]">add</span>
            Create Event
          </Button>
        </Link>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">search</span>
          <input
            type="text"
            placeholder="Search events..."
            value={search}
            onChange={(e) => { setSearch(e.target.value); setPage(0); }}
            className="w-full bg-card/50 border border-border rounded-lg pl-9 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all"
          />
        </div>
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="bg-card/50 border border-border rounded-lg px-4 py-2.5 text-sm text-foreground focus:outline-none focus:border-primary transition-all appearance-none min-w-[160px]"
        >
          <option value="">All Status</option>
          <option value="PUBLISHED">Published</option>
          <option value="DRAFT">Draft</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Table */}
      <GlassCard className="rounded-xl overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="border-b border-border/50 bg-card/50">
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Event</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden md:table-cell">Date</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Tickets</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider hidden lg:table-cell">Revenue</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider">Status</th>
                <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase tracking-wider text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border/30">
              {isPending ? (
                Array.from({ length: 5 }).map((_, i) => (
                  <tr key={i} className="animate-pulse">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-card"></div>
                        <div className="space-y-2">
                          <div className="h-4 w-40 bg-card rounded"></div>
                          <div className="h-3 w-24 bg-card rounded"></div>
                        </div>
                      </div>
                    </td>
                    {[...Array(5)].map((_, j) => (
                      <td key={j} className="px-6 py-5 hidden md:table-cell">
                        <div className="h-4 w-20 bg-card rounded"></div>
                      </td>
                    ))}
                  </tr>
                ))
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-muted-foreground">
                    <span className="material-symbols-outlined text-5xl opacity-30 mb-3 block">event_busy</span>
                    <p className="text-sm">No events found</p>
                  </td>
                </tr>
              ) : (
                filtered.map((event: OrganizerEvent) => (
                  <tr key={event.id} className="hover:bg-card/30 transition-colors group">
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-card border border-border overflow-hidden shrink-0">
                          {event.bannerUrl ? (
                            <img src={event.bannerUrl} alt={event.title} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <span className="material-symbols-outlined text-primary text-sm">event</span>
                            </div>
                          )}
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{event.title}</p>
                          <p className="text-xs text-muted-foreground truncate max-w-[180px]">{event.venue?.name}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 hidden md:table-cell">
                      <p className="text-sm text-foreground">{new Date(event.startDate).toLocaleDateString()}</p>
                      <p className="text-xs text-muted-foreground">{new Date(event.startDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                    </td>
                    <td className="px-6 py-5 hidden lg:table-cell">
                      <div className="flex flex-col gap-1">
                        <span className="text-sm font-medium text-foreground">{event.soldCount}/{event.totalCapacity}</span>
                        <div className="w-full max-w-[100px] h-1.5 bg-background rounded-full overflow-hidden">
                          <div
                            className="h-full bg-primary rounded-full"
                            style={{ width: `${Math.min(100, (event.soldCount / event.totalCapacity) * 100)}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-5 hidden lg:table-cell">
                      <span className="text-sm font-semibold text-foreground">
                        ${(event.revenue ?? 0).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-5">
                      <span className={`text-xs font-semibold px-2.5 py-1 rounded-full border ${statusBadge(event.status)}`}>
                        {event.status}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-2 rounded-lg hover:bg-card text-muted-foreground hover:text-primary transition-colors" title="Edit">
                          <span className="material-symbols-outlined text-[18px]">edit</span>
                        </button>
                        <button className="p-2 rounded-lg hover:bg-card text-muted-foreground hover:text-primary transition-colors" title="View">
                          <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="p-4 border-t border-border/50 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">Page {page + 1} of {totalPages}</p>
            <div className="flex gap-2">
              <button
                onClick={() => setPage((p) => Math.max(0, p - 1))}
                disabled={page === 0}
                className="px-3 py-1.5 rounded-lg bg-card border border-border text-sm text-foreground hover:bg-card/80 transition-colors disabled:opacity-50"
              >
                Previous
              </button>
              <button
                onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
                disabled={page >= totalPages - 1}
                className="px-3 py-1.5 rounded-lg bg-card border border-border text-sm text-foreground hover:bg-card/80 transition-colors disabled:opacity-50"
              >
                Next
              </button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
