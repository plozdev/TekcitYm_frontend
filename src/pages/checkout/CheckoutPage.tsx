import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { GlassCard } from '../../components/ui/glass-card';
import { GlassInput } from '../../components/ui/glass-input';
import { useBookingStore } from '../../features/booking/booking.store';
import { useCreateBooking, useApplyPromo } from '../../features/booking/booking.hooks';
import type { PaymentMethod } from '../../types/api';

export default function CheckoutPage() {
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(599);
  const [promoInput, setPromoInput] = useState('');

  const {
    selectedSeats,
    reservation,
    paymentMethod,
    setPaymentMethod,
    promoDiscount,
    promoCode,
  } = useBookingStore();

  const { mutate: createBooking, isPending: paying } = useCreateBooking();
  const { mutate: applyPromo, isPending: applyingPromo } = useApplyPromo();

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const subtotal = selectedSeats.reduce((acc, s) => acc + s.price, 0);
  const serviceFee = subtotal * 0.05;
  const taxes = subtotal * 0.084;
  const discount = promoDiscount;
  const total = subtotal + serviceFee + taxes - discount;

  const handlePayment = () => {
    if (!reservation) return;
    createBooking(
      {
        reservationId: reservation.reservationId,
        paymentMethod: paymentMethod as PaymentMethod,
        promoCode: promoCode || undefined,
      },
      {
        onSuccess: (booking) => {
          if (booking.paymentUrl) {
            window.location.href = booking.paymentUrl;
          } else {
            navigate(`/payment/processing?bookingId=${booking.id}`);
          }
        },
      }
    );
  };

  const handleApplyPromo = () => {
    if (!reservation || !promoInput.trim()) return;
    applyPromo({ code: promoInput.trim(), reservationId: reservation.reservationId });
  };

  const paymentMethods: { id: PaymentMethod; icon: string; label: string; sublabel?: string }[] = [
    { id: 'CARD', icon: 'credit_card', label: 'Credit / Debit Card', sublabel: 'Visa, Mastercard, Amex' },
    { id: 'VNPAY', icon: 'qr_code_scanner', label: 'VNPay QR', sublabel: 'Scan with banking app' },
    { id: 'MOMO', icon: 'account_balance_wallet', label: 'MoMo E-Wallet' },
  ];

  return (
    <div className="w-full max-w-[1280px] mx-auto px-4 md:px-10 py-8 relative">
      <div
        className="fixed inset-0 pointer-events-none -z-10"
        style={{ background: 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.15), transparent 40%), radial-gradient(circle at bottom left, rgba(16, 185, 129, 0.05), transparent 30%)' }}
      />

      <header className="mb-6 flex items-center justify-between">
        <button onClick={() => navigate(-1)} className="flex items-center text-muted-foreground hover:text-primary transition-colors font-semibold text-sm">
          <span className="material-symbols-outlined mr-2">arrow_back</span>
          Back to Seat Selection
        </button>
      </header>

      {/* Timer Warning */}
      <div className="w-full bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-6 flex items-center justify-between shadow-[0_0_20px_rgba(239,68,68,0.1)]">
        <div className="flex items-center">
          <span className="material-symbols-outlined text-destructive mr-3 icon-fill">timer</span>
          <div>
            <h3 className="font-heading font-semibold text-xl text-destructive mb-1">Seats Reserved Temporarily</h3>
            <p className="text-sm text-muted-foreground">Finish payment before seats expire to guarantee your spot.</p>
          </div>
        </div>
        <div className="font-heading font-bold text-2xl md:text-3xl text-destructive tracking-tight">{formatTime(timeLeft)}</div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LEFT: Order Summary */}
        <div className="lg:col-span-7 flex flex-col gap-6">
          <GlassCard className="overflow-hidden p-0 relative">
            <div className="p-6 relative z-10">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="font-heading font-semibold text-3xl text-foreground mb-2">Your Order</h2>
                  <p className="text-sm text-muted-foreground flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary icon-fill text-[18px]">chair</span>
                    {selectedSeats.length} seat{selectedSeats.length !== 1 ? 's' : ''} selected
                  </p>
                </div>
                <span className="bg-amber-500/10 text-amber-500 border border-amber-500/30 px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[16px]">local_fire_department</span>
                  High Demand
                </span>
              </div>

              <hr className="border-t border-border/50 my-6" />

              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Selected Seats</h3>
              <div className="flex flex-col gap-3">
                {selectedSeats.length === 0 ? (
                  <p className="text-sm text-muted-foreground text-center py-4">No seats selected. <button onClick={() => navigate(-1)} className="text-primary underline">Go back</button></p>
                ) : (
                  selectedSeats.map((seat) => (
                    <div key={seat.seatId} className="flex justify-between items-center p-4 rounded-lg bg-card border border-border">
                      <div className="flex items-center gap-4">
                        <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center text-primary border border-primary/20">
                          <span className="material-symbols-outlined icon-fill">chair</span>
                        </div>
                        <div>
                          <p className="font-semibold text-sm text-foreground">{seat.section}, Row {seat.row}, Seat {seat.seatNumber}</p>
                          <p className="text-xs text-muted-foreground">Adult Ticket</p>
                        </div>
                      </div>
                      <span className="font-semibold text-sm text-foreground">${seat.price.toFixed(2)}</span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </GlassCard>

          {/* Voucher & Promo */}
          <GlassCard className="p-6">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-4 flex items-center gap-2">
              <span className="material-symbols-outlined text-primary">loyalty</span>
              Promo Code or Voucher
            </h3>
            <div className="flex gap-4">
              <GlassInput
                className="flex-1"
                placeholder="Enter code here"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                disabled={!!promoCode}
              />
              <button
                onClick={handleApplyPromo}
                disabled={applyingPromo || !!promoCode || !promoInput.trim()}
                className="bg-secondary/50 hover:bg-secondary text-foreground border border-border px-6 py-3 rounded-lg font-semibold text-sm transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {applyingPromo ? '...' : promoCode ? 'Applied ✓' : 'Apply'}
              </button>
            </div>
            {promoCode && promoDiscount > 0 && (
              <p className="text-emerald-400 text-xs mt-2">
                Code "{promoCode}" applied — ${promoDiscount.toFixed(2)} discount
              </p>
            )}
          </GlassCard>
        </div>

        {/* RIGHT: Payment & Total */}
        <div className="lg:col-span-5 flex flex-col h-full">
          <GlassCard className="p-6 flex flex-col h-full sticky top-24">
            <h3 className="font-heading font-semibold text-xl text-foreground mb-6 border-b border-border pb-4">Payment Method</h3>

            <div className="flex flex-col gap-3 mb-8">
              {paymentMethods.map((method) => (
                <label key={method.id} className="cursor-pointer">
                  <input
                    type="radio"
                    name="payment_method"
                    className="peer sr-only"
                    checked={paymentMethod === method.id}
                    onChange={() => setPaymentMethod(method.id)}
                  />
                  <div className="flex items-center p-4 rounded-lg border border-border bg-card/50 peer-checked:border-primary peer-checked:bg-primary/5 transition-all relative overflow-hidden group">
                    <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 peer-checked:opacity-100 transition-opacity" />
                    <div className="w-6 h-6 rounded-full border-2 border-muted-foreground peer-checked:border-primary flex items-center justify-center mr-4 relative z-10">
                      <div className={`w-3 h-3 rounded-full bg-primary transition-transform ${paymentMethod === method.id ? 'scale-100' : 'scale-0'}`} />
                    </div>
                    <span className="material-symbols-outlined text-muted-foreground mr-3 z-10">{method.icon}</span>
                    <div className="z-10">
                      <span className="font-semibold text-sm text-foreground block">{method.label}</span>
                      {method.sublabel && <span className="text-xs text-muted-foreground">{method.sublabel}</span>}
                    </div>
                  </div>
                </label>
              ))}
            </div>

            <div className="mt-auto">
              <h3 className="font-heading font-semibold text-xl text-foreground mb-4">Order Summary</h3>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Subtotal ({selectedSeats.length} tickets)</span>
                <span className="text-sm text-foreground">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Service Fee</span>
                <span className="text-sm text-foreground">${serviceFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span className="text-sm text-muted-foreground">Taxes</span>
                <span className="text-sm text-foreground">${taxes.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-emerald-400">Promo Discount</span>
                  <span className="text-sm text-emerald-400">-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="border-t border-border/50 pt-4 mb-6 flex justify-between items-end">
                <span className="font-heading font-semibold text-3xl text-foreground">Total</span>
                <span className="font-heading font-bold text-4xl text-primary tracking-tight">${total.toFixed(2)}</span>
              </div>
              <button
                onClick={handlePayment}
                disabled={paying || selectedSeats.length === 0 || !reservation}
                className="w-full bg-primary text-primary-foreground py-4 rounded-xl font-semibold text-sm flex justify-center items-center gap-2 glow-effect transition-all hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {paying ? (
                  <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <span className="material-symbols-outlined icon-fill">lock</span>
                    Pay Securely Now
                  </>
                )}
              </button>
              {!reservation && selectedSeats.length > 0 && (
                <p className="text-xs text-amber-400 text-center mt-2">
                  Seats not yet reserved. Go back and confirm selection.
                </p>
              )}
            </div>
          </GlassCard>
        </div>
      </div>
    </div>
  );
}
