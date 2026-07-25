import { Link, useSearchParams } from 'react-router-dom';
import { useRetryPayment } from '../../features/payment/payment.hooks';

export default function PaymentFailedPage() {
  const [searchParams] = useSearchParams();
  const bookingId = searchParams.get('bookingId') ?? '';
  const { mutate: retry, isPending } = useRetryPayment();

  const handleRetry = () => {
    retry(bookingId, {
      onSuccess: (data) => {
        // If gateway returns a redirect URL, open it
        if (data.paymentUrl) {
          window.location.href = data.paymentUrl;
        }
      },
    });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background px-4">
      <div className="flex flex-col items-center gap-8 max-w-md w-full text-center">
        {/* Error icon */}
        <div className="relative w-28 h-28">
          <div className="absolute inset-0 rounded-full bg-destructive/10 border border-destructive/30 animate-pulse"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="material-symbols-outlined text-destructive text-5xl">cancel</span>
          </div>
        </div>

        <div>
          <h1 className="font-heading font-bold text-4xl text-foreground mb-3">Payment Failed</h1>
          <p className="text-muted-foreground text-sm leading-relaxed">
            We were unable to process your payment. Your seats are still temporarily reserved.
            You can retry now or choose a different payment method.
          </p>
        </div>

        {/* Reason card */}
        <div className="w-full bg-destructive/5 border border-destructive/20 rounded-xl p-4 text-left">
          <p className="text-xs font-semibold text-destructive uppercase tracking-wider mb-1">Reason</p>
          <p className="text-sm text-foreground">Payment declined by the issuing bank. Please check your card details or use a different payment method.</p>
        </div>

        <div className="flex flex-col w-full gap-3">
          <button
            onClick={handleRetry}
            disabled={isPending || !bookingId}
            className="w-full py-4 rounded-xl bg-primary text-primary-foreground font-semibold text-sm flex items-center justify-center gap-2 glow-effect hover:brightness-110 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? (
              <div className="w-5 h-5 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <>
                <span className="material-symbols-outlined text-[20px]">refresh</span>
                Retry Payment
              </>
            )}
          </button>

          <Link
            to="/checkout"
            className="w-full py-4 rounded-xl bg-card border border-border text-foreground font-semibold text-sm flex items-center justify-center gap-2 hover:bg-card/80 transition-all"
          >
            <span className="material-symbols-outlined text-[20px]">credit_card</span>
            Change Payment Method
          </Link>

          <Link
            to="/events"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            Back to Events
          </Link>
        </div>
      </div>
    </div>
  );
}
