import { Link, useSearchParams } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { useBookingStore } from '../../features/booking/booking.store';

export default function BookingConfirmedPage() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId') ?? '';
  const { clearBooking } = useBookingStore();
  const clearedRef = useRef(false);

  // Clear booking state once on mount
  useEffect(() => {
    if (!clearedRef.current) {
      clearBooking();
      clearedRef.current = true;
    }
  }, [clearBooking]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-8 max-w-md w-full text-center">
        {/* Animated success checkmark */}
        <div className="relative w-32 h-32">
          <svg className="w-full h-full" viewBox="0 0 100 100">
            <circle
              className="checkmark-circle"
              cx="50" cy="50" r="46"
              fill="none"
              stroke="rgb(52,211,153)"
              strokeWidth="4"
              strokeDasharray="290"
              strokeDashoffset="290"
              style={{ animation: 'stroke 0.6s cubic-bezier(0.65,0,0.45,1) forwards' }}
            />
            <polyline
              className="checkmark"
              points="30,52 44,66 70,36"
              fill="none"
              stroke="rgb(52,211,153)"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeDasharray="60"
              strokeDashoffset="60"
              style={{ animation: 'stroke 0.3s cubic-bezier(0.65,0,0.45,1) 0.6s forwards' }}
            />
          </svg>
        </div>

        <div>
          <h1 className="font-heading font-bold text-4xl text-foreground mb-3">Booking Confirmed!</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            Your tickets have been secured and are ready in your account.
            A confirmation email has been sent to your registered email address.
          </p>
        </div>

        {/* Booking reference */}
        {bookingId && (
          <div className="w-full bg-emerald-500/5 border border-emerald-500/20 rounded-xl p-4">
            <p className="text-xs font-semibold text-emerald-400 uppercase tracking-wider mb-1">Booking Reference</p>
            <p className="text-sm font-mono font-bold text-foreground tracking-wider">{bookingId.toUpperCase()}</p>
          </div>
        )}

        <div className="flex flex-col w-full gap-3">
          <Link
            to="/tickets"
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 glow-effect hover:brightness-110 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">confirmation_number</span>
            View My Tickets
          </Link>

          <Link
            to="/events"
            className="w-full py-4 rounded-xl bg-card border border-border text-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:bg-card/80 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">explore</span>
            Discover More Events
          </Link>
        </div>
      </div>
    </div>
  );
}
