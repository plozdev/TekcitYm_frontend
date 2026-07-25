import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useSeats, useReserveSeats } from '../../features/booking/booking.hooks';
import { useBookingStore } from '../../features/booking/booking.store';
import type { Seat } from '../../types/api';

export default function SelectSeatsPage() {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [scale, setScale] = useState(1);
  const [timeLeft, setTimeLeft] = useState(299);

  const { data: seatSections, isPending: seatsLoading } = useSeats(eventId ?? '');
  const { mutate: reserveSeats, isPending: reserving } = useReserveSeats();

  const {
    selectedSeats,
    toggleSeat,
    clearSeats,
    setEventId,
  } = useBookingStore();

  // Set event context in store
  useEffect(() => {
    if (eventId) {
      setEventId(eventId);
      clearSeats();
    }
  }, [eventId, setEventId, clearSeats]);

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `0${m}:${s < 10 ? '0' : ''}${s}`;
  };

  const handleSeatClick = (seat: Seat, sectionName: string, rowLabel: string, price: number) => {
    if (seat.status === 'SOLD' || seat.status === 'RESERVED') return;
    toggleSeat({
      seatId: seat.id,
      section: sectionName,
      row: rowLabel,
      seatNumber: seat.seatNumber,
      price,
    });
  };

  const isSeatSelected = (seatId: string) => selectedSeats.some((s) => s.seatId === seatId);

  const subtotal = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const fees = subtotal > 0 ? subtotal * 0.15 : 0;
  const total = subtotal + fees;

  const handleProceed = () => {
    if (!eventId || selectedSeats.length === 0) return;
    reserveSeats(
      { eventId, seatIds: selectedSeats.map((s) => s.seatId) },
      { onSuccess: () => navigate('/checkout') }
    );
  };

  const zoomMap = (delta: number) => {
    setScale((prev) => Math.max(0.5, Math.min(prev + delta, 2)));
  };

  const getSeatClass = (seat: Seat, selected: boolean) => {
    if (seat.status === 'SOLD' || seat.status === 'RESERVED') return 'seat sold w-8 h-8 rounded-t-lg rounded-b-sm cursor-not-allowed';
    if (selected) return 'seat selected w-8 h-8 rounded-t-lg rounded-b-sm';
    return 'seat available w-8 h-8 rounded-t-lg rounded-b-sm cursor-pointer';
  };

  return (
    <div className="flex-1 flex flex-col md:flex-row relative h-[calc(100vh-80px)]">
      {/* Interactive Seat Map Canvas */}
      <section className="flex-1 relative overflow-hidden bg-background">
        <div
          className="absolute w-[150%] h-[150%] md:w-[120%] md:h-[120%] origin-center transition-transform duration-300 flex flex-col items-center pt-24"
          style={{ transform: `scale(${scale}) translate(0px, 0px)` }}
        >
          {/* Stage */}
          <div className="w-2/3 md:w-1/2 h-24 mb-16 relative rounded-t-[100px] border-t-4 border-primary stage-glow flex items-center justify-center">
            <h2 className="font-heading font-semibold text-3xl text-primary tracking-widest uppercase">Stage</h2>
          </div>

          {/* Seat Grid */}
          <div className="flex flex-col gap-12 items-center">
            {seatsLoading ? (
              // Skeleton
              <div className="flex flex-col gap-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex gap-2 animate-pulse">
                    {Array.from({ length: 12 }).map((_, j) => (
                      <div key={j} className="w-8 h-8 rounded bg-card/50" />
                    ))}
                  </div>
                ))}
              </div>
            ) : seatSections && seatSections.length > 0 ? (
              seatSections.map((section) => (
                <div key={section.id} className="flex flex-col gap-4 relative">
                  <div className="absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 text-muted-foreground font-heading font-bold text-xl opacity-30 select-none">
                    {section.name}
                  </div>
                  {section.rows.map((row) => (
                    <div key={row.id} className="flex gap-4 items-center">
                      <span className="text-xs text-muted-foreground w-4 text-right shrink-0">{row.label}</span>
                      <div className="flex gap-2">
                        {row.seats.map((seat) => (
                          <div
                            key={seat.id}
                            className={getSeatClass(seat, isSeatSelected(seat.id))}
                            onClick={() => handleSeatClick(seat, section.name, row.label, section.price)}
                            title={`${section.name} - Row ${row.label} - Seat ${seat.seatNumber}`}
                          />
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))
            ) : (
              // Fallback static map when no API data
              <div className="flex flex-col gap-2 relative">
                <div className="absolute -left-12 top-1/2 -translate-y-1/2 -rotate-90 text-muted-foreground font-heading font-bold text-xl opacity-30 select-none">VIP</div>
                <div className="flex gap-4">
                  <div className="grid grid-cols-6 gap-2">
                    {[1,2,5].map(i => <div key={`sold-a-${i}`} className="seat sold w-8 h-8 rounded-t-lg rounded-b-sm" />)}
                    {[3,4,6].map(i => (
                      <div
                        key={`avail-a-${i}`}
                        className={`seat w-8 h-8 rounded-t-lg rounded-b-sm ${isSeatSelected(`VIP-A-${i}`) ? 'selected' : 'available'}`}
                        onClick={() => toggleSeat({ seatId: `VIP-A-${i}`, section: 'VIP', row: 'A', seatNumber: String(i), price: 150 })}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Map Controls */}
        <div className="absolute bottom-8 left-8 flex flex-col gap-2 z-10">
          <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-foreground hover:bg-white/10 transition-colors" onClick={() => zoomMap(0.1)}>
            <span className="material-symbols-outlined">add</span>
          </button>
          <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-foreground hover:bg-white/10 transition-colors" onClick={() => zoomMap(-0.1)}>
            <span className="material-symbols-outlined">remove</span>
          </button>
          <button className="w-10 h-10 rounded-full glass-panel flex items-center justify-center text-foreground hover:bg-white/10 transition-colors mt-4">
            <span className="material-symbols-outlined">my_location</span>
          </button>
        </div>

        {/* Legend */}
        <div className="absolute top-8 left-8 glass-panel px-4 py-3 rounded-xl flex gap-4 z-10 shadow-lg">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm border border-emerald-400"></div>
            <span className="text-xs font-medium text-muted-foreground">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-amber-400 border border-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]"></div>
            <span className="text-xs font-medium text-muted-foreground">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 rounded-sm bg-muted relative overflow-hidden flex items-center justify-center">
              <div className="w-full h-px bg-muted-foreground rotate-45 absolute"></div>
              <div className="w-full h-px bg-muted-foreground -rotate-45 absolute"></div>
            </div>
            <span className="text-xs font-medium text-muted-foreground">Sold</span>
          </div>
        </div>
      </section>

      {/* Right Floating Panel */}
      <aside className="w-full md:w-[400px] h-full glass-panel flex flex-col relative z-20 shadow-[-20px_0_40px_rgba(0,0,0,0.5)] border-l border-white/10 rounded-l-3xl overflow-hidden shrink-0 hidden md:flex">
        <div className="p-6 border-b border-white/10 bg-card/50">
          <div className="flex justify-between items-start mb-2">
            <div className="px-2 py-1 bg-primary/20 text-primary text-xs font-medium rounded uppercase tracking-wider">Select Seats</div>
            <div className="flex items-center gap-2 text-destructive bg-destructive/10 px-3 py-1 rounded-full border border-destructive/20">
              <span className="material-symbols-outlined text-sm">timer</span>
              <span className="text-sm font-semibold font-mono">{formatTime(timeLeft)}</span>
            </div>
          </div>
          <h1 className="font-heading font-semibold text-3xl text-foreground mb-2">
            {seatSections?.[0] ? 'Choose Your Seats' : 'Loading venue...'}
          </h1>
          <div className="flex flex-col gap-1 text-muted-foreground text-sm font-medium">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">chair</span>
              <span>{selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''} selected</span>
            </div>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6 flex flex-col gap-4">
          {selectedSeats.length === 0 ? (
            <div className="text-center text-muted-foreground/50 text-sm mt-10">
              <span className="material-symbols-outlined text-4xl mb-2 opacity-50">chair</span>
              <p>Select seats from the map to continue</p>
            </div>
          ) : (
            selectedSeats.map((seat) => (
              <div key={seat.seatId} className="bg-card border border-border p-4 rounded-xl flex justify-between items-center transition-all">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center border border-border">
                    <span className="material-symbols-outlined text-primary text-xl">chair</span>
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-semibold text-foreground">{seat.section}, Row {seat.row}</span>
                    <span className="text-xs font-medium text-muted-foreground">Seat {seat.seatNumber}</span>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-sm font-semibold text-foreground">${seat.price.toFixed(2)}</span>
                  <button
                    className="text-destructive/70 hover:text-destructive transition-colors mt-1"
                    onClick={() => toggleSeat(seat)}
                  >
                    <span className="material-symbols-outlined text-sm">delete</span>
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="p-6 border-t border-white/10 bg-card/80 backdrop-blur-2xl">
          <div className="flex justify-between items-center mb-2 text-sm font-medium text-muted-foreground">
            <span>Subtotal</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-4 text-sm font-medium text-muted-foreground">
            <span>Fees & Taxes</span>
            <span>${fees.toFixed(2)}</span>
          </div>
          <div className="flex justify-between items-center mb-6 border-t border-white/10 pt-4">
            <span className="font-heading font-semibold text-2xl text-foreground">Total</span>
            <span className="font-heading font-semibold text-2xl text-primary">${total.toFixed(2)}</span>
          </div>
          <button
            onClick={handleProceed}
            disabled={reserving || selectedSeats.length === 0}
            className={`w-full py-4 rounded-xl text-center text-white font-semibold text-lg transition-all block ${selectedSeats.length > 0 ? 'bg-primary hover:bg-primary/90 glow-effect' : 'bg-primary/50 cursor-not-allowed'} disabled:opacity-70`}
          >
            {reserving ? (
              <div className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Reserving...
              </div>
            ) : 'Proceed to Payment'}
          </button>
        </div>
      </aside>

      {/* Mobile Bottom Sheet */}
      <div className="md:hidden fixed bottom-0 left-0 w-full glass-panel p-4 rounded-t-2xl z-50 shadow-[0_-10px_40px_rgba(0,0,0,0.5)]">
        <div className="flex justify-between items-center mb-4">
          <div className="flex flex-col">
            <span className="text-muted-foreground text-xs font-medium">Total ({selectedSeats.length} seats)</span>
            <span className="font-heading font-semibold text-2xl text-primary">${total.toFixed(2)}</span>
          </div>
          <div className="flex items-center gap-1 text-destructive">
            <span className="material-symbols-outlined text-sm">timer</span>
            <span className="text-sm font-semibold font-mono">{formatTime(timeLeft)}</span>
          </div>
        </div>
        <button
          onClick={handleProceed}
          disabled={reserving || selectedSeats.length === 0}
          className={`w-full py-3 rounded-xl text-center text-white text-sm font-semibold transition-all block ${selectedSeats.length > 0 ? 'bg-primary hover:bg-primary/90 glow-effect' : 'bg-primary/50 cursor-not-allowed'}`}
        >
          {reserving ? 'Reserving...' : 'Proceed to Payment'}
        </button>
      </div>
    </div>
  );
}
